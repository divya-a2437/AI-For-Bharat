"use client";

import { useState, useEffect } from 'react';
import { Upload, FileText, Sparkles, Loader2, Zap, CheckCircle2, ChevronRight, Target, Layers, Brain, Terminal, AlertCircle, TrendingUp, BookOpen, Lightbulb, ArrowUpRight, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidDiagram from '@/components/MermaidDiagram';

export default function PredictorPage() {
    const [currentTime, setCurrentTime] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
    const [predictions, setPredictions] = useState<{ question: string; confidence: number; reason: string }[]>([]);
    const [mermaidChart, setMermaidChart] = useState<string>("");
    const [technicalMatrix, setTechnicalMatrix] = useState<{ concept: string; difficulty: string; priority: string; prob: number }[]>([
        { concept: "Asynchronous I/O", difficulty: "High", priority: "Must Study", prob: 95 },
        { concept: "Memory Management", difficulty: "Medium", priority: "Critical", prob: 88 },
        { concept: "Garbage Collection", difficulty: "High", priority: "Must Study", prob: 72 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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

            if (!res.ok) throw new Error(data.details || data.error || "API Route failed");

            setPredictions(data.predictions || []);
            if (data.technicalMatrix) setTechnicalMatrix(data.technicalMatrix);
            if (data.mermaidChart) setMermaidChart(data.mermaidChart);
            setStatus("done");
        } catch (err: any) {
            console.error("Prediction failed:", err);
            setStatus("idle");
            alert(`PREDICTION FAILED\n\n${err.message}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 pb-40 relative">
            {/* Background Layer */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
            </div>

            {/* Header */}
            <header className="relative space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
                            <div className="w-8 h-[1px] bg-emerald-500/50" />
                            Probability Analysis Engine
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white uppercase italic tracking-tighter leading-[0.85]"
                        >
                            Exam <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Predictor</span>
                        </motion.h1>
                        <p className="text-slate-400 max-w-lg font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                            Upload course materials and let Ghostwriter <span className="text-white font-black italic">identify the target topics</span> most likely to appear on exam day.
                        </p>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="flex gap-4 p-4 bg-white/[0.02] rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="px-6 border-r border-white/10 flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Sureness</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xl font-black text-emerald-400 font-mono italic tracking-tighter">98.4%</span>
                            </div>
                        </div>
                        <div className="px-6 flex flex-col font-mono text-white text-xl font-black italic tracking-tighter">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 font-sans">Sync</span>
                            {currentTime || "12:19:27"}
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Ingestion Hub */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-12 lg:col-span-7 group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-cyan-500/20 to-emerald-600/20 rounded-[3rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.8rem] p-12 overflow-hidden flex flex-col md:flex-row gap-10">
                        <div className="flex-1 space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Topic Ingestion</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Predicting high-probability examination clusters</p>
                            </div>

                            <label className={`w-full h-56 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center hover:bg-white/[0.01] hover:border-emerald-500/20 transition-all cursor-pointer ${status === 'processing' ? 'pointer-events-none opacity-50' : ''}`}>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
                                <div className="p-5 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl text-white shadow-xl mb-4">
                                    {file ? <CheckCircle2 size={24} /> : <Upload size={24} />}
                                </div>
                                <p className="text-sm font-black text-white uppercase tracking-tight italic">{file ? file.name : "Select Source Node"}</p>
                            </label>

                            <button
                                onClick={generatePredictions}
                                disabled={!file || status === "processing"}
                                className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] transition-all active:scale-95 disabled:opacity-10 flex items-center justify-center gap-3"
                            >
                                {status === "processing" ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                {status === "processing" ? "Predicting..." : "Start Analysis"}
                            </button>
                        </div>

                        <div className="w-[1px] bg-white/5 hidden md:block" />

                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Engine Parameters</h4>
                                <div className="space-y-2">
                                    {[
                                        { icon: <Target className="text-emerald-400" size={14} />, label: "Target Detection", val: "Wide" },
                                        { icon: <Layers className="text-blue-400" size={14} />, label: "Context Depth", val: "Tier-1" },
                                        { icon: <Brain className="text-violet-400" size={14} />, label: "Neural Model", val: "G-4o" },
                                    ].map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                {p.icon}
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">{p.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">{p.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                <p className="text-[10px] text-emerald-400/80 leading-relaxed font-black uppercase tracking-widest italic">
                                    "Probability analysis optimizes for 'Exam Impact' rather than keyword frequency."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Results Panel */}
                <div className="md:col-span-12 lg:col-span-5 space-y-10">
                    <div className="flex items-center gap-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap italic">Impact Matrix</h4>
                        <div className="h-[1px] w-full bg-white/5" />
                    </div>

                    <div className="space-y-4">
                        {technicalMatrix.map((item, i) => (
                            <div key={i} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-[1.8rem] flex items-center justify-between group hover:border-emerald-500/20 transition-all">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.difficulty}</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{item.priority}</span>
                                    </div>
                                    <h5 className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">{item.concept}</h5>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white font-mono italic tracking-tighter leading-none">{item.prob}%</div>
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Weighting</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Predictions */}
            <AnimatePresence>
                {status === 'done' && (
                    <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                        <div className="flex items-center gap-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] italic whitespace-nowrap">Intelligence Stream</h4>
                            <div className="h-[1px] w-full bg-white/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {mermaidChart && (
                                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="text-blue-400" size={18} />
                                        <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Dependency Map</h5>
                                    </div>
                                    <div className="bg-black/40 rounded-3xl p-6 border border-white/5 overflow-hidden ring-1 ring-white/5 shadow-2xl">
                                        <MermaidDiagram chart={mermaidChart} />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {predictions.map((p, i) => (
                                    <div key={i} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] space-y-4 hover:border-emerald-500/20 transition-all relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity rotate-12 scale-[4]">
                                            <Sparkles size={100} />
                                        </div>
                                        <div className="flex items-center justify-between gap-4 relative z-10">
                                            <h6 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">{p.question}</h6>
                                            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[10px] font-black">
                                                {p.confidence}% CONF
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed font-medium italic relative z-10">
                                            {p.reason}
                                        </p>
                                        <div className="pt-4 flex justify-end relative z-10">
                                            <button className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest transition-colors">
                                                Add to Study Lab <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Waiting State */}
            {status !== 'done' && (
                <div className="h-64 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-40 bg-white/[0.01]">
                    <BarChart3 size={48} className="text-slate-700 mb-4" />
                    <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Awaiting source ingestion to activate predictor</p>
                </div>
            )}
        </div>
    );
}
