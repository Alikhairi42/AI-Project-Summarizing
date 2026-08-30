require('dotenv').config();
const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function chunkText(text, chunkSize = 1000, overlap = 200) {
    const chunks = [];
    let start = 0;
    while (start < text.length) {
        const end = start + chunkSize;
        const chunk = text.slice(start, end).trim();
        if (chunk.length > 0) chunks.push(chunk);
        start += (chunkSize - overlap);
    }
    return chunks;
}

async function loadPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
}

async function getEmbedding(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

async function ingestPDF(filePath) {
    console.log(`Kan9ra: ${filePath}`);
    const text = await loadPDF(filePath);
    console.log(`Total characters: ${text.length}`);

    const chunks = chunkText(text, 1000, 200);
    console.log(`3adad dyal chunks: ${chunks.length}\n`);

    for (let i = 0; i < chunks.length; i++) {
        console.log(`Embedding chunk ${i + 1}/${chunks.length}...`);
        const embedding = await getEmbedding(chunks[i]);

        const { error } = await supabase
            .from('documents')
            .insert({ content: chunks[i], embedding: embedding });

        if (error) {
            console.error(`Error f chunk ${i + 1}:`, error);
        } else {
            console.log(`Chunk ${i + 1} tzad m3a njah`);
        }
    }

    console.log(`\nSalina! ${chunks.length} chunks tzado l Supabase.`);
}

async function askRAG(userQuery) {
    console.log(`S-Sou2al: "${userQuery}"\n`);

    const queryEmbedding = await getEmbedding(userQuery);

    const { data: matches, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.3,
        match_count: 3
    });

    if (error) {
        console.error("Error/..", error);
        return;
    }

    if (!matches || matches.length === 0) {
        console.log("mashi qribe");
        return;
    }

    console.log("Documents li lqahom:");
    matches.forEach(m => console.log(`   - (${(m.similarity * 100).toFixed(1)}%) ${m.content}`));

    const context = matches.map(m => m.content).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" }); // <-- hna bdlt
    const prompt = `Jawb 3la had soual ghir b la base dyal les informations li 3tit lik. Ila l jawab machi kayn f les informations, gol "Ma3andich l ma3loumat".

Informations:
${context}

Soual: ${userQuery}`;

    const result = await model.generateContent(prompt);
    console.log(`\n🏆 Jawab: ${result.response.text()}`);
}
// ingestPDF('./ali.pdf');
askRAG("project must be written in");