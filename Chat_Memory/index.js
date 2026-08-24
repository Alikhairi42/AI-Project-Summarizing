require('dotenv').config();
const express = require("express");
const cors = require('cors');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.post('/api/chat', async(req , res) => {
    const userQuestion = req.body.question; 
    
    try {
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userQuestion }
            ],
            temperature: 0.5,
            max_tokens: 300
        });
        
        const aiAnswer = response.choices[0].message.content;    
        const aiThinking = response.choices[0].message.reasoning;
        res.json({success: true, answer: aiAnswer, thinking: aiThinking});

    } catch (error) {
        console.error(" Error:", error.message);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

app.listen(3000, () => {
    console.log("🚀 L-Backend khddam f port 3000");
});