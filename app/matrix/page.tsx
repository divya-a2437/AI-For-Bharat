"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, Network, Cpu, Shield,
    ArrowUpRight, ExternalLink, Filter,
    Search, Zap, Activity, Layers,
    ChevronRight, Info, AlertTriangle,
    Package, CheckCircle2, Globe, Upload, Radar, Code2
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

interface Dependency {
    library: string;
    impact: "High Impact" | "Low Impact";
    role: string;
    version: string;
}

export default function DependencyMatrix() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
    const [dependencies, setDependencies] = useState<Dependency[]>([
        { library: "Next.js", impact: "High Impact", role: "Framework Core / Routing", version: "14.1.0" },
        { library: "OpenAI", impact: "High Impact", role: "Neural Processing Engine", version: "4.28.0" },
        { library: "Tailwind CSS", impact: "High Impact", role: "Design System / Styling", version: "3.4.1" },
    ]);

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
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-32 relative overflow-hidden">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-600 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <Database size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Dependency Matrix</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Autonomous ecosystem mapping. Ghostwriter identifies your <span className="text-emerald-400 font-bold">tech stack architecture</span> and flags impact vectors.
                    </p>
                </div>

                <div className="flex gap-4 p-4 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    {stats.map((stat, i) => (
                        <div key={i} className={`flex flex-col px-6 ${i !== 0 ? 'border-l border-white/10' : ''}`}>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                            <span className={`text-2xl font-black ${stat.color} font-mono italic tracking-tighter`}>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Impact Analyzer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Left Side: Summary Map */}
                <div className="md:col-span-12 lg:col-span-4 space-y-10">
                    <BentoCard
                        title="Ingestion Port"
                        subtitle="STREAM TECH STAKE DATA"
                        className="border-blue-500/10 bg-blue-500/[0.02] relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                            <Radar size={80} />
                        </div>
                        <div className="mt-8 space-y-8 relative z-10">
                            <label className="group/upload block cursor-pointer">
                                <div className="relative h-48 rounded-[2.5rem] border-2 border-dashed border-white/10 group-hover/upload:border-blue-500/40 transition-all flex flex-col items-center justify-center bg-black/60 overflow-hidden shadow-inner">
                                    {status === 'scanning' && (
                                        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-md z-10 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="relative">
                                                    <Cpu className="text-blue-400 animate-spin" size={48} />
                                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl" />
                                                </div>
                                                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">Mapping Ecosystem...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover/upload:scale-110 group-hover/upload:bg-blue-500/20 transition-all shadow-lg">
                                        {file ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Upload className="w-8 h-8 text-slate-600 group-hover/upload:text-blue-400" />}
                                    </div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                        {file ? file.name : "Initialize Signal"}
                                    </p>
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={startScan}
                                disabled={!file || status === 'scanning'}
                                className="w-full py-6 rounded-[1.5rem] bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-3 group/btn"
                            >
                                {status === 'scanning' ? 'Parsing Neural Nodes...' : 'Begin Environmental Scan'}
                                {status !== 'scanning' && <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Ecosystem View"
                        subtitle="STACK TOPOLOGY"
                        className="border-white/10 bg-black/40 overflow-hidden group"
                    >
                        <div className="mt-8 relative aspect-square rounded-[2.5rem] bg-[#050505] border border-white/5 overflow-hidden shadow-inner flex items-center justify-center">
                            {/* Neural Visualization */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-[1px] border-emerald-500/10 rounded-full scale-90"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-[1px] border-blue-500/10 rounded-full scale-[0.7]"
                                />
                                <div className="relative">
                                    <div className={`w-40 h-40 rounded-full border-2 border-emerald-500/30 ${status === 'scanning' ? 'animate-[ping_1s_linear_infinite]' : 'animate-[ping_4s_linear_infinite]'} blur-sm`} />
                                    <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-blue-500/20 animate-[ping_4s_linear_infinite_2s] blur-md" />
                                    <div className={`absolute inset-0 flex items-center justify-center p-8 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 transition-all duration-700 ${status === 'scanning' ? 'bg-amber-500/90 scale-110 shadow-amber-500/40 rotate-180' : 'bg-emerald-600'}`}>
                                        <Globe size={40} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={12} className="text-emerald-400 animate-pulse" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Topology</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-white uppercase italic tracking-tight">Active Backbone</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-black uppercase border border-emerald-500/20">Operational</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </div>

                {/* Right Side: Detailed Matrix */}
                <div className="md:col-span-12 lg:col-span-8">
                    <BentoCard
                        title="Impact Analyzer"
                        subtitle="TECHNICAL NODE DISSECTION"
                        className="bg-emerald-500/[0.02] border-emerald-500/10 h-full relative"
                    >
                        <div className="absolute top-0 right-0 p-8 hidden lg:block">
                            <Network size={20} className="text-emerald-900/30" />
                        </div>
                        <div className="mt-10 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {dependencies.map((dep, i) => (
                                    <motion.div
                                        key={i}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="group grid grid-cols-12 items-center p-8 rounded-[2rem] bg-black/40 border border-white/5 hover:border-emerald-500/40 transition-all hover:bg-emerald-500/[0.03] shadow-lg relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="col-span-12 md:col-span-5 flex items-center gap-6 relative z-10">
                                            <div className={`p-4 rounded-2xl ${dep.impact === 'High Impact' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-500/10 text-slate-400 border-white/5'} border shadow-inner transition-colors`}>
                                                <Package size={22} />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black text-white uppercase group-hover:text-emerald-400 transition-colors italic tracking-tight">{dep.library}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{dep.version}</span>
                                                    {dep.impact === 'High Impact' && <Zap size={10} className="text-amber-500 animate-pulse" />}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-12 md:col-span-4 px-0 md:px-6 mt-4 md:mt-0 relative z-10">
                                            <p className="text-sm text-slate-400 font-medium leading-relaxed italic border-l-2 border-white/5 pl-5 group-hover:border-emerald-500/40 transition-colors">
                                                "{dep.role}"
                                            </p>
                                        </div>

                                        <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end mt-4 md:mt-0 relative z-10">
                                            <div className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all ${dep.impact === 'High Impact'
                                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white'
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white'
                                                }`}>
                                                {dep.impact}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {!dependencies.length && (
                                <div className="h-[400px] flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                                    <Database size={48} className="text-slate-500" />
                                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">No Environmental Signal Detected</p>
                                </div>
                            )}

                            <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3 bg-emerald-500/10 px-5 py-2.5 rounded-2xl border border-emerald-500/20">
                                    <CheckCircle2 size={18} className="text-emerald-400" />
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Tech Stack Decoupled Successfully</span>
                                </div>
                                <button className="flex items-center gap-3 px-8 py-4 rounded-[1.5rem] bg-white/5 text-[11px] font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] border border-white/10 group">
                                    Generate Architectural Specs
                                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform" />
                                </button>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
}
