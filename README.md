# 👻 Academic Ghostwriter

**High-Fidelity Study Extraction Engine**

Academic Ghostwriter is a premium, AI-native study assistant designed to distill lecture noise, dense PDFs, and complex presentations into exam-ready clarity. Built with the cutting-edge **Gemini 2.0 Flash** model, it provides near-instant synthesis with a high-end, cinematic user experience.

---

## ✨ Key Features

- **🚀 Multimodal Intelligence**: Process PDFs, PowerPoint slides, Word documents, and even lecture recordings (MP3/MP4) directly via Gemini's multimodal window.
- **✍️ Cinematic Typewriter UI**: Watch as the AI "thinks" and writes your study guide in real-time with a smooth, word-by-word streaming effect.
- **📊 Logic Flow Diagrams**: Automatically decompile technical complexity into visual Mermaid.js diagrams.
- **🎯 Exam Predictor**: Deploy a multi-agent autonomous stack to extract high-probability patterns and calculate exam likelihood.
- **📚 Exam-Focused Synthesis**: Automatically generates:
  - **The Big Picture**: High-level conceptual overviews.
  - **Key Concepts**: Critical definitions and core ideas.
  - **Exam Signals**: Formulas, dates, and emphasis areas likely to appear on tests.
- **🎴 Smart Flashcards**: Converts your material into interactive study cards for rapid revision.
- **💎 Ultra-Premium Design**: A high-end aesthetic featuring:
  - Kinetic Bento-grid layout.
  - Glassmorphic components with backdrop blurs.
  - Particle trails and magnetic text effects.
  - Responsive, dark-mode optimized interface.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Engine**: [Google Gemini 2.0 Flash](https://ai.google.dev/models/gemini) / [OpenAI GPT-4o](https://openai.com/)
- **Visuals**: [Mermaid.js](https://mermaid.js.org/) for Logic Flows
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Parsing**: [OfficeParser](https://www.npmjs.com/package/officeparser) (for DOCX/PPTX)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kunixx976/GHOSTWRITER.git
cd GHOSTWRITER
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

---

## 📂 Project Structure

- `app/learning-assistant/`: Custom study extraction engine.
- `app/predictor/`: AI-powered exam probability analysis.
- `app/api/predict/`: Technical literacy agent API.
- `src/components/`: Modular UI components (Mermaid Diagrams, Bento Cards, Flashcards, etc.).

---

## 🎨 Design Philosophy

The project follows a **"Brutalist-Glass"** aesthetic—combining sharp, bold typography with soft, translucent materials and vibrant neon accents. Every interaction is designed to feel tactile, responsive, and "alive."

---

*“Distilling lecture noise into exam-day clarity.”*
