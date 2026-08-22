require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function runGemini() {
    console.log("⏳ Gemini kay-fker, tsena chwiya...\n");

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Hi! My name is Karim, I am 30 years old and I work as a React Developer in Rabat.",
            config: {
                systemInstruction: "You are a data extractor. Extract the user's name, age, and job. Return strictly a JSON object.",
                temperature: 0.9,
                maxOutputTokens: 150,
                topP: 0.9,
                topK: 40,
                responseMimeType: "application/json",
            },
        });

        const aiJawab = response.text;

        console.log("✅ Jawab dyal Gemini (JSON Kham):");
        console.log(aiJawab);

        const parsedData = JSON.parse(aiJawab);

        console.log(
            `\n🎉 L-Khdma dyal ${parsedData.name} hiya: ${parsedData.job} f mdinat Rabat.`
        );
    } catch (error) {
        console.error("❌ Wqe3 mochkil:", error);
    }
}

runGemini();