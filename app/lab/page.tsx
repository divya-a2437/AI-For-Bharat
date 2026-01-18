"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Target, Brain, BookOpen,
    MessageSquare, ArrowRight, ShieldAlert,
    CheckCircle2, Loader2, Sparkles,
    Dna, BarChart3, ChevronRight, Play,
    Mic, FileText, RefreshCcw
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

interface Gap {
    gap: string;
    vulnerability: string;
    bridgeAction: string;
    type: 'lesson' | 'mock';
}

export default function SimulationLab() {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'ready'>('idle');
    const [file, setFile] = useState<File | null>(null);
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
        { label: 'Neural Coverage', value: '78%', icon: <Dna size={14} />, color: 'text-violet-400' },
        { label: 'Technical Debt', value: 'Low', icon: <BarChart3 size={14} />, color: 'text-emerald-400' },
        { label: 'Retention Rate', value: '92%', icon: <Zap size={14} />, color: 'text-amber-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] text-black">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Simulation Lab</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Passive reading is over. Simulation Lab identifies your technical gaps and forces active application through targeted bridge lessons.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                    {metrics.map((m, i) => (
                        <div key={i} className="flex flex-col items-center text-center px-4">
                            <div className={`${m.color} mb-2`}>{m.icon}</div>
                            <span className="text-[18px] font-black text-white italic font-mono">{m.value}</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Analysis Activation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-8">
                    <BentoCard
                        title="Gap Engine"
                        subtitle="NEURAL COMPARISON CORE"
                        className="bg-violet-950/10 border-violet-500/20"
                    >
                        <div className="mt-8 space-y-6">
                            <label className="group block cursor-pointer">
                                <div className="relative h-48 rounded-[2rem] border-2 border-dashed border-white/10 group-hover:border-amber-500/40 transition-all flex flex-col items-center justify-center bg-black/40 overflow-hidden">
                                    {status === 'analyzing' && (
                                        <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-md z-10 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <RefreshCcw className="text-amber-500 animate-spin" size={32} />
                                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">Running Simulation...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-3 bg-white/5 rounded-2xl mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                                        {file ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <FileText className="w-6 h-6 text-slate-500 group-hover:text-amber-400" />}
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-300">
                                        {file ? file.name : "Upload Skill Target"}
                                    </p>
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={runAnalysis}
                                disabled={!file || status === 'analyzing'}
                                className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase tracking-widest text-[11px] hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-2"
                            >
                                {status === 'analyzing' ? 'Processing Theory...' : 'Activate Lab Simulation'}
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </BentoCard>

                    <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 space-y-4">
                        <div className="flex items-center gap-3">
                            <Target className="text-emerald-400" size={20} />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Recall Mode</h3>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                            Extracted logic is stored, but not mastered. Force your brain to reconstruct implementation details through these simulations.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                    {/* Bridge Lessons & Mocks */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Immediate Bridge Actions</h2>
                            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase">
                                <Sparkles size={12} /> AI Prioritized
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <AnimatePresence mode="popLayout">
                                {gaps.map((gap, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative"
                                    >
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${gap.type === 'lesson' ? 'from-violet-600/20 to-blue-600/20' : 'from-amber-600/20 to-orange-600/20'} rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500`} />
                                        <div className="relative p-8 rounded-[2.3rem] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row gap-8 items-start">
                                            <div className="shrink-0">
                                                <div className={`p-4 rounded-2xl ${gap.type === 'lesson' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'} border`}>
                                                    {gap.type === 'lesson' ? <BookOpen size={24} /> : <Mic size={24} />}
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest ${gap.type === 'lesson' ? 'text-violet-400' : 'text-amber-400'}`}>
                                                            {gap.type === 'lesson' ? 'Bridge Lesson' : 'Mock Interview'}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 flex items-center gap-1">
                                                            <ShieldAlert size={10} /> Critical Gap
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight italic">{gap.gap}</h3>
                                                </div>

                                                <p className="text-[13px] text-slate-400 font-medium leading-relaxed italic border-l-2 border-white/5 pl-4">
                                                    "{gap.vulnerability}"
                                                </p>

                                                <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <Brain className="text-slate-500" size={14} />
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Activation Task</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-300 font-bold leading-relaxed">
                                                        {gap.bridgeAction}
                                                    </p>
                                                </div>
                                            </div>

                                            <button className="shrink-0 self-center md:self-end p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all group-hover:scale-110 active:scale-95">
                                                <Play size={20} fill="currentColor" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
