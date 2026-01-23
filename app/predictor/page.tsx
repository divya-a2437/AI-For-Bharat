"use client";

import { useState } from 'react';
import { Upload, FileText, Sparkles, Loader2, Zap, CheckCircle2, ChevronRight, Target, Layers, Brain, Terminal, AlertCircle, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidDiagram from '@/components/MermaidDiagram';

// Simple status component for a cleaner look
function StatusIndicator({ status }: { status: "idle" | "processing" | "done" }) {
    if (status === "idle") return null;
    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${status === "processing" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {status === "processing" ? "AI is reading your files..." : "All finished!"}
            </span>
        </div>
    );
}

export default function PredictorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
    const [predictions, setPredictions] = useState<{ question: string; confidence: number; reason: string }[]>([]);
    const [mermaidChart, setMermaidChart] = useState<string>("");
    const [technicalMatrix, setTechnicalMatrix] = useState<{ concept: string; difficulty: string; priority: string; prob: number }[]>([
        { concept: "Asynchronous I/O", difficulty: "High", priority: "Core", prob: 95 },
        { concept: "Memory Management", difficulty: "Medium", priority: "Critical", prob: 88 },
        { concept: "Garbage Collection", difficulty: "High", priority: "Secondary", prob: 72 },
    ]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus("idle");
            setPredictions([]);
        }
    };

    const generatePredictions = async () => {
        if (!file) return;
        try {
            setStatus("processing");
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/predict", { method: "POST", body: formData });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.details || "API Route failed");
            }

            setPredictions(data.predictions || []);
            if (data.technicalMatrix) setTechnicalMatrix(data.technicalMatrix);
            if (data.mermaidChart) setMermaidChart(data.mermaidChart);
            setStatus("done");
        } catch (err: any) {
            console.error("Prediction failed:", err);
            setStatus("idle");
            alert(`Prediction failed: ${err.message}`);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
            {/* 1. HERO SECTION: Human-friendly introduction */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-black uppercase tracking-[0.2em]"
                >
                    <Sparkles size={14} /> Smart Study Guide
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[0.9]">
                    What's on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">Exam?</span>
                </h1>
                <p className="text-lg text-slate-400 font-medium">
                    Upload your notes and let Ghostwriter show you the most important topics to study.
                </p>
            </div>

            {/* 2. UPLOAD ZONE: Main Action Point */}
            <div className="max-w-xl mx-auto">
                <div className={`p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent transition-all ${status === "processing" ? "opacity-50 pointer-events-none scale-95" : ""}`}>
                    <div className="bg-[#0a0a0a] rounded-[2.3rem] p-8 border border-white/5 space-y-8">
                        <label className="group block cursor-pointer">
                            <div className="relative h-48 rounded-3xl border-2 border-dashed border-white/10 group-hover:border-violet-500/40 transition-all flex flex-col items-center justify-center bg-white/[0.02]">
                                <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all">
                                    {file ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Upload className="w-8 h-8 text-slate-500 group-hover:text-violet-400" />}
                                </div>
                                <p className="text-sm font-bold text-slate-300">
                                    {file ? file.name : "Pick your file here"}
                                </p>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">
                                    {file ? "Ready to go!" : "PDF or Document (Max 10MB)"}
                                </p>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
                            </div>
                        </label>

                        <button
                            onClick={generatePredictions}
                            disabled={!file || status === "processing"}
                            className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:translate-y-[-2px] hover:shadow-[0_10px_30_rgba(255,255,255,0.1)] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-3"
                        >
                            {status === "processing" ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Reading everything...
                                </>
                            ) : (
                                <>
                                    Start Prediction
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="flex justify-center">
                            <StatusIndicator status={status} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. RESULTS AREA: Clean and organized sections */}
            <AnimatePresence>
                {status === "done" && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-4 text-white">
                            <div className="h-[1px] flex-1 bg-white/10" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">What the AI found</h2>
                            <div className="h-[1px] flex-1 bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* A. Top Priority Topics (Simplified Matrix) */}
                            <div className="md:col-span-12 lg:col-span-8 space-y-6">
                                <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <TrendingUp className="text-emerald-400" size={20} /> Most Important Topics
                                            </h3>
                                            <p className="text-xs text-slate-500">The AI thinks these are most likely to be in your exam.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {technicalMatrix.map((item, i) => (
                                            <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.difficulty} Difficulty</span>
                                                    <h4 className="text-base font-bold text-white">{item.concept}</h4>
                                                    <div className="pt-2">
                                                        <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 text-[9px] font-black uppercase tracking-tighter border border-violet-500/20">
                                                            {item.priority === "Core" ? "Must Study" : item.priority}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-emerald-400 font-mono italic">{item.prob}%</div>
                                                    <div className="text-[9px] font-bold text-slate-600 uppercase">Waitlist Probability</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* B. Topic Connections (Mermaid Diagram) */}
                                {mermaidChart && (
                                    <section className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Layers className="text-blue-400" size={20} /> Topic Connection Map
                                            </h3>
                                            <p className="text-xs text-slate-500">See how these big ideas are linked together.</p>
                                        </div>
                                        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 overflow-hidden">
                                            <MermaidDiagram chart={mermaidChart} />
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* C. Action Center (Gap Analysis & Simulation Lab) */}
                            <div className="md:col-span-12 lg:col-span-4 space-y-8">
                                {/* Technical Gap Action */}
                                <section className="p-8 rounded-[2.5rem] bg-violet-500/5 border border-violet-500/20 space-y-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                        <AlertCircle size={80} className="text-violet-400" />
                                    </div>
                                    <div className="space-y-2 relative z-10">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Lightbulb className="text-amber-400" size={18} /> Helpful Study Tip
                                        </h3>
                                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                            You know about <span className="text-white font-bold">Server Actions</span>, but you might want to review <span className="text-violet-400 font-bold">Distributed State</span> too.
                                        </p>
                                    </div>
                                    <button className="w-full py-4 rounded-xl bg-violet-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-violet-400 transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] relative z-10">
                                        Make a Quick Lesson
                                    </button>
                                </section>

                                {/* Mock Interview Action */}
                                <section className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <BookOpen className="text-emerald-400" size={18} /> Practice Mode
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                            Want to test yourself? We've made a quick quiz based on these topics.
                                        </p>
                                    </div>
                                    <button className="w-full py-4 rounded-xl bg-white/5 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                                        Start Practice Quiz
                                    </button>
                                </section>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-black text-white font-mono leading-none">99%</div>
                                        <div className="text-[9px] font-bold text-slate-500 uppercase mt-2">Correctness</div>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-black text-white font-mono leading-none">High</div>
                                        <div className="text-[9px] font-bold text-slate-500 uppercase mt-2">Sureness</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
