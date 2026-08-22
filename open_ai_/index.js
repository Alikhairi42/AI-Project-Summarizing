require('dotenv').config();
const { GoogleGenAI: google } = require('@google/genai');

const ai = new google({
    apiKey: process.env.GEMINI_API_KEY,
});

async function runai() {

    try {
        const respons = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Hi! My name is Karim, I am 30 years old and I work as a React Developer in Rabat.",
            config: {
                systemInstruction: "You are a data extractor. Extract the user's name, age, and job. Return strictly a JSON object.",
                responseMimeType: "application/json",
            }
        })
        const res = respons.text;
        console.log(res);
        const pars = JSON.parse(respons);
        console.log(`${pars.name}`);
    } catch (error) {
        console.error('kin error\n');
    }
}
runai();