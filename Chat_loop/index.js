require('dotenv').config();
const OpenAI = require('openai');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

let history =[];
async function askAI() {
    let full = "";
    while (true) {
        try {
            const question = await rl.question("\nEnter your Q (or 'exit' to quit): ");

            if (question.trim().toLowerCase() === 'exit') {
                rl.close();
                break;
            }
            history.push({ role: "user", content: question });
            let fullmsg = [
                {
                        role: "system",
                        content: "You are an expert AI. You MUST reply STRICTLY"
                },
                ...history
            ];
            const response = await client.chat.completions.create({
                model: "openai/gpt-oss-120b",
                messages: fullmsg,
                temperature: 0.7,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5,
            });
            console.log("\nResponse:", response.choices[0].message.content);
            full += response;
            history.push[{role: "assitant",content: full}];
        } catch (error) {
            console.log("error:", error.message || error);
        }
    }
}

askAI();