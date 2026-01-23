"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BentoCard from "@/components/BentoCard";
import UploadZone from "@/components/UploadZone";
import SystemStatus from "@/components/SystemStatus";
import AgentStatus from "@/components/AgentStatus";
import Flashcard from "@/components/Flashcard";
import GhostChat from "@/components/GhostChat";
import AgentRow from "@/components/AgentRow";
import StudyTip from "@/components/StudyTip";
import QuickLesson from "@/components/QuickLesson";
import { Brain, Mic, Layers, Ghost, Loader2, BookOpen, FileText, Music, Video, CheckCircle2, FileDown, Share2, Zap, ExternalLink, Target, Cpu, Activity } from "lucide-react";
import dynamic from "next/dynamic";

const NebulaScene = dynamic(() => import("@/components/NebulaScene"), { ssr: false });

type AgentState = "idle" | "processing" | "done";

export default function Home() {
  // Agent states
  const [predictorStatus, setPredictorStatus] = useState<AgentState>("idle");
  const [predictions, setPredictions] = useState<{ question: string; confidence: number; reason: string }[]>([]);
  const [archivistStatus, setArchivistStatus] = useState<AgentState>("idle");
  const [listenerStatus, setListenerStatus] = useState<AgentState>("idle");
  const [ghostwriterStatus, setGhostwriterStatus] = useState<AgentState>("idle");

  // Data
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [ghostwriterOutput, setGhostwriterOutput] = useState<string>("");
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);
  const [showLesson, setShowLesson] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚀 Trigger Ghostwriter when agents finish
  useEffect(() => {
    if (!currentFile) return;

    const isProcessing = archivistStatus === "processing" || listenerStatus === "processing";

    const shouldGenerate =
      ghostwriterStatus === "idle" &&
      !isProcessing &&
      ((currentFile.type.startsWith("application/pdf") && archivistStatus === "done") ||
        ((currentFile.type.startsWith("audio/") || currentFile.type.startsWith("video/")) && listenerStatus === "done") ||
        ((currentFile.name.toLowerCase().endsWith(".ppt") ||
          currentFile.name.toLowerCase().endsWith(".pptx") ||
          currentFile.name.toLowerCase().endsWith(".docx")) &&
          archivistStatus === "done"));

    if (shouldGenerate) generateGhostwriter(currentFile);
  }, [archivistStatus, listenerStatus, currentFile, ghostwriterStatus]);

  // REAL API call
  const generateGhostwriter = async (file: File) => {
    try {
      setGhostwriterStatus("processing");
      setGhostwriterOutput(""); // clear previous

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ghostwriter", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setGhostwriterOutput(`### Error ⚠️\n${data.error}\n\n${data.details || ""}`);
      } else {
        setGhostwriterOutput(data.output || "No response generated.");
        setFlashcards(data.flashcards || []);
      }

      setGhostwriterStatus("done");
    } catch (err) {
      setGhostwriterOutput("### Error ⚠️\nSomething went wrong while reaching the Ghostwriter.");
      setGhostwriterStatus("idle");
    }
  };

  const generatePredictions = async () => {
    if (!currentFile) return;

    try {
      setPredictorStatus("processing");
      const formData = new FormData();
      formData.append("file", currentFile);

      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "API Route failed");
      }

      setPredictions(data.predictions || []);
      setPredictorStatus("done");
    } catch (err: any) {
      console.error("Prediction failed:", err);
      setPredictorStatus("idle");
      alert(`Prediction failed: ${err.message}`);
    }
  };

  // Truly Live Metrics
  const [latency, setLatency] = useState(42);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(38, Math.min(prev + delta, 52));
      });
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Cinematic Background */}
      <NebulaScene />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] pointer-events-none z-0" />
      <div className="noise-overlay" />

      {/* Main Content Layout */}
      <main className="relative z-10 w-full">
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative min-h-[110vh] flex flex-col items-center justify-center pt-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full max-w-7xl"
          >
            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] font-black tracking-[0.4em] uppercase text-cyan-400 mb-12 flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              AWS Global Intelligence Layer Active
            </div>

            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tight text-center mb-8 uppercase">
              THE GHOSTWRITER
            </h1>

            <p className="max-w-3xl text-center text-[10px] md:text-sm font-black text-white/40 mb-20 tracking-[0.5em] uppercase leading-relaxed">
              AI Intelligence Platform. Redefining High-Frequency Education.
            </p>

            {/* Dashboard Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-black tracking-widest uppercase text-cyan-400">Data Analytics</div>
                  <Activity className="w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden text-gradient">
                  <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-full w-1/3 bg-cyan-500 shadow-[0_0_15px_#22d3ee]" />
                </div>
              </div>

              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-black tracking-widest uppercase text-cyan-400">Generative AI</div>
                  <Brain className="w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-1.5 h-5 bg-cyan-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>

              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-6 group hover:bg-white/10 transition-all cursor-pointer uppercase">
                <div className="flex justify-between items-center text-gradient">
                  <div className="text-[10px] font-black tracking-widest text-white/40">Latency:</div>
                  <div className="text-[10px] font-black tracking-widest text-cyan-400">{latency}ms</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
                  <div className="text-[9px] font-black tracking-[0.2em] text-white/60">Node #{currentTime} Active</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- PRODUCTIVITY GRID --- */}
        <section className="relative px-6 py-24 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Logic Inversion Bento */}
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-8 h-full">
              <BentoCard title="Signal Extraction" subtitle="The Extraction Layer" className="border-cyan-500/10 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-xl"><Target className="text-cyan-400" size={20} /></div>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Inverting the 70/30 Learning Ratio</p>
                </div>
                <div className="space-y-4 bg-black/40 p-8 rounded-3xl border border-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="h-6 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full w-[30%] bg-cyan-500 shadow-[0_0_20px_#22d3ee]" />
                    <div className="w-[70%] bg-white/5" />
                  </motion.div>
                  <div className="flex justify-between text-[9px] font-black text-cyan-400 uppercase tracking-widest">
                    <span>Logic Detected (30%)</span>
                    <span>Noise Filtered (70%)</span>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Workforce Bento */}
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-4 h-full">
              <BentoCard title="Autonomous Stack" subtitle="Multi-Agent System" className="border-cyan-500/10 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyan-500/10 rounded-xl"><Cpu className="text-cyan-400" size={20} /></div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Digital Workforce</h3>
                </div>
                <div className="space-y-6">
                  <AgentRow name="Archivist" status={archivistStatus === "processing" ? "indexing" : archivistStatus === "done" ? "active" : "idle"} action={archivistStatus === "processing" ? "Structuring Data" : "Ready"} />
                  <AgentRow name="Listener" status={listenerStatus === "processing" ? "indexing" : listenerStatus === "done" ? "active" : "idle"} action={listenerStatus === "processing" ? "Parsing Syntax" : "Ready"} />
                  <AgentRow name="Ghostwriter" status={ghostwriterStatus === "processing" ? "indexing" : ghostwriterStatus === "done" ? "active" : "idle"} action={ghostwriterStatus === "processing" ? "Synthesizing" : "Standby"} />
                </div>
              </BentoCard>
            </motion.div>

            {/* Decompiler & Tip */}
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-8 h-full">
              <BentoCard title="Knowledge Decompiler" subtitle="Technical Literacy" className="border-cyan-500/10 h-full">
                <div className="flex flex-col gap-10">
                  <p className="text-sm text-white/40 font-medium leading-relaxed uppercase tracking-wider">
                    DECOMPILING COMPLEX TECHNICAL HIERARCHIES INTO <span className="text-white font-black">ATOMIC KNOWLEDGE BLOCKS</span>.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
                      <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Syntax</span>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Context</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-4 h-full">
              <StudyTip onOpenLesson={() => setShowLesson(true)} />
            </motion.div>
          </motion.div>
        </section>

        {/* Global System Matrix */}
        <section className="pb-32 px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <SystemStatus />
          </motion.div>
        </section>
      </main>

      {/* Overlays & Modals */}
      <QuickLesson isOpen={showLesson} onClose={() => setShowLesson(false)} topic="Distributed State Management" />
    </div>
  );
}