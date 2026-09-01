require('dotenv').config();
const { generateText} = require('ai');
const {google} = require('@ai-sdk/google');

(async function main(){
    const {text} = await generateText({
        model: google('gemini-3.6-flash'),
        prompt: 'hi are you fine?'
    })
    console.log(text);
})();