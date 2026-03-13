# 👻 Ghostwriter

**High-Fidelity Study Extraction Engine**

Ghostwriter is a premium, AI-native study assistant designed to distill lecture noise, dense PDFs, and complex presentations into exam-ready clarity. Built with the cutting-edge AWS System Architecture, it provides near-instant synthesis with a high-end, cinematic user experience.

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

- **AWS Cloud Services (Backend)**
- Service Amazon Bedrock: AI reasoning engine Claude 3.5 Sonnet for multimodal synthesis 
- Amazon Textract: Document OCR Extract text, formulas, tables from PDFs 
- AWS Lambda: Serverless compute Neural orchestrator, document parser 
- Amazon S3: Storage + hosting User uploads, processed content, frontend assets 
- Amazon DynamoDB: NoSQL database User profiles, study guides, flashcards 
- Amazon API Gateway: API management RESTful + WebSocket endpoints 
- Amazon CloudFront: Global CDN 450+ edge locations worldwide 
- AWS Cognito: Authentication User pools, JWT tokens, MFA

- **Frontend Stack**
- Next.js 15 React framework with App Router, SSR/SSG 
- React 19 UI component library 
- TypeScript 5 Type-safe development 
- Tailwind CSS 4.0 Utility-first styling, glassmorphism 
- Framer Motion Cinematic animations, typewriter effect 
- Mermaid.js Auto-generated logic flow diagrams 
- Lucide React Modern icon library
  
---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/divya-a2437/AI-For-Bharat.git
cd GHOSTWRITER
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
WS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
KNOWLEDGE_TABLE=ghostwriter-knowledge-vault
DATA_LAKE_BUCKET=ghostwriter-multimodal-data-lake
TEXTRACT_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:ghostwriter-textract-notifications
TEXTRACT_ROLE_ARN=arn:aws:iam::YOUR_ACCOUNT_ID:role/GhostwriterTextractRole
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

---

## 📂 Project Structure

- `app/workflow-assistant/`: Custom study extraction engine.
- `app/predictor/`: AI-powered exam probability analysis.
- `app/api/predict/`: Technical literacy agent API.
- `src/components/`: Modular UI components (Mermaid Diagrams, Bento Cards, Flashcards, etc.).

---

## 🎨 Design Philosophy

The project follows a **"Brutalist-Glass"** aesthetic—combining sharp, bold typography with soft, translucent materials and vibrant neon accents. Every interaction is designed to feel tactile, responsive, and "alive."

---

*“Distilling lecture noise into exam-day clarity.”*
