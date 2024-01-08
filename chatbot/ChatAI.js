/*
 * Created by David Adams
 * https://codeshack.io/build-ai-powered-chatbot-openai-chatgpt-javascript/
 * 
 * Released under the MIT license
 */
"use strict";class ChatAI{constructor(e){let t={api_key:"",source:"openai",model:"gpt-3.5-turbo",conversations:[],selected_conversation:null,container:".chat-ai",chat_speed:30,title:"SAP - CarbonVision - CarbonVision",max_tokens:100,version:"1.0.0",show_tokens:false,available_models:["gpt-4","gpt-4-0613","gpt-4-32k","gpt-4-32k-0613","gpt-3.5-turbo","gpt-3.5-turbo-0613","gpt-3.5-turbo-16k","gpt-3.5-turbo-16k-0613"]};this.options=Object.assign(t,e);this.options.container=document.querySelector(this.options.container);this.options.container.innerHTML=`\n            ${this._sidebarTemplate()}\n            <main class="content">               \n                ${this._welcomePageTemplate()}\n                <form class="message-form">\n                    <input type="text" placeholder="Type a message..." required>\n                    <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>\n                </form>\n            </main>\n        `;let s=this.getSettings();if(s){this.options=Object.assign(this.options,s)}this._eventHandlers();this.container.querySelector(".message-form input").focus()}getMessage(){this.container.querySelector(".content .messages").scrollTop=this.container.querySelector(".content .messages").scrollHeight;let e=[{role:"system",content:"You are an EYYSAPPET Energy Business Expert. Provide valuable recommendations on carbon emission tracking and reduction for the company or user.",role:"system",content:"Keep the answer short and precise around 80 words unless you are asked to give detailed answer. Dont answer question not related to carbon tracking & reduction"},...this.selectedConversation.messages].map(e=>({role:e.role,content:e.content}));fetch("https://api.openai.com/v1/chat/completions",{cache:"no-cache",method:"POST",headers:{Authorization:"Bearer "+this.APIKey,"Content-Type":"application/json"},body:JSON.stringify({model:this.model,messages:e,max_tokens:this.maxTokens})}).then(e=>e.json()).then(e=>{if(e.error){this.showErrorMessage(e.error.message);return}this.container.querySelector(".message.assistant.active .blink").remove();let t=e.choices[0].message.content;let s=this.container.querySelector(".message.assistant.active .text");let n=setInterval(()=>{if(t[0]){s.innerHTML+=t[0];s.innerHTML=s.innerHTML.replace(/(?:\r\n|\r|\n)/g,"<br>");t=t.substring(1)}else{clearInterval(n);s.innerHTML=s.innerHTML.replace(/```(.*?)```/,"<pre><code>$1"+"<"+"/code>"+"<"+"/pre>");if(this.options.show_tokens){s.innerHTML+='<div><span class="tokens">'+e.usage.total_tokens+" Tokens</span></div>"}this.container.querySelector(".message-form input").disabled=false;this.container.querySelector(".message.assistant.active").classList.remove("active");this.selectedConversation.messages.push({role:"assistant",content:e.choices[0].message.content,date:new Date,total_tokens:e.usage.total_tokens,prompt_tokens:e.usage.prompt_tokens,completion_tokens:e.usage.completion_tokens})}this.container.querySelector(".content .messages").scrollTop=this.container.querySelector(".content .messages").scrollHeight},this.options.chat_speed)})}async getJsonFile(){try{let[e]=await window.showOpenFilePicker();let t=await e.getFile();let s=await t.text();let n=JSON.parse(s);return{content:n,name:t.name}}catch(e){if(e.code!==DOMException.ABORT_ERR){console.error("Error reading JSON file:",e);this.showErrorMessage(e.message)}}}async saveJsonToFile(e){try{let t={suggestedName:"ai-conversations.json",types:[{description:"JSON Files",accept:{"application/json":[".json"]}}]};let s=await window.showSaveFilePicker(t);let n=await s.createWritable();let o=JSON.stringify(e,null,2);await n.write(o);await n.close();this.options.title=s.name;this.updateTitle(false);this.showSuccessMessage("File saved successfully.")}catch(e){if(e.code!==DOMException.ABORT_ERR){console.error("Error saving JSON file:",e);this.showErrorMessage(e.message)}}}showErrorMessage(e){this.container.querySelectorAll(".error").forEach(e=>e.remove());let t=document.createElement("div");t.classList.add("error-toast");t.innerHTML=e;this.container.appendChild(t);t.getBoundingClientRect();t.style.transition="opacity .5s ease-in-out 4s";t.style.opacity=0;setTimeout(()=>t.remove(),5e3)}showSuccessMessage(e){this.container.querySelectorAll(".success").forEach(e=>e.remove());let t=document.createElement("div");t.classList.add("success-toast");t.innerHTML=e;this.container.appendChild(t);t.getBoundingClientRect();t.style.transition="opacity .5s ease-in-out 4s";t.style.opacity=0;setTimeout(()=>t.remove(),5e3)}formatElapsedTime(e){let t=new Date(e);let s=new Date;let n=s-t;let o=Math.floor(n/1e3);let i=Math.floor(o/60);let a=Math.floor(i/60);let r=Math.floor(a/24);if(r>1){return`${r} days ago`}else if(r===1){return"Yesterday"}else if(a>0){return`${a} hours ago`}else if(i>0){return`${i} minutes ago`}else{return`${o} seconds ago`}}loadConversation(e){this.clearWelcomeScreen();this.clearMessages();this.container.querySelector(".content .messages").insertAdjacentHTML("afterbegin",`\n            <div class="conversation-title">\n                <h2><span class="text">${e.name}</span><i class="fa-solid fa-pencil edit"></i><i class="fa-solid fa-trash delete"></i></h2>\n            </div>\n        `);this._conversationTitleClickHandler();e.messages.forEach(e=>{this.container.querySelector(".content .messages").insertAdjacentHTML("afterbegin",`\n                <div class="message ${e.role}">\n                    <div class="wrapper">\n                        <div class="avatar">${e.role=="assistant"?"AI":'<i class="fa-solid fa-user"></i>'}</div>\n                        <div class="details">\n                            <div class="date" title="${e.date}">${this.formatElapsedTime(e.date)}</div>\n                            <div class="text">\n                                ${e.content.replace(/(?:\r\n|\r|\n)/g,"<br>").replace(/```(.*?)```/,"<pre><code>$1"+"<"+"/code>"+"<"+"/pre>")}\n                                ${this.options.show_tokens&&e.total_tokens?'<div><span class="tokens">'+e.total_tokens+" Tokens</span></div>":""}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            `)})}clearWelcomeScreen(){if(this.container.querySelector(".content .welcome")){this.container.querySelector(".content .welcome").remove();this.container.querySelector(".content").insertAdjacentHTML("afterbegin",'<div class="messages"></div>');return true}return false}clearMessages(){if(this.container.querySelector(".content .messages")){this.container.querySelector(".content .messages").innerHTML="";return true}return false}createNewConversation(e=null){e=e!=null?e:"Conversation "+(this.conversations.length+1);let t=this.conversations.push({name:e,messages:[]});this.container.querySelectorAll(".conversations .list a").forEach(e=>e.classList.remove("selected"));this.container.querySelector(".conversations .list").insertAdjacentHTML("beforeend",`<a class="conversation selected" href="#" data-id="${t-1}" title="${e}"><i class="fa-regular fa-message"></i>${e}</a>`);this.clearWelcomeScreen();this.clearMessages();this._conversationClickHandlers();this.container.querySelector(".content .messages").innerHTML='<div class="conversation-title"><h2><span class="text">'+e+'</span><i class="fa-solid fa-pencil edit"></i><i class="fa-solid fa-trash delete"></i></h2></div>';this._conversationTitleClickHandler();this.container.querySelector(".message-form input").focus();this.updateTitle();return t-1}updateTitle(e=true){document.title=e?"* "+this.options.title.replace("* ",""):this.options.title.replace("* ","")}modal(e){let t;if(document.querySelector(e.element)){t=document.querySelector(e.element)}else if(e.modalTemplate){document.body.insertAdjacentHTML("beforeend",e.modalTemplate());t=document.body.lastElementChild}e.element=t;e.open=s=>{t.style.display="flex";t.getBoundingClientRect();t.classList.add("open");if(e.onOpen)e.onOpen(s)};e.close=s=>{if(e.onClose){let n=e.onClose(s);if(n!==false){t.style.display="none";t.classList.remove("open");t.remove()}}else{t.style.display="none";t.classList.remove("open");t.remove()}};if(e.state=="close"){e.close({source:t,button:null})}else if(e.state=="open"){e.open({source:t})}t.querySelectorAll(".modal-close").forEach(s=>{s.onclick=n=>{n.preventDefault();e.close({source:t,button:s})}});return e}openSettingsModal(){let e=this;return this.modal({state:"open",modalTemplate:function(){return`\n                <div class="chat-ai-modal">\n                    <div class="content">\n                        <h3 class="heading">Settings<span class="modal-close">&times;</span></h3>\n                        <div class="body">\n                            <form class="settings-form" action="">\n                                <label for="api_key">API Key</label>\n                                <input type="text" name="api_key" id="api_key" value="${e.APIKey}">\n                                <label for="source">Source</label>\n                                <select name="source" id="source">\n                                    <option value="openai" selected>OpenAI</option>\n                                </select>\n                                <label for="model">Model</label>\n                                <select name="model" id="model">\n                                    ${e.options.available_models.map(t=>`<option value="${t}"${e.model==t?" selected":""}>${t}</option>`).join("")}\n                                </select>\n                                <label for="max_tokens">Max Tokens</label>\n                                <input type="number" name="max_tokens" id="max_tokens" value="${e.maxTokens}">\n                                <div class="msg"></div>\n                            </form>\n                        </div>\n                        <div class="footer">\n                            <a href="#" class="btn modal-close save">Save</a>\n                            <a href="#" class="btn modal-close reset right alt">Reset</a>\n                        </div>\n                    </div>\n                </div>\n                `},onClose:function(t){if(t&&t.button){if(t.button.classList.contains("save")){e.APIKey=t.source.querySelector("#api_key").value;e.maxTokens=t.source.querySelector("#max_tokens").value;e.source=t.source.querySelector("#source").value;e.model=t.source.querySelector("#model").value;e.saveSettings()}if(t.button.classList.contains("reset")){localStorage.removeItem("settings");location.reload()}}}})}getSettings(){return localStorage.getItem("settings")?JSON.parse(localStorage.getItem("settings")):false}saveSettings(){localStorage.setItem("settings",JSON.stringify({api_key:this.APIKey,max_tokens:this.maxTokens,source:this.source,model:this.model}))}_welcomePageTemplate(){return`\n            <div class="welcome">\n                <h1>CarbonVision Chatbot<span class="ver" style="display:none">${this.options.version}</span></h1>\n\t\t\t\t<img class="eylogo" src="images/eylogo.png">\n            </div>\n        `}_sidebarTemplate(){return`\n            <a href="#" class="open-sidebar" title="Open Sidebar"><i class="fa-solid fa-bars"></i></a>\n            <nav class="conversations">\n                <a class="new-conversation" href="#"><i class="fa-solid fa-plus"></i>New Conversation</a>\n                <div class="list"></div>\n                <div class="footer">\n                    <a class="save" href="#" title="Save"><i class="fa-solid fa-floppy-disk"></i></a>\n                    <a class="open-database" href="#"><i class="fa-regular fa-folder-open"></i></a>\n                    <a class="settings" href="#"><i class="fa-solid fa-cog"></i></a>\n                    <a class="close-sidebar" href="#" title="Close Sidebar"><i class="fa-solid fa-bars"></i></a>\n                </div>\n            </nav>\n        `}_conversationClickHandlers(){this.container.querySelectorAll(".conversations .list a").forEach(e=>{e.onclick=t=>{t.preventDefault();this.container.querySelectorAll(".conversations .list a").forEach(e=>e.classList.remove("selected"));e.classList.add("selected");this.selectedConversationIndex=e.dataset.id;this.loadConversation(this.selectedConversation);this.container.querySelector(".content .messages").scrollTop=this.container.querySelector(".content .messages").scrollHeight}})}_conversationTitleClickHandler(){this.container.querySelector(".conversation-title i.edit").onclick=()=>{this.container.querySelector(".conversation-title .text").contentEditable=true;this.container.querySelector(".conversation-title .text").focus();let e=()=>{this.container.querySelector(".conversation-title .text").contentEditable=false;this.selectedConversation.name=this.container.querySelector(".conversation-title .text").innerText;this.container.querySelector(".conversation-title .text").blur();this.container.querySelector('.conversations .list a[data-id="'+this.selectedConversationIndex+'"]').innerHTML='<i class="fa-regular fa-message"></i>'+this.selectedConversation.name;this.container.querySelector('.conversations .list a[data-id="'+this.selectedConversationIndex+'"]').title=this.selectedConversation.name;this.updateTitle()};this.container.querySelector(".conversation-title .text").onblur=()=>e();this.container.querySelector(".conversation-title .text").onkeydown=t=>{if(t.keyCode==13){t.preventDefault();e()}}};this.container.querySelector(".conversation-title i.delete").onclick=()=>{if(confirm("Are you sure you want to delete this conversation?")){this.conversations.splice(this.selectedConversationIndex,1);this.selectedConversation=[];this.selectedConversationIndex=null;this.container.querySelector(".content").innerHTML="";this.container.querySelector(".conversations .list .conversation.selected").remove();this.updateTitle();if(!this.container.querySelector(".content .welcome")){this.container.querySelector(".content").insertAdjacentHTML("afterbegin",this._welcomePageTemplate())}this._openDatabaseEventHandlers()}}}_openDatabaseEventHandlers(){this.container.querySelectorAll(".open-database").forEach(e=>{e.onclick=e=>{e.preventDefault();if(document.title.startsWith("*")&&!confirm("You have unsaved changes. Continue without saving?")){return}this.getJsonFile().then(e=>{if(e!==undefined){if(this.container.querySelector(".content .messages")){this.container.querySelector(".content .messages").remove()}if(!this.container.querySelector(".content .welcome")){this.container.querySelector(".content").insertAdjacentHTML("afterbegin",this._welcomePageTemplate())}this.container.querySelector(".conversations .list").innerHTML="";this.selectedConversation=[];this.selectedConversationIndex=null;this.conversations=e.content;document.title=e.name;this.options.title=e.name;this.conversations.forEach((e,t)=>{this.container.querySelector(".conversations .list").insertAdjacentHTML("beforeend",`<a class="conversation" href="#" data-id="${t}" title="${e.name}"><i class="fa-regular fa-message"></i>${e.name}</a>`)});this._conversationClickHandlers();this._openDatabaseEventHandlers()}})}})}_eventHandlers(){this.container.querySelector(".message-form").onsubmit=e=>{e.preventDefault();this.clearWelcomeScreen();if(this.selectedConversation===undefined){this.selectedConversationIndex=this.createNewConversation()}let t=new Date;this.selectedConversation.messages.push({role:"user",content:this.container.querySelector(".message-form input").value,date:t});this.container.querySelector(".messages").insertAdjacentHTML("afterbegin",`\n                <div class="message assistant active">\n                    <div class="wrapper">\n                        <div class="avatar">AI</div>\n                        <div class="details">\n                            <div class="date" data-date="${t}" title="${t}">just now</div>\n                            <div class="text"><span class="blink">_</span></div>\n                        </div>\n                    </div>\n                </div>\n                <div class="message user">\n                    <div class="wrapper">\n                        <div class="avatar"><i class="fa-solid fa-user"></i></div>\n                        <div class="details">\n                            <div class="date" data-date="${t}" title="${t}">just now</div>\n                            <div class="text">${this.container.querySelector(".message-form input").value}</div>\n                        </div>\n                    </div>\n                </div>\n            `);this.container.querySelector(".message-form input").disabled=true;this.getMessage(this.container.querySelector(".message-form input").value);this.container.querySelector(".message-form input").value="";this.updateTitle()};window.addEventListener("keydown",e=>{if(e.ctrlKey&&e.key==="s"){e.preventDefault();this.saveJsonToFile(this.conversations)}});window.addEventListener("beforeunload",e=>{if(document.title.startsWith("*")&&!confirm("You have unsaved changes. Are you sure you want to leave?")){e.preventDefault();e.returnValue=""}});this.container.querySelector(".save").onclick=e=>{e.preventDefault();this.saveJsonToFile(this.conversations)};this.container.querySelector(".conversations .new-conversation").onclick=e=>{e.preventDefault();this.selectedConversationIndex=this.createNewConversation()};this.container.querySelector(".open-sidebar").onclick=e=>{e.preventDefault();this.container.querySelector(".conversations").style.display="flex";this.container.querySelector(".open-sidebar").style.display="none";localStorage.setItem("sidebar","open")};this.container.querySelector(".close-sidebar").onclick=e=>{e.preventDefault();this.container.querySelector(".conversations").style.display="none";this.container.querySelector(".open-sidebar").style.display="flex";localStorage.setItem("sidebar","closed")};if(localStorage.getItem("sidebar")==="closed"){this.container.querySelector(".conversations").style.display="none";this.container.querySelector(".open-sidebar").style.display="flex"}this.container.querySelector(".settings").onclick=e=>{e.preventDefault();this.openSettingsModal()};setInterval(()=>{this.container.querySelectorAll("[data-date]").forEach(e=>{e.innerHTML=this.formatElapsedTime(e.getAttribute("data-date"))})},12e4);this._openDatabaseEventHandlers();this._conversationClickHandlers()}get APIKey(){return this.options.api_key}set APIKey(e){this.options.api_key=e}get model(){return this.options.model}set model(e){this.options.model=e}get source(){return this.options.source}set source(e){this.options.source=e}get conversations(){return this.options.conversations}set conversations(e){this.options.conversations=e}get selectedConversationIndex(){return this.options.selected_conversation}set selectedConversationIndex(e){this.options.selected_conversation=e}get selectedConversation(){return this.conversations[this.selectedConversationIndex]}set selectedConversation(e){this.conversations[this.selectedConversationIndex]=e}get container(){return this.options.container}set container(e){this.options.container=e}get maxTokens(){return parseInt(this.options.max_tokens)}set maxTokens(e){this.options.max_tokens=parseInt(e)}}
//# sourceMappingURL=ChatAI.js.map