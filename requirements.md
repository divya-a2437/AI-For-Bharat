# 📋 Product Requirements Document - Academic Ghostwriter

## 1. Project Overview
**Academic Ghostwriter** is a high-fidelity study extraction engine designed to distill lecture noise, dense PDFs, and complex presentations into exam-ready clarity. It leverages multimodal LLMs to provide near-instant synthesis with a premium, cinematic user experience.

## 2. Functional Requirements

### 2.1 Multimodal Ingestion
- Support for uploading and parsing multiple file formats:
  - **PDFs**: Text-heavy academic papers and documents.
  - **PowerPoint (PPTX)**: Lecture slides and presentations.
  - **Word (DOCX)**: Course notes and summaries.
  - **Media (MP3/MP4)**: Lecture recordings for audio/video transcription and analysis.
- Integration with **OfficeParser** for robust document structure extraction.

### 2.2 Core Synthesis Engine
- **The Big Picture**: Generate high-level conceptual overviews.
- **Key Concepts**: Identify and define critical definitions and core ideas.
- **Exam Signals**: Highlight formulas, dates, and emphasis areas likely to appear on tests.
- **Logic Flow Synthesis**: Automatically generate **Mermaid.js** diagrams to visualize technical complexity and workflows.

### 2.3 Productivity & Assessment Modules
- **Exam Predictor**: Use a multi-agent autonomous stack to calculate the probability of specific topics appearing on exams based on historical patterns and emphasis.
- **Smart Flashcards**: Automatically convert synthesized material into interactive study cards for rapid revision (Active Recall).
- **Cinematic Streaming**: Real-time "Typewriter" effect for AI response streaming to enhance user engagement.

### 2.4 User Experience (UX)
- **Cinematic Terminal UI**: A high-end experience featuring kinetic layouts and smooth transitions.
- **Mobile Responsiveness**: Fully functional interface across mobile, tablet, and desktop devices.
- **Bento Grid Layout**: Efficient organization of information modules.

## 3. Non-Functional Requirements

### 3.1 Performance
- **Near-Instant Synthesis**: Leverage **Gemini 2.0 Flash** for sub-second inference and response generation.
- **Optimized Asset Delivery**: Fast initial page loads via Next.js App Router and optimized Tailwind CSS.

### 3.2 Reliability & Precision
- **Grounded Information**: Ensure AI responses are strictly derived from provided source material.
- **Technical Literacy**: High-accuracy parsing of mathematical formulas and technical documentation.

### 3.3 Security
- **Secure Environment Management**: Protection of API keys (Gemini, OpenAI) via environment variables.

## 4. Technical Constraints
- **Core Framework**: Next.js 15 (App Router).
- **AI Engines**: Google Gemini 2.0 Flash (Primary) / OpenAI GPT-4o (Secondary).
- **Visualization**: Mermaid.js for diagrams.
- **Animations**: Framer Motion.
- **Design System**: Tailwind CSS 4.0.
