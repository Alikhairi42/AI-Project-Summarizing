"use strict";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let chatHistory = []; 

async function askAI() {
    const questionInput = document.getElementById("questionInput");
    const answerDiv = document.getElementById("answerText");
    const cursor = document.getElementById("cursor");
    const sendBtn = document.getElementById("sendBtn");

    const question = questionInput.value;
    if (!question) 
        return alert("Write your question!");

    chatHistory.push({ role: "user", content: question });

    answerDiv.innerHTML = ""; 
    answerDiv.appendChild(cursor);
    sendBtn.disabled = true;
    sendBtn.innerText = "⏳ Kay-fker..."; 
    
    try {
        const response = await fetch("http://localhost:3000/api/stream", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ question: chatHistory })
        });
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
         let fullAiAnswer = "";
            while (true) {
            const { done, value } = await reader.read();

            if (done) break; 
            
            const textChunk = decoder.decode(value, {stream:true});
            fullAiAnswer += textChunk; 
            let formattedChunk = textChunk
                .replace(/\n/g, "<br><br>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
                .replace(/\*(.*?)\*/g, "<em>$1</em>") 
                .replace(/- /g, "• ");
            
            await sleep(20); 

            cursor.insertAdjacentHTML('beforebegin', formattedChunk);
        }
        chatHistory.push({ role: "assistant", content: fullAiAnswer });

    } catch (err) {
        alert("S-Serveur ma-khddamsh!");
        console.error(err);
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerText = "Sifet (Stream)";
        questionInput.value = "";
    }
}