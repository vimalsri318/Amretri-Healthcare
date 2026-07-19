# Frontend-Only Chatbot with Local Browser RAG

## Goal

Build a chatbot inside an existing presentation website that answers user questions without a heavy backend server.

The chatbot should support:
- Rule-based answers for fixed FAQs.
- Semantic search over stored content.
- Optional local response generation in the browser.
- No API keys in frontend code.
- No server-side LLM inference.

This should run as a client-side experience where each user’s browser handles its own computation and storage [web:28][web:20].

---

## Core Idea

The chatbot should not be a pure rule-based bot only.

Instead, use a lightweight browser pipeline:

`User Question -> Encoder/Embedding Model -> Vector Search -> Top Matches -> Response Formatter -> Answer`

Optional generation step:

`User Question -> Encoder -> Retrieval -> Small Local LLM -> Final Answer`

This is still a retrieval-based system, but it stays entirely on the client side [web:22][web:20].

---

## What We Want to Avoid

Do not build:
- A heavy Node/Python backend for every chatbot request.
- A remote vector DB server.
- API key–based cloud LLM calls.
- A hidden frontend page for secrets.

Anything shipped to the browser is inspectable, so secrets must not be placed in frontend code [web:28][web:11].

---

## Recommended Architecture

### 1. UI Layer
- Next.js / React frontend.
- Chat window.
- Suggested questions.
- Loading states.
- Streaming or incremental reply rendering if generation is used.

### 2. Rule Engine
Use rules first for exact or highly controlled questions:
- Greeting.
- Contact info.
- Pricing questions.
- Known FAQs.
- Redirects to relevant page sections.

This avoids unnecessary model usage for common cases.

### 3. Embedding Layer
Use a browser-compatible embedding model to convert:
- user questions
- FAQ entries
- document chunks
- website content

into vectors.

The embedding step is the “encoder” part of the pipeline.

### 4. Vector Store
Store embeddings locally in the browser using one of:
- IndexedDB
- OPFS
- local browser vector storage

The browser keeps this data per user/device, not shared globally [web:15][web:20][web:28].

### 5. Similarity Search
When a user asks a question:
- embed the query,
- compare it with stored vectors,
- retrieve top-k matches,
- pass matched chunks to the response layer.

Cosine similarity is enough for the first version.

### 6. Response Layer
Two options:
- Template-based response using retrieved chunks.
- Small browser LLM to generate a natural response from retrieved chunks.

If using a local LLM, keep the model small and quantized.

---

## Suggested Flow

### FAQ Flow
1. User asks a question.
2. Rule engine checks exact match or intent match.
3. If matched, return a predefined answer.
4. If not matched, continue to semantic retrieval.

### RAG Flow
1. User asks a question.
2. Convert question to embedding.
3. Search local vector store for similar content.
4. Retrieve top relevant text chunks.
5. Return:
- a direct answer from templates, or
- a local LLM-generated answer from retrieved context.

### Fallback Flow
If no good retrieval result is found:
- show “I could not find an exact match”.
- suggest related questions.
- optionally route to contact/support.

---

## Why This Works

This design is good because:
- It removes most backend load.
- Each user’s browser handles its own search and inference.
- Data can stay local for privacy.
- Hosting cost stays low.
- FAQ performance remains deterministic.

Browser-based RAG systems already use similar approaches with WebGPU/WebAssembly, IndexedDB, and local embeddings [web:22][web:20][web:32].

---

## Browser Storage Strategy

Use browser-side persistence for:
- cached model files,
- embeddings,
- chunk metadata,
- recent conversations.

Preferred storage options:
- IndexedDB for structured persistence.
- OPFS for private local file-like storage.
- Cache API for model/runtime assets.

WebLLM documents browser storage and caching strategies for model artifacts, and recommends IndexedDB for more persistent reuse [web:28].

---

## Model Strategy

### Best First Version
- Use rule-based FAQ + semantic search only.
- Skip generation at first.
- Return the best-matching answer snippet.

### Better Version
- Add a small in-browser LLM for answer rewriting.
- Keep the model quantized.
- Prefer WebGPU-supported browsers.

### Avoid
- Large models.
- Cloud inference.
- Anything requiring a strong backend.

WebLLM and browser-native inference examples show that small local models are feasible, but model size and device capability matter [web:2][web:28][web:26].

---

## Data Preparation

Prepare content as chunks:
- split FAQ pages into small answer units,
- split documents into paragraphs or sections,
- store metadata like title, source URL, and category.

Each chunk should contain:
- `id`
- `text`
- `source`
- `category`
- `embedding`

Chunking should be done before embedding, not after.

---

## Retrieval Rules

Use top-k retrieval:
- `k = 3` or `k = 5` for first version.
- Apply a similarity threshold.
- If similarity is too low, fall back to rule-based or default answer.

Recommended logic:
- exact match first,
- semantic search second,
- generation last.

---

## Performance Notes

Keep the system small and responsive:
- Run embedding and vector search in a Web Worker.
- Keep the UI thread free.
- Cache model and embeddings locally.
- Load the model lazily only when needed.

Web-based browser AI systems often use Web Workers and browser storage to avoid blocking the main thread [web:20][web:22].

---

## Security Notes

- Do not put API keys in frontend code.
- Do not store private admin secrets in hidden pages.
- Assume the browser is not a secure secret vault.
- If protected updates are needed, use a minimal backend only for admin actions.

For the chatbot runtime itself, no secret is required if everything is local.

---

## Suggested Tech Stack

### Frontend
- Next.js or React
- TypeScript
- Tailwind or plain CSS

### Local AI
- WebLLM for browser inference
- Transformers.js or ONNX Runtime Web for embeddings

### Storage
- IndexedDB
- OPFS if needed

### Background Processing
- Web Workers
- Comlink optional

### Hosting
- Vercel or any static host

---

## Acceptance Criteria

The implementation is done when:
- The chatbot works inside the browser.
- FAQs answer instantly.
- Similar questions are matched semantically.
- Content is stored locally per user.
- No heavy backend is required for chat.
- No API keys are exposed in frontend code.
- The app remains usable on modern desktop browsers.

---

## MVP Scope

### Phase 1
- Rule-based FAQ chatbot.
- Local question matching.
- No generation.

### Phase 2
- Add embeddings.
- Add browser vector storage.
- Add semantic search.

### Phase 3
- Add optional small in-browser LLM for response formatting.

### Phase 4
- Improve caching, indexing, and UX.

---

## Example Query Flow

User: “How do I contact support?”

System:
1. Check FAQ rules.
2. If exact match exists, return the contact answer.
3. If not, embed the query.
4. Search vectors for “contact”, “support”, “help”.
5. Return the best match.
6. Optionally rewrite the answer in a friendly tone.

---

## Deliverables

The coding agent should produce:
- Chat UI.
- Rule engine.
- Embedding module.
- Vector store module.
- Retrieval module.
- Optional local generation module.
- Browser caching/persistence layer.
- README with setup instructions.

---

## Final Recommendation

Do not build a heavy server-first chatbot.

Build a **browser-first local semantic chatbot**:
- rules for known questions,
- embeddings for similarity,
- local storage for vectors,
- optional small local LLM for response generation.

This is the simplest practical version of your ideation.