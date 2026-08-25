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
        
        if(data.success)
        {
            const resultObj = data.data; 

            document.getElementById("answerText").innerHTML = `
                <div style="border-bottom: 1px solid #4ade80; padding-bottom: 10px; margin-bottom: 10px;">
                    <h3 style="color: #4ade80; margin: 0;">📌 ${resultObj.title}</h3>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">${resultObj.explanation}</p>
                <div style="margin-top: 15px; font-size: 12px; color: #fbbf24;">
                    📈 Nisbat T-t2akod (Confidence Score): <strong>${resultObj.confidence_score}%</strong>
                </div>
            `;
            document.getElementById("thinkingText").innerText = "";
        } else {
            document.getElementById("answerText").innerText = "❌ Error: " + data.error;
        }
    } catch (err) {
        alert("S-Serveur ma-khddamsh. Check if Node.js is running.");
    }
}