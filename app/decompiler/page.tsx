"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Cpu, Code, Zap, ChevronRight,
    Loader2, Search, Share2, Download,
    ArrowRight, Activity, Database, ShieldCheck
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

interface DecompilerStep {
    id: number;
    title: string;
    description: string;
    type: 'input' | 'process' | 'validation' | 'neural' | 'output';
}

export default function DecompilerPage() {
    const [inputCode, setInputCode] = useState("");
    const [isDecompiling, setIsDecompiling] = useState(false);
    const [logicPath, setLogicPath] = useState<DecompilerStep[]>([]);

    const handleDecompile = () => {
        if (!inputCode.trim()) return;

        setIsDecompiling(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            const simulatedPath: DecompilerStep[] = [
                { id: 1, title: "Input Validation", description: "Analyzing source syntax for structural integrity and identifying entry points.", type: 'validation' },
                { id: 2, title: "Context Injection", description: "Mapping external dependencies and injecting environmental variables into the logic tree.", type: 'input' },
                { id: 3, title: "Dependency Extraction", description: "Isolating core libraries and identifying asynchronous I/O bottlenecks.", type: 'process' },
                { id: 4, title: "Neural Logic Synthesis", description: "Translating raw function calls into abstract step-mapping flows.", type: 'neural' },
                { id: 5, title: "Logic Flow Output", description: "Generating high-fidelity step list for production-ready documentation.", type: 'output' },
            ];
            setLogicPath(simulatedPath);
            setIsDecompiling(false);
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Header section with specialized status */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-violet-600 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                            <Terminal size={24} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Logic Decompiler</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium">
                        Break down complex codebases into human-readable logic paths. Eliminate manual tracing and accelerate system understanding.
                    </p>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                    <div className="text-right px-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Ratio Adjusted</p>
                        <p className="text-xl font-black text-emerald-400 font-mono italic">30/70</p>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="px-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Saved</p>
                        <p className="text-xl font-black text-violet-400 font-mono tracking-tighter">~4h / dev</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side: Input Area */}
                <div className="lg:col-span-5 space-y-6">
                    <BentoCard
                        title="Source Material"
                        subtitle="Input technical documentation or raw source code"
                        className="border-white/5 bg-white/[0.01] min-h-[500px] flex flex-col"
                    >
                        <div className="mt-8 flex-1 flex flex-col space-y-6">
                            <div className="relative group flex-1">
                                <div className="absolute inset-0 bg-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <textarea
                                    className="w-full h-full min-h-[300px] bg-black/40 border border-white/10 rounded-2xl p-6 text-sm font-mono text-slate-300 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none custom-scrollbar"
                                    placeholder="// Paste code or technical docs here..."
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                />
                                <div className="absolute top-4 right-4 animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                                </div>
                            </div>

                            <button
                                onClick={handleDecompile}
                                disabled={isDecompiling || !inputCode.trim()}
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-violet-600 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl hover:shadow-violet-500/20 active:scale-[0.98]"
                            >
                                {isDecompiling ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Decompiling Logic...
                                    </>
                                ) : (
                                    <>
                                        Decompile Logic
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </BentoCard>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2">
                            <Database size={18} className="text-blue-400" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Library Sync</p>
                            <p className="text-lg font-black text-white">Active</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2">
                            <ShieldCheck size={18} className="text-emerald-400" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Security Scan</p>
                            <p className="text-lg font-black text-white">Verified</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Output Window */}
                <div className="lg:col-span-7 space-y-6">
                    <BentoCard
                        title="Decompiler Output"
                        subtitle="Step-mapped logic path from source analysis"
                        className="border-violet-500/10 bg-violet-500/[0.02] h-full"
                    >
                        <div className="mt-8 space-y-8">
                            {!logicPath.length && !isDecompiling ? (
                                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                                    <Cpu size={48} className="text-slate-500" />
                                    <p className="text-xs uppercase font-black tracking-widest text-slate-500">Awaiting Ingestion Stream</p>
                                </div>
                            ) : isDecompiling ? (
                                <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20 animate-pulse" />
                                        <Loader2 size={48} className="text-violet-500 animate-spin" />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <p className="text-xs uppercase font-black tracking-[0.2em] text-violet-400 animate-pulse">Neural Synthesis in Progress</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tracing logic branches...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 pb-8">
                                    {logicPath.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.15 }}
                                            className="group relative flex gap-6 p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-all hover:bg-violet-900/5"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step.type === 'validation' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    step.type === 'process' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        step.type === 'neural' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    }`}>
                                                    {step.id}
                                                </div>
                                                {index !== logicPath.length - 1 && (
                                                    <div className="w-[1px] flex-1 bg-gradient-to-b from-white/10 to-transparent" />
                                                )}
                                            </div>

                                            <div className="space-y-2 py-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors">
                                                        {step.title}
                                                    </h4>
                                                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-500 border border-white/10 tracking-[0.2em]">
                                                        {step.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                                    {step.description}
                                                </p>
                                            </div>

                                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Zap size={14} className="text-violet-500" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {logicPath.length > 0 && (
                            <div className="mt-auto border-t border-white/5 pt-6 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                                        <Share2 size={12} /> Share Flow
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                                        <Download size={12} /> Export JSON
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Decoupled Successfully</span>
                                </div>
                            </div>
                        )}
                    </BentoCard>
                </div>
            </div>
        </div>
    );
}
