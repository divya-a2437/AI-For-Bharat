"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Cpu, Code, Zap, ChevronRight,
    Loader2, Search, Share2, Download,
    ArrowRight, Activity, Database, ShieldCheck, Code2
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
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative overflow-hidden">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header section with specialized status */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-4 bg-violet-600 rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <Terminal size={24} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Logic Decompiler</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Break down complex codebases into human-readable logic paths. <span className="text-violet-400 font-bold">Eliminate manual tracing</span> and accelerate system understanding.
                    </p>
                </div>

                <div className="flex gap-4 p-5 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <div className="text-right px-6">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Ratio Adjusted</p>
                        <p className="text-2xl font-black text-emerald-400 font-mono italic tracking-tighter">30:70</p>
                    </div>
                    <div className="w-[1px] h-12 bg-white/10" />
                    <div className="px-6">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Avg. Coverage</p>
                        <p className="text-2xl font-black text-violet-400 font-mono italic tracking-tighter">98%</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left side: Input Area */}
                <div className="lg:col-span-5 space-y-8">
                    <BentoCard
                        title="Source Material"
                        subtitle="TECHNICAL INGESTION STREAM"
                        className="border-white/10 bg-black/20 min-h-[500px] flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <Code2 size={16} className="text-slate-600" />
                        </div>
                        <div className="mt-8 flex-1 flex flex-col space-y-6">
                            <div className="relative group flex-1">
                                <div className="absolute inset-[-1px] bg-gradient-to-br from-violet-600/30 to-blue-600/30 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm" />
                                <div className="absolute top-4 left-4 flex gap-1.5 opacity-30 select-none">
                                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                                <textarea
                                    className="w-full h-full min-h-[350px] bg-[#050505] border border-white/10 rounded-3xl p-8 pt-12 text-sm font-mono text-slate-300 focus:outline-none focus:border-violet-500/50 transition-all resize-none custom-scrollbar shadow-inner"
                                    placeholder="// Paste raw source code or technical documentation here..."
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleDecompile}
                                disabled={isDecompiling || !inputCode.trim()}
                                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-3xl hover:bg-violet-600 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:translate-y-[-2px] active:scale-[0.98] group"
                            >
                                {isDecompiling ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Synthesizing Logic Tree...
                                    </>
                                ) : (
                                    <>
                                        Decompile Logic Path
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </BentoCard>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-3 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Database size={48} />
                            </div>
                            <Cpu size={20} className="text-blue-400" />
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Engine State</p>
                                <p className="text-xl font-black text-white italic">Neural.jax</p>
                            </div>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-3 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldCheck size={48} />
                            </div>
                            <Zap size={20} className="text-amber-400" />
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Deep Scan</p>
                                <p className="text-xl font-black text-white italic">Optimized</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Output Window */}
                <div className="lg:col-span-7 space-y-6">
                    <BentoCard
                        title="Decompiler Output"
                        subtitle="NEURAL LOGIC SYNTHESIS STREAM"
                        className="border-violet-500/10 bg-violet-500/[0.02] h-full relative"
                    >
                        <div className="mt-8 space-y-10">
                            {!logicPath.length && !isDecompiling ? (
                                <div className="h-[450px] flex flex-col items-center justify-center text-center space-y-6 opacity-40 group cursor-default">
                                    <div className="p-8 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all duration-500">
                                        <Cpu size={64} className="text-slate-600 group-hover:text-violet-500 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm uppercase font-black tracking-[0.3em] text-slate-500">Awaiting Technical Ingestion</p>
                                        <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">Feed source code to generate logic path</p>
                                    </div>
                                </div>
                            ) : isDecompiling ? (
                                <div className="h-[450px] flex flex-col items-center justify-center space-y-8">
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-[-40px] bg-violet-500 rounded-full blur-[60px]"
                                        />
                                        <Loader2 size={64} className="text-violet-500 animate-spin relative z-10" />
                                    </div>
                                    <div className="space-y-3 text-center">
                                        <p className="text-xs uppercase font-black tracking-[0.4em] text-white animate-pulse">Synthesis in Progress</p>
                                        <div className="flex gap-1 justify-center">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 pb-12">
                                    {logicPath.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.15 }}
                                            className="group relative flex gap-8 p-8 rounded-[2rem] bg-black/40 border border-white/5 hover:border-violet-500/40 transition-all hover:bg-violet-500/[0.03] shadow-lg"
                                        >
                                            <div className="flex flex-col items-center gap-3 shrink-0">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[12px] font-black border-2 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${step.type === 'validation' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                                    step.type === 'process' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                        step.type === 'neural' ? 'bg-violet-500/10 text-violet-400 border-violet-500/30' :
                                                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                    }`}>
                                                    {step.id}
                                                </div>
                                                {index !== logicPath.length - 1 && (
                                                    <div className="w-[2px] flex-1 bg-gradient-to-b from-white/10 to-transparent" />
                                                )}
                                            </div>

                                            <div className="space-y-3 py-1 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors uppercase italic tracking-tight">
                                                        {step.title}
                                                    </h4>
                                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border tracking-[0.2em] shadow-sm ${step.type === 'validation' ? 'bg-blue-500/5 text-blue-400 border-blue-500/20' :
                                                            step.type === 'process' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                                                                step.type === 'neural' ? 'bg-violet-500/5 text-violet-400 border-violet-500/20' :
                                                                    'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                                                        }`}>
                                                        {step.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-l-2 border-white/5 pl-5">
                                                    {step.description}
                                                </p>
                                            </div>

                                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity bg-violet-500/10 p-2 rounded-xl">
                                                <Zap size={14} className="text-violet-400" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {logicPath.length > 0 && (
                            <div className="mt-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5">
                                        <Share2 size={14} /> Share Flow
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5">
                                        <Download size={14} /> Export Specs
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full shadow-inner">
                                    <Activity size={14} className="text-emerald-500 animate-[pulse_2s_infinite]" />
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Logic Deserialized</span>
                                </div>
                            </div>
                        )}
                    </BentoCard>
                </div>
            </div>
        </div>
    );
}
