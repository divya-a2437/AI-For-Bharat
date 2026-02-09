"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Target, Brain, BookOpen,
    MessageSquare, ArrowRight, ShieldAlert,
    CheckCircle2, Loader2, Sparkles,
    Dna, BarChart3, ChevronRight, Play,
    Mic, FileText, RefreshCcw, Activity, ShieldCheck, Ghost, Layers
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";
import QuickLesson from "@/components/QuickLesson";
import NeuralNetwork from "@/components/NeuralNetwork";

interface Gap {
    gap: string;
    vulnerability: string;
    bridgeAction: string;
    type: 'lesson' | 'mock';
}

export default function SimulationLab() {
    const [currentTime, setCurrentTime] = useState("");
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'ready'>('idle');
    const [file, setFile] = useState<File | null>(null);
    const [selectedGap, setSelectedGap] = useState<Gap | null>(null);
    const [isLessonOpen, setIsLessonOpen] = useState(false);

    const [gaps, setGaps] = useState<Gap[]>([
        {
            gap: "Server-Side Request Forgery (SSRF) Prevention",
            vulnerability: "The current implementation lacks nested validation for internal proxies, exposing the data layer.",
            bridgeAction: "Implement a URL whitelist validator for the proxy aggregate service.",
            type: "lesson"
        },
        {
            gap: "Optimistic UI Update Rationale",
            vulnerability: "High latency on mobile networks will cause UI flickering without properly handled local state rollbacks.",
            bridgeAction: "Explain how to handle a failed mutation and rollback the cache in a distributed environment.",
            type: "mock"
        }
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
            setStatus('idle');
        }
    };

    const runAnalysis = async () => {
        if (!file) return;
        try {
            setStatus('analyzing');
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/predict", { method: "POST", body: formData });
            const data = await res.json();
            if (data.gapAnalysis) setGaps(data.gapAnalysis);
            setStatus('ready');
        } catch (err) {
            console.error("Lab analysis failed", err);
            setStatus('idle');
        }
    };

    const metrics = [
        { label: 'Neural Coverage', value: status === 'ready' ? '84%' : '0%', icon: <Dna size={16} />, color: 'text-violet-400' },
        { label: 'Technical Debt', value: status === 'ready' ? 'Low' : 'N/A', icon: <Activity size={16} />, color: 'text-emerald-400' },
        { label: 'Retention Rate', value: status === 'ready' ? '92%' : '0%', icon: <Target size={16} />, color: 'text-amber-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 pb-40 relative">
            {/* Neural Background Layer */}
            <NeuralNetwork />
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
            </div>

            {/* Header Section */}
            <header className="relative space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">
                            <div className="w-8 h-[1px] bg-amber-500/50" />
                            Cognitive Environment v1.2
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white uppercase italic tracking-tighter leading-[0.85]"
                        >
                            Simulation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Lab</span>
                        </motion.h1>
                        <p className="text-slate-400 max-w-lg font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                            Identify and bridge cognitive gaps. We <span className="text-white font-black italic">isolate architectural debt</span> and force implementation reconstruction.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="grid grid-cols-3 gap-8 p-4 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            {metrics.map((m, i) => (
                                <div key={i} className={`flex flex-col items-center text-center px-4 ${i !== 0 ? 'border-l border-white/10' : ''}`}>
                                    <div className={`${m.color} mb-3 filter drop-shadow-[0_0_5px_currentColor]`}>{m.icon}</div>
                                    <span className="text-xl font-black text-white italic font-mono tracking-tighter leading-none">{m.value}</span>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1 leading-none">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Activation & Config */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-10">
                    <div className="relative group/box">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 via-orange-500/20 to-amber-600/20 rounded-[3rem] blur opacity-0 group-hover/box:opacity-100 transition duration-1000" />
                        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.8rem] p-10 overflow-hidden flex flex-col gap-8 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Gap Engine</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Neural Comparison Core</p>
                                </div>
                                <div className="p-4 bg-amber-600/10 border border-amber-500/20 rounded-2xl text-amber-500 shadow-inner group-hover/box:scale-110 transition-transform"><Brain size={24} /></div>
                            </div>

                            <label className="group/upload block cursor-pointer">
                                <div className="relative h-56 rounded-[2.2rem] border-2 border-dashed border-white/5 group-hover/upload:border-amber-500/40 transition-all flex flex-col items-center justify-center bg-black/60 overflow-hidden shadow-inner group/inner">
                                    <div className="absolute inset-0 bg-gradient-to-b from-amber-600/[0.02] to-transparent opacity-0 group-hover/inner:opacity-100 transition-opacity" />
                                    {status === 'analyzing' ? (
                                        <div className="flex flex-col items-center gap-6 relative z-10">
                                            <div className="relative">
                                                <RefreshCcw className="text-amber-500 animate-spin" size={48} />
                                                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                                            </div>
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] animate-pulse">Processing Simulation...</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-6 relative z-10 text-center px-6">
                                            <div className="p-5 bg-white/5 rounded-2xl group-hover/upload:scale-110 group-hover/upload:bg-amber-600/20 transition-all shadow-2xl border border-white/5">
                                                {file ? <CheckCircle2 className="w-10 h-10 text-emerald-400 shadow-glow" /> : <FileText className="w-10 h-10 text-slate-700 group-hover/upload:text-amber-400" />}
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic group-hover/upload:text-white transition-colors">
                                                    {file ? file.name : "Initialize Skill Extraction"}
                                                </p>
                                                {!file && <p className="text-[9px] text-slate-800 font-black uppercase tracking-[0.2em]">Upload PDF / Codebase / Specs</p>}
                                            </div>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={runAnalysis}
                                disabled={!file || status === 'analyzing'}
                                className="w-full py-6 rounded-[1.8rem] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all active:scale-95 disabled:opacity-10 flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group/btn"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                <Zap size={18} fill="currentColor" />
                                {status === 'analyzing' ? 'Compressing Theory Gaps...' : 'Activate Lab Environment'}
                            </button>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-6 relative group overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity rotate-12 scale-[3]"><Layers size={60} /></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                <Target className="text-emerald-400" size={24} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Active Recall Mode</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed font-black uppercase italic tracking-tight relative z-10 group-hover:text-slate-300 transition-colors">
                            Extracted logic is stored, but not mastered. Force your brain to <span className="text-emerald-400 font-bold italic">reconstruct structural details</span> through these simulations.
                        </p>
                        <div className="pt-4 flex items-center justify-between relative z-10 mt-auto">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/10 flex items-center gap-2">
                                <ShieldCheck size={12} /> Latency Protected
                            </span>
                        </div>
                    </div>
                </div>

                {/* Simulation Output */}
                <div className="lg:col-span-12 xl:col-span-8 space-y-10">
                    <div className="flex items-center justify-between px-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">Cognitive Neural Bridges</h2>
                        <div className="flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/5 px-4 py-2 rounded-full border border-amber-500/10">
                            <Sparkles size={12} className="animate-pulse shadow-glow" /> Optimized Signal
                        </div>
                    </div>

                    <div className="space-y-8">
                        {!gaps.length && status === 'idle' ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-white/[0.01] border border-dashed border-white/5 rounded-[4rem] group cursor-pointer hover:bg-white/[0.02] transition-all">
                                <div className="p-10 bg-white/5 rounded-full mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                                    <Ghost size={60} className="text-slate-800" />
                                </div>
                                <div className="text-center space-y-3">
                                    <p className="text-xl font-black text-slate-700 uppercase italic tracking-tighter">No Environmental Signal Detected</p>
                                    <p className="text-[10px] text-slate-800 font-black uppercase tracking-widest italic">Awaiting lab activation to generate bridge actions</p>
                                </div>
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {gaps.map((gap, i) => (
                                    <motion.div
                                        key={i}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group/gap relative h-full"
                                    >
                                        <div className={`absolute -inset-1.5 bg-gradient-to-br ${gap.type === 'lesson' ? 'from-violet-600/30 shadow-violet-500/20' : 'from-amber-600/30 shadow-amber-500/20'} to-transparent rounded-[3.5rem] blur-xl opacity-0 group-hover/gap:opacity-100 transition-all duration-700`} />

                                        <div className="relative p-12 bg-[#0a0a0a] border border-white/5 rounded-[3rem] flex flex-col lg:flex-row gap-12 items-start hover:border-white/20 transition-all overflow-hidden shadow-inner">
                                            <div className="absolute top-0 right-0 p-12 opacity-0 group-hover/gap:opacity-[0.02] transition-opacity rotate-12 scale-[3]">
                                                {gap.type === 'lesson' ? <BookOpen size={80} /> : <Mic size={80} />}
                                            </div>

                                            <div className="shrink-0 relative z-10 pt-2">
                                                <div className={`p-8 rounded-[2.5rem] shadow-2xl border-2 transition-transform group-hover/gap:scale-110 duration-500 ${gap.type === 'lesson' ? 'bg-violet-600/10 text-violet-400 border-violet-500/20 shadow-violet-500/10' : 'bg-amber-600/10 text-amber-500 border-amber-500/20 shadow-amber-500/10'
                                                    }`}>
                                                    {gap.type === 'lesson' ? <BookOpen size={48} /> : <Mic size={48} />}
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-8 relative z-10 h-full flex flex-col">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${gap.type === 'lesson' ? 'text-violet-500' : 'text-amber-500'}`}>
                                                            {gap.type === 'lesson' ? 'Bridge Lesson Node' : 'Assessment Protocol'}
                                                        </span>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                                        <div className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center gap-2">
                                                            <ShieldAlert size={12} className="text-rose-500" />
                                                            <span className="text-[9px] font-black uppercase text-rose-500 tracking-wider font-mono">CRITICAL_GAP_DETECTED</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-3xl font-black text-white group-hover/gap:text-amber-400 transition-colors uppercase italic tracking-tighter leading-none">{gap.gap}</h3>
                                                </div>

                                                <p className="text-base text-slate-500 font-medium leading-relaxed italic border-l-4 border-white/5 pl-8 group-hover/gap:border-amber-500/30 group-hover/gap:text-slate-300 transition-all uppercase tracking-tight leading-tight">
                                                    "{gap.vulnerability}"
                                                </p>

                                                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4 group-hover/gap:border-white/10 transition-all shadow-inner relative group/task overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover/gap:opacity-100 transition-opacity" />
                                                    <div className="flex items-center gap-4 relative z-10">
                                                        <Brain className="text-slate-700" size={22} />
                                                        <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em]">Simulation Vector</span>
                                                    </div>
                                                    <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none relative z-10 group-hover/gap:text-emerald-400 transition-colors">
                                                        {gap.bridgeAction}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => { setSelectedGap(gap); setIsLessonOpen(true); }}
                                                className="shrink-0 self-center xl:self-end p-10 rounded-[2.5rem] bg-white text-black hover:bg-amber-500 hover:text-white transition-all shadow-2xl group/play hover:scale-110 active:scale-95"
                                            >
                                                <Play size={36} fill="currentColor" className="relative z-10 translate-x-1" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>

            <QuickLesson
                isOpen={isLessonOpen}
                onClose={() => setIsLessonOpen(false)}
                topic={selectedGap?.gap || ""}
                vulnerability={selectedGap?.vulnerability}
                bridgeAction={selectedGap?.bridgeAction}
                type={selectedGap?.type}
            />
        </div>
    );
}
