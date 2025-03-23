import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Provider as PaperProvider, Button } from "react-native-paper";
import Clipboard from '@react-native-clipboard/clipboard';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [theme, setTheme] = useState("dark");
  const currentProcessId = useRef(null);
  const isCancelled = useRef(false);
  const API_KEY = "Enter Your Key";

  useEffect(() => {
    loadTheme();
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (selectedChatIndex !== null) {
      saveChatHistory();
    }
  }, [currentChat]);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  };

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const loadChatHistory = async () => {
    const savedHistory = await AsyncStorage.getItem("chatHistory");
    if (savedHistory) setChatHistory(JSON.parse(savedHistory));
  };

  const saveChatHistory = async () => {
    await AsyncStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  const startNewChat = () => {
    cancelRunningResponse();
    const newSession = { id: Date.now(), messages: [] };
    setChatHistory([...chatHistory, newSession]);
    setSelectedChatIndex(chatHistory.length);
    setCurrentChat([]);
  };

  const loadChat = (index) => {
    cancelRunningResponse();
    setSelectedChatIndex(index);
    setCurrentChat(chatHistory[index].messages || []);
  };

  const deleteChat = (index) => {
    cancelRunningResponse();
    const updatedHistory = chatHistory.filter((_, i) => i !== index);
    setChatHistory(updatedHistory);
    setSelectedChatIndex(null);
    setCurrentChat([]);
    saveChatHistory();
  };

  const cancelRunningResponse = () => {
    isCancelled.current = true;
    currentProcessId.current = null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    cancelRunningResponse();
    isCancelled.current = false;

    let updatedChat = [...currentChat, { text: input, type: "user" }];
    setCurrentChat(updatedChat);
    setInput("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const replyParts = response.data?.candidates?.[0]?.content?.parts || [];
      let reply = replyParts.map((part) => part.text).join("\n");
      const processId = Date.now();
      currentProcessId.current = processId;
      const activeSession = selectedChatIndex;
      await processResponse(reply, processId, activeSession);
    } catch (error) {
      setCurrentChat([...updatedChat, { text: "Error: Unable to fetch response", type: "bot" }]);
    }
  };

  const processResponse = async (responseText, processId, activeSession) => {
    let reply = "";
    const botMessage = { text: "", type: "bot" };
    setCurrentChat((prev) => [...prev, botMessage]);

    for (const char of responseText) {
      if (isCancelled.current || currentProcessId.current !== processId || selectedChatIndex !== activeSession) {
        break;
      }
      reply += char;
      setCurrentChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: reply, type: "bot" };
        return updated;
      });
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied to Clipboard", text);
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
          padding: 10,
        }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={{ fontSize: 20, color: theme === "dark" ? "#fff" : "#000" }}>
            Chatbot
          </Text>
          <Button mode="contained" onPress={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </View>

        <FlatList
          data={currentChat}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5, alignSelf: item.type === "user" ? "flex-end" : "flex-start" }}>
              {item.type === "bot" ? (
                <View style={styles.botMessageContainer}>
                  <SyntaxHighlighter language="plaintext" style={theme === "dark" ? oneDark : coy}>
                    {item.text}
                  </SyntaxHighlighter>
                  <TouchableOpacity onPress={() => copyToClipboard(item.text)} style={styles.copyButton}>
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.userMessage}>{item.text}</Text>
              )}
            </View>
          )}
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input(theme)}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={theme === "dark" ? "#bbb" : "#777"}
            onSubmitEditing={sendMessage} // Handle Enter key press
            returnKeyType="send" // Show "Send" button on the keyboard
          />


          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", padding: 10 },
  userMessage: { color: "#fff", backgroundColor: "#6200ee", padding: 10, borderRadius: 10 },
  botMessageContainer: { flexDirection: "row", alignItems: "center" },
  copyButton: { marginLeft: 5, backgroundColor: "#6200ee", padding: 5, borderRadius: 5 },
  copyButtonText: { color: "#fff", fontSize: 14 },
  inputContainer: { flexDirection: "row", padding: 10 },
  input: (theme) => ({
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: theme === "dark" ? "#fff" : "#000", // White text in dark mode, black in light mode
    borderColor: theme === "dark" ? "#fff" : "#333", // White border in dark mode, dark gray in light mode
    backgroundColor: theme === "dark" ? "#333" : "#f0f0f0", // Dark gray background in dark mode, light gray in light mode
  }), sendButton: { backgroundColor: "#6200ee", padding: 10, borderRadius: 10, marginLeft: 10 },
  sendText: { color: "#fff" },
});

export default App;

