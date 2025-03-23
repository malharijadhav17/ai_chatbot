(()=>{"use strict";var e={3844:(e,t,r)=>{var n=r(2299),a=r(6665),o=r(3929),s=r(6283),l=r(6773),d=r(5648),i=r(932),u=r(3668),f=r(4767),c=r(1690),p=r(5259),y=r(7109),g=r(3548),h=r(5981),b=r(4088),x=r(1340),m=r(7728),v=r(2514),j=r(397);const k=u.default.create({header:{flexDirection:"row",justifyContent:"space-between",padding:10},userMessage:{color:"#fff",backgroundColor:"#6200ee",padding:10,borderRadius:10},botMessageContainer:{flexDirection:"row",alignItems:"center"},copyButton:{marginLeft:5,backgroundColor:"#6200ee",padding:5,borderRadius:5},copyButtonText:{color:"#fff",fontSize:14},inputContainer:{flexDirection:"row",padding:10},input:e=>({flex:1,padding:10,borderWidth:1,borderRadius:10,color:"dark"===e?"#fff":"#000",borderColor:"dark"===e?"#fff":"#333",backgroundColor:"dark"===e?"#333":"#f0f0f0"}),sendButton:{backgroundColor:"#6200ee",padding:10,borderRadius:10,marginLeft:10},sendText:{color:"#fff"}}),w=()=>{const[e,t]=(0,a.useState)(""),[r,n]=(0,a.useState)([]),[u,w]=(0,a.useState)([]),[C,S]=(0,a.useState)(null),[O,T]=(0,a.useState)("dark"),M=(0,a.useRef)(null),P=(0,a.useRef)(!1);(0,a.useEffect)((()=>{B(),I()}),[]),(0,a.useEffect)((()=>{null!==C&&R()}),[r]);const B=async()=>{const e=await p.default.getItem("theme");e&&T(e)},I=async()=>{const e=await p.default.getItem("chatHistory");e&&w(JSON.parse(e))},R=async()=>{await p.default.setItem("chatHistory",JSON.stringify(u))},D=()=>{P.current=!0,M.current=null},E=async()=>{if(!e.trim())return;D(),P.current=!1;let a=[...r,{text:e,type:"user"}];n(a),t("");try{const t=await y.default.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBynUKwAktNRwPh_bl0DmBu6owJ5Uc5ux8",{contents:[{parts:[{text:e}]}]},{headers:{"Content-Type":"application/json"}});let r=(t.data?.candidates?.[0]?.content?.parts||[]).map((e=>e.text)).join("\n");const n=Date.now();M.current=n;const a=C;await _(r,n,a)}catch(o){n([...a,{text:"Error: Unable to fetch response",type:"bot"}])}},_=async(e,t,r)=>{let a="";const o={text:"",type:"bot"};n((e=>[...e,o]));for(const s of e){if(P.current||M.current!==t||C!==r)break;a+=s,n((e=>{const t=[...e];return t[t.length-1]={text:a,type:"bot"},t})),await new Promise((e=>setTimeout(e,20)))}};return(0,j.jsx)(g.default,{children:(0,j.jsxs)(f.default,{behavior:"height",style:{flex:1,backgroundColor:"dark"===O?"#121212":"#ffffff",padding:10},children:[(0,j.jsxs)(o.default,{style:k.header,children:[(0,j.jsx)(s.default,{style:{fontSize:20,color:"dark"===O?"#fff":"#000"},children:"Chatbot"}),(0,j.jsx)(h.default,{mode:"contained",onPress:async()=>{const e="dark"===O?"light":"dark";T(e),await p.default.setItem("theme",e)},children:"dark"===O?"Light Mode":"Dark Mode"})]}),(0,j.jsx)(i.default,{data:r,keyExtractor:(e,t)=>t.toString(),renderItem:({item:e})=>(0,j.jsx)(o.default,{style:{marginVertical:5,alignSelf:"user"===e.type?"flex-end":"flex-start"},children:"bot"===e.type?(0,j.jsxs)(o.default,{style:k.botMessageContainer,children:[(0,j.jsx)(x.default,{language:"plaintext",style:"dark"===O?m.default:v.default,children:e.text}),(0,j.jsx)(d.default,{onPress:()=>{return t=e.text,b.default.setString(t),void c.default.alert("Copied to Clipboard",t);var t},style:k.copyButton,children:(0,j.jsx)(s.default,{style:k.copyButtonText,children:"Copy"})})]}):(0,j.jsx)(s.default,{style:k.userMessage,children:e.text})})}),(0,j.jsxs)(o.default,{style:k.inputContainer,children:[(0,j.jsx)(l.default,{style:k.input(O),value:e,onChangeText:t,placeholder:"Type a message...",placeholderTextColor:"dark"===O?"#bbb":"#777",onSubmitEditing:E,returnKeyType:"send"}),(0,j.jsx)(d.default,{style:k.sendButton,onPress:E,children:(0,j.jsx)(s.default,{style:k.sendText,children:"Send"})})]})]})})};(0,n.default)(w)}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}r.m=e,(()=>{var e=[];r.O=(t,n,a,o)=>{if(!n){var s=1/0;for(u=0;u<e.length;u++){for(var[n,a,o]=e[u],l=!0,d=0;d<n.length;d++)(!1&o||s>=o)&&Object.keys(r.O).every((e=>r.O[e](n[d])))?n.splice(d--,1):(l=!1,o<s&&(s=o));if(l){e.splice(u--,1);var i=a();void 0!==i&&(t=i)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={792:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,o,[s,l,d]=n,i=0;if(s.some((t=>0!==e[t]))){for(a in l)r.o(l,a)&&(r.m[a]=l[a]);if(d)var u=d(r)}for(t&&t(n);i<s.length;i++)o=s[i],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},n=self.webpackChunkweb=self.webpackChunkweb||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[671],(()=>r(3844)));n=r.O(n)})();
//# sourceMappingURL=main.d3aa232d.js.map