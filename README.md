# AI Project — Learning & Experiments

Hada repo khdmtu bash nt3llm 3la AI: theory w practice. Fih examples sghrin, experiments, w scripts bash tjeu ttaalam w tjarrab APIs.

Purpose
- Practice and collect small AI experiments (Node.js scripts, demos, simple integrations).

Repository structure
- `Chat_loop/` — simple chat example using env API key.
- `Chat_Memory/` — browser demo and scripts for memory experiments.
- `Function_Calling_Tools/` — helper agent integrations.
- `RAG_Vector_Databases/` — RAG experiments and PDF insertion scripts.
- `Streaming_Responses/` — streaming examples and server.
- `Use_vercel_ai/` — small Vercel/AI integration examples.

Quick start
1. Install Node.js (v16+ recommended).
2. From the repo root, install dependencies if a folder has a `package.json`:

```bash
cd <folder-with-package-json>
npm install
```

3. Provide API keys via environment variables (do NOT commit them). Example keys used in code:
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `SUPABASE_URL` and `SUPABASE_KEY`

Create a `.env` locally (not committed) or export vars in your shell:

```bash
export OPENAI_API_KEY="sk-..."
export GEMINI_API_KEY="..."
```

Notes on git and secrets
- The repository already ignores environment files via [.gitignore](.gitignore).
- I checked for committed `.env` files — none are present. Keep sensitive keys out of the repo.

Contributing
- This repo is for learning. Feel free to copy, modify, and experiment.

If you want, I can:
- run quick tests or try an example script
- add a small CONTRIBUTING.md or examples with step-by-step runs

Enjoy experimenting!
