require('dotenv').config();
const OpenAI = require("openai");
const cors = require('cors');
const express = require("express");

const app  = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
    apiKey: precess.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
})

app.post('/api/stream', async(req,res)=>{

    const userQuestion = req.body.question;

    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.setHeader('Transfer-Encoding','chunked');

    try{
        const stream = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            message:[
                {role: "system",
                    content: "You are a helpful AI. Answer in a friendly way."
                },
                {
                    role: "user",content, userQuestion
                }
            ],
            stream: true,
            temperature:0.7
        });
        for await(const chunk of stream){
            const textChunk = chunk.choices[0]?.delta?.content ||"";
            res.write(textChunk);
        }

        res.end();
    }
    catch (error) {
        console.error("Error:", error.message);
        res.write("\n❌ L-AI.");
        res.end();
    }
})
app.listen(3000, () => {
    console.log("🚀 http://localhost:3000");
});