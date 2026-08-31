require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getWeather(city){

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geadate = await geoRes.json();

    if(geadate.results.length === 0)
        return {error : "this city is not exit"};
    const { latitude, longitude, name } = geadate.results[0];
     const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
    const weatherData = await weatherRes.json();
        return {
        city: name,
        temperature: weatherData.current.temperature_2m,
        unit: "°C"
    };
}
const weatherFunctionDeclaration = {
    name: "getWeather",
    description: "Jib l-harara l-7ali (current temperature) dyal chi ville",
    parameters: {
        type: "object",
        properties: {
            city: {
                type: "string",
                description: "Smiya dyal l-ville, mesalan 'Casablanca' wla 'Paris'"
            }
        },
        required: ["city"]
    }
}

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    tools: [{
        functionDeclarations: [weatherFunctionDeclaration]
    }]

});

async function chatwithtools(city) {
    const result = await model.generateContent(city);
    const response = result.response;

    const functionCalls = response.functionCalls();
    if (!functionCalls || functionCalls.length === 0) {
        console.log("Jawab:", response.text());
        return;
    }

    const call = functionCalls[0];
    console.log(`${call.name}(${JSON.stringify(call.args)})`);

    let functionResult;
    if (call.name === "getWeather") {
        functionResult = await getWeather(call.args.city);
    } else {
        functionResult = { error: "Function machi m3rofa" };
    }
    console.log("Nta9j dyal function:", functionResult);

    const result2 = await model.generateContent([
        { role: "user", parts: [{ text: city }] },
        { role: "model", parts: [{ functionCall: call }] },
        { role: "user", parts: [{ functionResponse: { name: call.name, response: functionResult } }] }
    ]);

    console.log("\nJawab nihai:", result2.response.text());
}

chatwithtools("how temprature in Casablanca?");