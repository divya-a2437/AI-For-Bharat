"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, Network, Cpu, Shield,
    ArrowUpRight, ExternalLink, Filter,
    Search, Zap, Activity, Layers,
    ChevronRight, Info, AlertTriangle,
    Package, CheckCircle2, Globe, Upload
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
        { label: 'Analysis State', value: status === 'scanning' ? 'Scanning...' : status === 'done' ? 'Complete' : 'Idle', color: 'text-violet-400' },
        { label: 'Detected Depth', value: `${dependencies.length} Packages`, color: 'text-blue-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-600 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <Database size={24} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Dependency Matrix</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Autonomous ecosystem mapping. Ghostwriter identifies your tech stack and flags impact vectors for immediate technical literacy.
                    </p>
                </div>

                <div className="flex gap-6 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                    {stats.map((stat, i) => (
                        <div key={i} className={`flex flex-col ${i !== 0 ? 'border-l border-white/10 pl-6' : ''}`}>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span>
                            <span className={`text-lg font-black ${stat.color} font-mono italic`}>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Impact Analyzer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Side: Summary Map */}
                <div className="md:col-span-12 lg:col-span-4 space-y-8">
                    <BentoCard
                        title="Ingestion Port"
                        subtitle="STREAM TECH STAKE DATA"
                        className="border-violet-500/10 bg-violet-500/[0.02]"
                    >
                        <div className="mt-8 space-y-6">
                            <label className="group block cursor-pointer">
                                <div className="relative h-40 rounded-3xl border-2 border-dashed border-white/5 group-hover:border-violet-500/40 transition-all flex flex-col items-center justify-center bg-black/40 overflow-hidden">
                                    {status === 'scanning' && (
                                        <div className="absolute inset-0 bg-violet-900/20 backdrop-blur-sm z-10 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Cpu className="text-violet-400 animate-spin" size={32} />
                                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest animate-pulse">Neural Mapping...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-3 bg-white/5 rounded-2xl mb-3 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all">
                                        {file ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Upload className="w-6 h-6 text-slate-500 group-hover:text-violet-400" />}
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-300">
                                        {file ? file.name : "Select technical doc"}
                                    </p>
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </div>
                            </label>

                            <button
                                onClick={startScan}
                                disabled={!file || status === 'scanning'}
                                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-2"
                            >
                                {status === 'scanning' ? 'Analyzing Ecosystem...' : 'Scan Ecosystem'}
                                {status !== 'scanning' && <Zap size={14} />}
                            </button>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Ecosystem View"
                        subtitle="STACK VISUALIZATION"
                        className="border-white/5 bg-white/[0.01]"
                    >
                        <div className="mt-8 relative aspect-square rounded-[2rem] bg-black/40 border border-white/10 overflow-hidden group">
                            {/* Neural Background simulation */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full border border-violet-500/30 ${status === 'scanning' ? 'animate-[ping_1.5s_linear_infinite]' : 'animate-[ping_3s_linear_infinite]'}`} />
                                    <div className="absolute inset-0 w-32 h-32 rounded-full border border-emerald-500/30 animate-[ping_3s_linear_infinite_1.5s]" />
                                    <div className={`absolute inset-0 flex items-center justify-center p-6 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.5)] z-10 transition-colors ${status === 'scanning' ? 'bg-amber-500/80 backdrop-blur-md' : 'bg-violet-600'}`}>
                                        <Globe size={32} className="text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Sync</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">Project Backbone</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-black uppercase tracking-tighter">Live Map</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Quick Insight */}
                    <div className="p-8 rounded-[2.5rem] bg-violet-500/5 border border-violet-500/20 space-y-4">
                        <div className="flex items-center gap-3">
                            <Activity className="text-violet-400" size={20} />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Impact Signal</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Ghostwriter detected <span className="text-white font-bold">{status === 'done' ? dependencies.filter(d => d.impact === 'High Impact').length : '3'} Architecturally Sensitive</span> libraries. Changes to these packages carry high implementation risk.
                        </p>
                    </div>
                </div>

                {/* Right Side: Detailed Matrix */}
                <div className="md:col-span-12 lg:col-span-8">
                    <BentoCard
                        title="Impact Analyzer"
                        subtitle="DETAILED LIBRARY DISSECTION"
                        className="bg-emerald-500/[0.02] border-emerald-500/10 h-full"
                    >
                        <div className="mt-8 space-y-4 overflow-hidden">
                            {dependencies.map((dep, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group grid grid-cols-12 items-center p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-emerald-900/5"
                                >
                                    <div className="col-span-4 flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${dep.impact === 'High Impact' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'} border border-white/5`}>
                                            <Package size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-white uppercase group-hover:text-emerald-400 transition-colors">{dep.library}</h4>
                                            <p className="text-[10px] text-slate-500 font-mono">{dep.version}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-5 px-4">
                                        <p className="text-[11px] text-slate-400 font-medium leading-tight">{dep.role}</p>
                                    </div>

                                    <div className="col-span-3 flex justify-end">
                                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${dep.impact === 'High Impact'
                                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            {dep.impact}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Stack Fully Deserialized</span>
                                </div>
                                <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 text-xs font-black text-white hover:bg-white/10 transition-colors uppercase tracking-[0.1em]">
                                    Export Tech Specs
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
}
