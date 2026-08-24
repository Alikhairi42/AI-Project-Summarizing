async function askAI(){
    const questionInput = document.getElementById("questionInput");
    const question = questionInput.value;
    
    if(!question) return alert("Write your question!");

    document.getElementById("loadingText").style.display = "block";
    document.getElementById("resultBox").style.display = "none";
    
    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ question: question })
        });
        
        const data = await response.json();
        
        document.getElementById("loadingText").style.display = "none";
        document.getElementById("resultBox").style.display = "block";
        
        if (data.success) {
            document.getElementById("thinkingText").innerText = "🧠 Thinking: " + (data.thinking || "None");
            document.getElementById("answerText").innerText = "💬 Jawab: " + data.answer;
        } else {
            document.getElementById("answerText").innerText = "❌ Error: " + data.error;
        }
        
        questionInput.value = "";
    } catch (err) {
        alert("S-Serveur ma-khddamsh. Check if Node.js is running.");
    }
}