# 🎨 Architectural & Visual Design Document - Academic Ghostwriter

## 1. System Architecture
The Academic Ghostwriter platform is built on a modern **Full-Stack AI-Native Architecture**.

### 1.1 Application Layer
- **Next.js 15 (App Router)**: Orchestrates the frontend components and server-side logic.
- **API Routes**: Handle document processing, AI orchestration, and exam prediction logic (`app/api/predict/`).
- **Multimodal Handler**: Custom ingestion pipelines utilizing **OfficeParser** and Gemini's native multimodal capabilities.

### 1.2 AI Intelligence Layer
- **Google Gemini 2.0 Flash**: The primary engine for high-speed, multimodal inference (Text, Audio, Video).
- **OpenAI GPT-4o**: Fallback/alternative engine for complex text-based reasoning tasks.
- **Multi-Agent Stack**: Specialized agents for the Exam Predictor module that analyze patterns and assign likelihood scores.

### 1.3 State & Storage
- **Environment Driven**: Configuration managed via `.env` for API authentication.
- **Local State Management**: Efficient handling of streaming AI responses and document analysis status.

## 2. Visual Design Language: "Brutalist-Glass"
The design philosophy bridges the gap between raw data efficiency and premium consumer aesthetics.

### 2.1 Aesthetic Pillars
- **Glassmorphic Bento Grid**: Modular sections with high back-drop blur (`bg-white/5 backdrop-blur-xl`) and thin borders.
- **Cinematic Monochromatic Accents**: Dark mode theme (`#020617`) with vibrant neon highlights (primarily cyber-cyan and electric-blue).
- **Kinetic Typography**: Use of bold, oversized headers combined with sharp, mono-spaced technical fonts.

### 2.2 Interaction & Motion
- **Typewriter Streaming**: Framer Motion handles the smooth entry of individual words/tokens during AI synthesis.
- **Magnetic Micro-animations**: UI elements that react to cursor proximity for a tactile feel.
- **Particle Trails**: Subtle 3D-like particle effects in the background to add life without distracting from content.
- **Mermaid Visualizer**: Dynamic rendering of Mermaid.js code into SVG diagrams for instant architectural/logical understanding.

## 3. Data Flow Strategy
1. **Upload**: User provides PDF/PPTX/Audio -> `OfficeParser` extracts raw data or file is sent to Gemini Multimodal window.
2. **Analysis Trigger**: Next.js Server Actions route data to the appropriate AI Orchestrator.
3. **Structured Synthesis**:
   - **Text Agent**: Generates Big Picture, Concepts, and Signals.
   - **Diagram Agent**: Summarizes logical flows into Mermaid-compatible syntax.
   - **Predictor Agent**: Scans for specific keywords and emphasis markers to calculate exam probability.
4. **Streaming Delivery**: AI output is streamed word-by-word to the frontend UI using Vercel AI SDK or native readable streams.
5. **Interactive Render**: Mermaid diagrams and Flashcards are rendered on the fly as components.

## 4. Key Directories
- `app/workflow-assistant/`: The primary study extraction interface.
- `app/predictor/`: Layout and components for the Exam Predictor module.
- `src/components/`: Modular, reusable UI components including the diagram visualizer and bento-grid modules.
