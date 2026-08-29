const { pipeline, env } = require('@xenova/transformers');

env.cacheDir = '/home/a-khairi/.cache/xenova-transformers';

function cosineSimilarity(vect1, vect2){
    let dotProduct = 0; 
    for(let i = 0; i < vect1.length; i++){
        dotProduct += vect1[i] * vect2[i]; 
    }
    return dotProduct;
}

async function runMiniRaG(){
    console.log("start model...\n");

    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    const documents = [
        "The capital of Morocco is Rabat.",
        "JavaScript is a programming language used for web development.",
        "Rabat is a beautiful city located in North Africa."
    ];

    const vectdb = [];

    for(let doc of documents){
        const result = await extractor(doc,{ pooling: 'mean', normalize: true })
        const vector = Array.from(result.data);
        vectdb.push({text: doc, embedding: vector});
    }

    console.log("Fix data\n");

    const userQuery = "What is javaScripte";
    console.log(`Q: "${userQuery}"`);
    
    const queryResult = await extractor(userQuery, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(queryResult.data);
    
    let bestMatch = null;
    let highestScore = -1;
    
    for (let ali of vectdb) {
        const score = cosineSimilarity(queryVector, ali.embedding);
        console.log(`   - Score: ${(score * 100).toFixed(1)}% | Text: "${ali.text}"`);
        console.log(score);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = ali.text;
        }
    }

    console.log(`\nA9rab Jawab Lqnah f L-DB: "${bestMatch}"`);
}

runMiniRaG();