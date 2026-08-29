const { pipeline, env } = require('@xenova/transformers');

env.backends.onnx.wasm.numThreads = 1;

function cosineSimilarity(vect1, vect2){
    let dotProduct = 0; 
    for(let i = 0; i < vect1.length; i++){
        dotProduct += vect1[i] * vect2[i]; 
    }
    return dotProduct;
}

async function runMiniRaG(){
    console.log("⏳ Start model (Had L-Merra ghay-khdem!)...\n");

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

    console.log("✅ Fix data\n");

    const userQuery = "What is the capital of Morocco?";
    console.log(`🔎 S-Sou2al: "${userQuery}"`);
    
    const queryResult = await extractor(userQuery, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(queryResult.data);
    
    let bestMatch = null;
    let highestScore = -1;
    
    for (let item of vectdb) {
        const score = cosineSimilarity(queryVector, item.embedding);
        console.log(`   - Score: ${(score * 100).toFixed(1)}% | Text: "${item.text}"`);

        if (score > highestScore) {
            highestScore = score;
            bestMatch = item.text;
        }
    }

    console.log(`\n🏆 A9rab Jawab Lqnah f L-DB: "${bestMatch}"`);
}

runMiniRaG();