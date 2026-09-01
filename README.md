```markdown
# AI Project — Learning Notes & Examples

This repository is a personal learning playground for experimenting with AI concepts and small end-to-end examples. It contains short demos, scripts, and web examples to explore theory and practice.

## What I learned (high-level)
- **Fundamentals:** basic concepts of LLMs, embeddings, and vector search (how retrieval-augmented generation works).
  - *Resource:* [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- **API usage:** calling LLM APIs from Node.js, managing API keys via environment variables, and handling streaming responses.
  - *Resource:* [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- **Function calling:** implementing helper functions / agents to structure outputs and call external tools.
  - *Resource:* [OpenAI Function Calling Docs](https://platform.openai.com/docs/guides/function-calling)
- **RAG & Vector DBs:** indexing documents, creating embeddings, and retrieving context for better answers.
  - *Resource:* [Supabase Vector (pgvector) Docs](https://supabase.com/docs/guides/ai)
- **Browser demos:** simple client-side memory experiments and UI patterns for conversational memory.
  - *Resource:* [Vercel AI SDK Core](https://sdk.vercel.ai/docs/introduction)

## Repository structure
- `Chat_loop/` — simple Node.js chat loop example that reads `OPENAI_API_KEY` from the environment.
- `Chat_Memory/` — browser demo and scripts demonstrating conversational memory concepts.
- `Function_Calling_Tools/` — small agent and function-calling helper code.
- `RAG_Vector_Databases/` — experiments for RAG workflows and a PDF insert script using Supabase.
- `Streaming_Responses/` — server and client examples for streaming model outputs.
- `Use_vercel_ai/` — short Vercel/AI integration example.

## How I tested things
Run each example folder that has a `package.json`:

```bash
cd <folder>
npm install
node index.js   # or follow the folder's README if present
```

Provide API keys locally (do NOT commit them): set `OPENAI_API_KEY`, `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY` as needed.

## Security & best practices
- Keep API keys out of source control. The repo already includes a `.gitignore` ignoring `.env` and `.env.*`.
- Prefer environment variables or a local `.env` file (excluded by git) when running examples.

## Next steps I recommend
- Add short READMEs inside folders with exact run commands and minimal `package.json` files for easier testing.
- Add small automated smoke tests to verify examples run with dummy tokens or mocks.
- Create a `CONTRIBUTING.md` describing how to safely add experiments without leaking secrets.