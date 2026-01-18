"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Target, Brain, BookOpen,
    MessageSquare, ArrowRight, ShieldAlert,
    CheckCircle2, Loader2, Sparkles,
    Dna, BarChart3, ChevronRight, Play,
    Mic, FileText, RefreshCcw, Activity, ShieldCheck
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
        { label: 'Neural Coverage', value: '78%', icon: <Dna size={16} />, color: 'text-violet-400' },
        { label: 'Technical Debt', value: 'Low', icon: <Activity size={16} />, color: 'text-emerald-400' },
        { label: 'Retention Rate', value: '92%', icon: <Target size={16} />, color: 'text-amber-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-32 relative overflow-hidden">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-amber-600/10 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-orange-600/10 blur-[110px] rounded-full animate-pulse [animation-delay:4s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-amber-500 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.4)] text-black relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <Zap size={28} fill="currentColor" className="relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Simulation Lab</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Passive reading is over. Simulation Lab identifies your technical gaps and <span className="text-amber-500 font-bold">forces active application</span> through targeted bridge lessons.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8 p-6 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    {metrics.map((m, i) => (
                        <div key={i} className={`flex flex-col items-center text-center px-4 ${i !== 0 ? 'border-l border-white/10' : ''}`}>
                            <div className={`${m.color} mb-3 filter drop-shadow-[0_0_5px_currentColor]`}>{m.icon}</div>
                            <span className="text-2xl font-black text-white italic font-mono tracking-tighter">{m.value}</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{m.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Analysis Activation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-10">
                    <BentoCard
                        title="Gap Engine"
                        subtitle="NEURAL COMPARISON CORE"
                        className="bg-violet-950/10 border-violet-500/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                            <Brain size={80} />
                        </div>
                        <div className="mt-10 space-y-8 relative z-10">
                            <label className="group/upload block cursor-pointer">
                                <div className="relative h-56 rounded-[2.5rem] border-2 border-dashed border-white/10 group-hover/upload:border-amber-500/40 transition-all flex flex-col items-center justify-center bg-black/60 overflow-hidden shadow-inner">
                                    {status === 'analyzing' && (
                                        <div className="absolute inset-0 bg-amber-900/10 backdrop-blur-md z-10 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="relative">
                                                    <RefreshCcw className="text-amber-500 animate-spin" size={48} />
                                                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl" />
                                                </div>
                                                <span className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] animate-pulse">Running Neural Simulation...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover/upload:scale-110 group-hover/upload:bg-amber-500/20 transition-all shadow-lg">
                                        {file ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <FileText className="w-8 h-8 text-slate-600 group-hover/upload:text-amber-400" />}
                                    </div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center px-6">
                                        {file ? file.name : "Initialize Skill Extraction"}
                                    </p>
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={runAnalysis}
                                disabled={!file || status === 'analyzing'}
                                className="w-full py-6 rounded-[1.5rem] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-3 border border-white/10 group/btn"
                            >
                                {status === 'analyzing' ? 'Compressing Theory Gaps...' : 'Activate Lab Environment'}
                                {status !== 'analyzing' && <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </BentoCard>

                    <div className="p-10 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-6 relative group overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/[0.02] to-transparent" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <Target className="text-emerald-400" size={24} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Active Recall Mode</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium italic relative z-10">
                            Extracted logic is stored, but not mastered. Force your brain to <span className="text-emerald-400 font-bold">reconstruct implementation details</span> through these simulations.
                        </p>
                        <div className="pt-4 flex items-center justify-between relative z-10">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-2">
                                <ShieldCheck size={10} /> Latency Protected
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-10">
                    {/* Bridge Lessons & Mocks */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between px-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Immediate Neural Bridge Actions</h2>
                            <div className="flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/5 px-4 py-2 rounded-full border border-amber-500/10">
                                <Sparkles size={12} className="animate-pulse" /> AI Optimized
                            </div>
                        </div>

                        <div className="grid gap-8">
                            <AnimatePresence mode="popLayout">
                                {gaps.map((gap, i) => (
                                    <motion.div
                                        key={i}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, type: 'spring', damping: 20 }}
                                        className="group relative"
                                    >
                                        <div className={`absolute -inset-1.5 bg-gradient-to-br ${gap.type === 'lesson' ? 'from-violet-600/30 to-blue-600/30 shadow-[0_0_50px_rgba(139,92,246,0.3)]' : 'from-amber-600/30 to-orange-600/30 shadow-[0_0_50px_rgba(245,158,11,0.3)]'} rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />

                                        <div className="relative p-10 rounded-[2.8rem] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all flex flex-col lg:flex-row gap-10 items-start shadow-2xl overflow-hidden">
                                            {/* Category Watermark */}
                                            <div className="absolute top-[-20%] left-[-10%] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none scale-[2.5] rotate-12">
                                                {gap.type === 'lesson' ? <BookOpen size={100} /> : <Mic size={100} />}
                                            </div>

                                            <div className="shrink-0 relative z-10">
                                                <div className={`p-6 rounded-[2rem] ${gap.type === 'lesson' ? 'bg-violet-500/10 text-violet-400 border-2 border-violet-500/20' : 'bg-amber-500/10 text-amber-400 border-2 border-amber-500/20'} shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform duration-500`}>
                                                    {gap.type === 'lesson' ? <BookOpen size={36} /> : <Mic size={36} />}
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-6 relative z-10">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${gap.type === 'lesson' ? 'text-violet-400' : 'text-amber-400'}`}>
                                                            {gap.type === 'lesson' ? 'Bridge Lesson' : 'Mock Assessment'}
                                                        </span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 flex items-center gap-2 px-3 py-1 bg-rose-500/5 rounded-full border border-rose-500/10">
                                                            <ShieldAlert size={12} /> High Risk Gap
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tighter leading-tight italic">{gap.gap}</h3>
                                                </div>

                                                <p className="text-sm text-slate-400 font-medium leading-relaxed italic border-l-4 border-white/5 pl-6 group-hover:border-amber-500/40 transition-colors">
                                                    "{gap.vulnerability}"
                                                </p>

                                                <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 space-y-4 group-hover:border-white/10 transition-colors shadow-inner">
                                                    <div className="flex items-center gap-3">
                                                        <Brain className="text-slate-600" size={18} />
                                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Simulation Task</span>
                                                    </div>
                                                    <p className="text-sm text-slate-200 font-bold leading-relaxed">
                                                        {gap.bridgeAction}
                                                    </p>
                                                </div>
                                            </div>

                                            <button className="shrink-0 self-center lg:self-end p-8 rounded-[2rem] bg-white/5 border-2 border-white/5 text-white hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/play">
                                                <Play size={28} fill="currentColor" className="group-hover/play:animate-ping absolute opacity-20 pointer-events-none" />
                                                <Play size={28} fill="currentColor" className="relative z-10" />
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
