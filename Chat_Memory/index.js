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
                { 
                    
                role: "system", 

                content: `You are an expert AI. You MUST reply STRICTLY in JSON format. 
                    Do not add any other text. 
                    Use this exact JSON structure:
                    {
                        "title": "Short title of the topic",
                        "explanation": "Detailed explanation",
                        "confidence_score": 95
                    }` 
                 },
                { role: "user", content: userQuestion }
            ],
            temperature: 0.7,
            top_p:0.9,
            frequency_penalty:0.5,
            presence_penalty:0.5,
            response_format:{type:"json_object"}
        });
        
        const aiRawAnswer = response.choices[0].message.content;
        const structdata = JSON.parse(aiRawAnswer);
        res.json({
            success:true,
            data: structdata
        }) ;  

    } catch (error) {
        console.error(" Error:", error.message);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

app.listen(3000, () => {
    console.log("🚀 L-Backend khddam f port 3000");
});