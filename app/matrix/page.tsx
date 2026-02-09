"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, Network, Cpu, Shield,
    ArrowUpRight, ExternalLink, Filter,
    Search, Zap, Activity, Layers,
    ChevronRight, Info, AlertTriangle,
    Package, CheckCircle2, Globe, Upload, Radar, Code2, Ghost, ArrowRight
} from 'lucide-react';

interface Dependency {
    library: string;
    impact: "High Impact" | "Low Impact";
    role: string;
    version: string;
}

export default function DependencyMatrix() {
    const [currentTime, setCurrentTime] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
    const [dependencies, setDependencies] = useState<Dependency[]>([
        { library: "Next.js", impact: "High Impact", role: "Framework Core / Routing", version: "14.1.0" },
        { library: "OpenAI", impact: "High Impact", role: "Neural Processing Engine", version: "4.28.0" },
        { library: "Tailwind CSS", impact: "High Impact", role: "Design System / Styling", version: "3.4.1" },
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
        }
    };

    const startScan = async () => {
        if (!file) return;
        try {
            setStatus("scanning");
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/predict", { method: "POST", body: formData });
            const data = await res.json();
            if (data.dependencyMatrix) setDependencies(data.dependencyMatrix);
            setStatus("done");
        } catch (err) {
            console.error("Scan failed", err);
            setStatus("idle");
        }
    };

    const stats = [
        { label: 'Ecosystem Pulse', value: status === 'done' ? 'Healthy' : 'Syncing...', color: 'text-emerald-400' },
        { label: 'Analysis State', value: status === 'scanning' ? 'Scanning...' : status === 'done' ? 'Complete' : 'Idle', color: 'text-blue-400' },
        { label: 'Detected Depth', value: `${dependencies.length} Units`, color: 'text-violet-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 pb-40 relative">
            {/* Neural Background */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
            </div>

            {/* Header Section */}
            <header className="relative space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
                            <div className="w-8 h-[1px] bg-emerald-500/50" />
                            Ecosystem Topology Mapper
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white uppercase italic tracking-tighter leading-[0.85]"
                        >
                            Dependency <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Matrix</span>
                        </motion.h1>
                        <p className="text-slate-400 max-w-lg font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                            Autonomous architectural dissection. Ghostwriter identifies your <span className="text-white font-black italic">tech stack DNA</span> and flags ecosystem impact vectors.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex gap-4 p-4 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            {stats.map((stat, i) => (
                                <div key={i} className={`flex flex-col px-6 ${i !== 0 ? 'border-l border-white/10' : ''}`}>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                                    <span className={`text-xl font-black ${stat.color} font-mono italic tracking-tighter leading-none`}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Impact Analyzer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side: Controls & Topology */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-10">
                    <div className="relative group/box">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-emerald-500/20 to-blue-600/20 rounded-[3rem] blur opacity-0 group-hover/box:opacity-100 transition duration-1000" />
                        <div className="relative p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.8rem] space-y-10 shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ingestion Port</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Stream ecosystem signals</p>
                                </div>
                                <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-blue-400 shadow-inner"><Radar size={24} className={status === 'scanning' ? 'animate-spin' : ''} /></div>
                            </div>

                            <label className="group/upload block cursor-pointer">
                                <div className="relative h-56 rounded-[2.2rem] border-2 border-dashed border-white/5 group-hover/upload:border-blue-500/40 transition-all flex flex-col items-center justify-center bg-black/60 overflow-hidden shadow-inner group/inner">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.02] to-transparent opacity-0 group-hover/inner:opacity-100 transition-opacity" />
                                    {status === 'scanning' ? (
                                        <div className="flex flex-col items-center gap-6 relative z-10">
                                            <div className="relative">
                                                <Cpu className="text-blue-500 animate-spin" size={48} />
                                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                                            </div>
                                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Mapping Topology...</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-6 relative z-10">
                                            <div className="p-5 bg-white/5 rounded-2xl group-hover/upload:scale-110 group-hover/upload:bg-blue-600/20 transition-all shadow-2xl border border-white/5">
                                                {file ? <CheckCircle2 className="w-10 h-10 text-emerald-400 shadow-glow" /> : <Upload className="w-10 h-10 text-slate-700 group-hover/upload:text-blue-400" />}
                                            </div>
                                            <div className="text-center space-y-2">
                                                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic group-hover/upload:text-white transition-colors">
                                                    {file ? file.name : "Initialize Signal Ingestion"}
                                                </p>
                                                {!file && <p className="text-[9px] text-slate-800 font-black uppercase tracking-[0.2em]">Package.json / Project Root</p>}
                                            </div>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={startScan}
                                disabled={!file || status === 'scanning'}
                                className="w-full py-6 rounded-[1.8rem] bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all active:scale-95 disabled:opacity-10 flex items-center justify-center gap-3 shadow-2xl"
                            >
                                {status === 'scanning' ? 'Neural Mapping active...' : 'Begin Environmental Scan'}
                                {status !== 'scanning' && <ArrowRight size={18} className="translate-y-[-1px]" />}
                            </button>
                        </div>
                    </div>

                    <div className="relative group/topology overflow-hidden bg-[#050505] border border-white/5 rounded-[3rem] p-10 h-[400px] flex items-center justify-center shadow-2xl">
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                        <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] border-emerald-500/5 rounded-full scale-100" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] border-blue-500/5 rounded-full scale-[0.8]" />
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] border-violet-500/5 rounded-full scale-[0.6]" />
                            <div className="relative">
                                <div className={`w-40 h-40 rounded-full border-2 border-emerald-500/20 ${status === 'scanning' ? 'animate-[ping_1.5s_linear_infinite]' : 'animate-[ping_5s_linear_infinite]'} blur-sm shadow-glow`} />
                                <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-blue-500/10 animate-[ping_5s_linear_infinite_2.5s] blur-md shadow-glow" />
                                <div className={`absolute inset-0 flex items-center justify-center p-8 rounded-full shadow-[0_0_80px_rgba(16,185,129,0.15)] z-10 transition-all duration-1000 ${status === 'scanning' ? 'bg-amber-500/90 scale-110 shadow-amber-500/30' : 'bg-white text-black'}`}>
                                    <Globe size={40} className={status === 'scanning' ? 'animate-[spin_4s_linear_infinite]' : ''} />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operational Topology</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-base font-black text-white uppercase italic tracking-tighter">Global Tech Backbone</span>
                                <span className="text-[8px] font-black px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/10 rounded-md text-emerald-500 uppercase italic">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Matrix Results */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 backdrop-blur-3xl relative overflow-hidden shadow-2xl h-full flex flex-col">
                        <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-[0.02] transition-opacity"><Ghost size={60} /></div>

                        <div className="relative z-10 flex flex-col h-full gap-10">
                            <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Impact Matrix</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] font-mono">Structural Unit dissection // v1.0.42</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Detected Complexity</span>
                                        <span className="text-lg font-black text-emerald-400 italic font-mono uppercase tracking-tighter">Optimized-L2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-4">
                                <AnimatePresence mode="popLayout">
                                    {dependencies.length > 0 ? (
                                        dependencies.map((dep, i) => (
                                            <motion.div
                                                key={i}
                                                layout
                                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group/node grid grid-cols-12 items-center p-8 bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 rounded-[2.5rem] transition-all relative overflow-hidden active:scale-[0.99] shadow-inner"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/[0.03] to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity" />

                                                <div className="col-span-12 md:col-span-5 flex items-center gap-6 relative z-10">
                                                    <div className={`p-5 rounded-2xl border-2 shadow-inner transition-transform group-hover/node:scale-110 ${dep.impact === 'High Impact' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10' : 'bg-white/5 text-slate-600 border-white/5'
                                                        }`}>
                                                        <Package size={24} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover/node:text-emerald-400 transition-colors leading-[0.9]">{dep.library}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-black text-slate-700 font-mono italic">v.{dep.version}</span>
                                                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                                                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Core Unit</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-12 md:col-span-4 px-0 md:px-8 mt-6 md:mt-0 relative z-10">
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic border-l-2 border-white/5 pl-6 group-hover/node:border-emerald-500/40 group-hover/node:text-slate-300 transition-all uppercase tracking-tight">
                                                        "{dep.role}"
                                                    </p>
                                                </div>

                                                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end mt-6 md:mt-0 relative z-10">
                                                    <div className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-2xl transition-all group-hover/node:translate-x-[-4px] ${dep.impact === 'High Impact'
                                                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                        }`}>
                                                        {dep.impact} Node
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-20">
                                            <div className="p-10 border border-white/5 rounded-full bg-white/[0.02]">
                                                <Code2 size={80} className="text-slate-600" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <p className="text-lg font-black text-slate-500 uppercase italic tracking-[0.4em]">Environmental Scarcity</p>
                                                <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest italic">No architectural signal detected in current buffer</p>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-auto">
                                <div className="flex items-center gap-4 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/10 shadow-inner group">
                                    <div className="p-2 bg-emerald-500 rounded-lg text-black group-hover:rotate-12 transition-transform shadow-glow"><CheckCircle2 size={16} /></div>
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Stack Synchronization Fully Resolved</span>
                                </div>
                                <button className="group/export px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-[1.8rem] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all flex items-center gap-3">
                                    Generate Specs <ExternalLink size={16} className="group-hover/export:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
