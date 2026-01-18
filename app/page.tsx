"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BentoCard from "@/components/BentoCard";
import UploadZone from "@/components/UploadZone";
import SystemStatus from "@/components/SystemStatus";
import AgentStatus from "@/components/AgentStatus";
import Snowfall from "@/components/Snowfall";
import Waveform from "@/components/Waveform";
import Flashcard from "@/components/Flashcard";
import GhostlyLoader from "@/components/GhostlyLoader";
import NeuralNetwork from "@/components/NeuralNetwork";
import FocusTimer from "@/components/FocusTimer";
import GhostChat from "@/components/GhostChat";
import AgentRow from "@/components/AgentRow";
import { Brain, Mic, Layers, Ghost, Loader2, BookOpen, FileText, Music, Video, CheckCircle2, FileDown, Share2, Zap, ExternalLink, Target, Cpu } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  const magneticRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Particle Trail
      const particle = document.createElement("div");
      particle.className = "trail-particle";
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);

      // 2. Magnetic Effect
      if (magneticRef.current) {
        const m = magneticRef.current;
        const rect = m.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const attractX = (dx / 150) * 20;
          const attractY = (dy / 150) * 20;
          m.style.transform = `translate(${attractX}px, ${attractY}px)`;
        } else {
          m.style.transform = `translate(0px, 0px)`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      // Expecting JSON: { predictions: [{ question, confidence, reason }] }
      setPredictions(data.predictions || []);
      setPredictorStatus("done");
    } catch (err) {
      console.error("Prediction failed", err);
      setPredictorStatus("idle");
    }
  };
  // Truly Live Metrics
  const [latency, setLatency] = useState(42);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate latency slightly for realism
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(38, Math.min(prev + delta, 52));
      });

      // Update local time
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white relative font-sans selection:bg-violet-500/30">
      {/* --- ULTRA-PREMIUM BACKGROUND LAYER --- */}
      <div className="aurora-container">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>
      <NeuralNetwork />
      <div className="kinetic-grid" />
      <div className="grid-pulse-layer" />
      <Snowfall />
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202] pointer-events-none" />



      <div className="spectral-roamer select-none">👻</div>
      <div className="noise-overlay" />

      {/* Main Content Layout */}
      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <section className="relative pt-16 pb-16 px-6 max-w-7xl mx-auto text-center">
          {/* Stylish Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block mb-4 group"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-violet-600/30 blur-[40px] rounded-full scale-150 group-hover:bg-violet-600/50 transition-colors duration-700" />

            <div className="relative bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/20">
              <img
                src="/ghostwriter-logo.png"
                alt="Ghostwriter Logo"
                className="h-20 w-20 object-contain animate-float-premium scale-110"
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            </div>
          </motion.div>

          {/* Brand Header */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase mb-3"
          >
            GHOSTWRITER
          </motion.h2>

          {/* The "Hook" Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest">
              High-Frequency Education Engine
            </span>
          </motion.div>

          {/* The "Argument" Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-4 uppercase">
            Stop Mining. <span className="text-violet-500">Start Refining.</span>
          </h1>

          {/* The "Fix" Subtext */}
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Ghostwriter is a high-frequency intelligence engine that decompiles
            technical complexity into actionable "Knowledge Blocks."
          </p>
        </section>

        {/* The Productivity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto px-6 mb-32">

          {/* Learn Faster: Extraction Engine */}
          <BentoCard
            title="Signal Extraction"
            subtitle="The Extraction Layer"
            className="md:col-span-8 border-emerald-500/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg"><Target className="text-emerald-400" size={20} /></div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                Inverting the 70/30 Learning Ratio:
              </p>
            </div>
            {/* Visual Proof: A simulated extraction bar */}
            <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="w-[30%] bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                <div className="w-[70%] bg-slate-800/40" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-emerald-500 font-bold uppercase">
                <span>Logic Detected (30%)</span>
                <span>Raw Noise Filtered (70%)</span>
              </div>
            </div>
          </BentoCard>

          {/* Work Smarter: Multi-Agent System */}
          <BentoCard
            title="Autonomous Stack"
            subtitle="Multi-Agent System"
            className="md:col-span-4 border-violet-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-violet-400" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Digital Workforce</h3>
            </div>
            <div className="space-y-4">
              <AgentRow name="Archivist" status="indexing" action="Structuring Data" />
              <AgentRow name="Listener" status="active" action="Parsing Syntax" />
              <AgentRow name="Analyst" status="idle" action="Ready" />
            </div>
          </BentoCard>

          {/* 3. THE TECH ANGLE (Bento/Decompiler) */}
          <BentoCard
            title="Knowledge Decompiler"
            subtitle="Technical Literacy"
            className="md:col-span-12 border-blue-500/20"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Documentation is dense. We break complex technical hierarchies into atomic
                  <span className="text-blue-400 font-bold"> Knowledge Blocks</span>.
                </p>
              </div>
              {/* Visual Proof: The "Block" representation */}
              <div className="flex-1 grid grid-cols-2 gap-2 opacity-80">
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                  <span className="text-[10px] font-bold text-blue-300">SYNTAX</span>
                </div>
                <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg text-center">
                  <span className="text-[10px] font-bold text-violet-300">LOGIC</span>
                </div>
                <div className="col-span-2 p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                  <span className="text-[10px] font-bold text-slate-400">CONTEXT</span>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        <SystemStatus />
      </div>
    </div>
  );
}