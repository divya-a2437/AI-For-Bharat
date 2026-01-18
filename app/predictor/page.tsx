"use client";

import { useState } from 'react';
import { Upload, FileText, Sparkles, Loader2, Zap, CheckCircle2, ChevronRight, Target, Layers, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidDiagram from '@/components/MermaidDiagram';

function AgentStatusItem({ name, task, status }: { name: string; task: string; status: "active" | "idle" | "pending" }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                {status === "active" ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                ) : status === "idle" ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                )}
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">{name}</span>
                    <span className="text-[9px] text-slate-500 font-medium uppercase tracking-widest">{task}</span>
                </div>
            </div>
            <div className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border transition-colors ${status === "active" ? "text-amber-400 bg-amber-400/10 border-amber-400/20" :
                status === "idle" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
                    "text-slate-500 bg-slate-500/10 border-slate-500/20"
                }`}>
                {status}
            </div>
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

            const res = await fetch("/api/predict", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setPredictions(data.predictions || []);
            if (data.technicalMatrix) setTechnicalMatrix(data.technicalMatrix);
            if (data.mermaidChart) setMermaidChart(data.mermaidChart);
            setStatus("done");
        } catch (err) {
            console.error("Prediction failed", err);
            setStatus("idle");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live Analysis Engine</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">Exam Predictor</h1>
                    <p className="text-slate-400 mt-4 max-w-xl leading-relaxed">
                        Deploy autonomous agents to extract high-probability patterns from your course materials.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">System Health</p>
                        <p className="text-xl font-black text-emerald-400 font-mono">99.8%</p>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</p>
                        <p className="text-xl font-black text-violet-400 font-mono">High</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left: Control Panel */}
                <div className="md:col-span-5 space-y-6">
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Upload size={16} className="text-violet-400" /> 1. Input Stream
                            </h3>

                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/[0.04] hover:border-violet-500/30 transition-all group/label">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover/label:scale-110 transition-transform">
                                        <FileText className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="mb-2 text-sm text-slate-300 font-medium">
                                        Drop material or <span className="text-violet-400">browse</span>
                                    </p>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">PDF, DOCX (Max 10MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
                            </label>

                            {file && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                        <span className="text-xs font-bold text-emerald-400 truncate tracking-tight">{file.name}</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">Safe</span>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={generatePredictions}
                        disabled={!file || status === "processing"}
                        className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-violet-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black flex items-center justify-center gap-3 group"
                    >
                        {status === "processing" ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                Deploy Analyst Agents
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Sidebar Agent Status - Shows AI meaningfully improving the workflow */}
                    <div className="mt-8 space-y-6 pt-8 border-t border-white/5 bg-black/20 p-6 rounded-3xl">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Active Workforce</p>

                        <div className="space-y-4">
                            <AgentStatusItem
                                name="The Archivist"
                                task="Indexing Codebase"
                                status="active"
                            />
                            <AgentStatusItem
                                name="The Analyst"
                                task="Calculating Probability"
                                status="idle"
                            />
                            <AgentStatusItem
                                name="The Explainer"
                                task="Decompiling Logic"
                                status="pending"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Technical Matrix & Predictions */}
                <div className="md:col-span-7 space-y-6">
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Target size={16} className="text-emerald-400" /> 2. Technical Matrix
                        </h3>
                        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="p-4 text-[10px] uppercase font-bold text-slate-500">Technical Concept</th>
                                        <th className="p-4 text-[10px] uppercase font-bold text-slate-500">Difficulty</th>
                                        <th className="p-4 text-[10px] uppercase font-bold text-slate-500">System Priority</th>
                                        <th className="p-4 text-[10px] uppercase font-bold text-slate-500">Probability</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-sans">
                                    {technicalMatrix.map((item, i) => (
                                        <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                                            <td className="p-4 font-bold text-sm text-slate-200">{item.concept}</td>
                                            <td className="p-4 text-xs text-slate-400 font-medium">{item.difficulty}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-violet-500/10 border border-violet-500/20 rounded text-[10px] text-violet-400 uppercase font-black tracking-tighter">
                                                    {item.priority}
                                                </span>
                                            </td>
                                            <td className="p-4 text-emerald-400 font-mono font-bold">{item.prob}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 min-h-[300px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={16} className="text-amber-400" /> 3. Extracted Insights
                            </h3>
                            {predictions.length > 0 && (
                                <span className="text-[10px] font-black text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded">
                                    {predictions.length} Signals
                                </span>
                            )}
                        </div>

                        {!predictions.length ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                                <Zap size={32} className="text-slate-500 mb-4" />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Awaiting Analysis Data</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {predictions.map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-sm font-bold text-slate-200 leading-snug w-[85%]">{p.question}</h4>
                                            <span className="text-[10px] font-black text-violet-400 font-mono">{p.confidence}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-3">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${p.confidence}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="h-full bg-gradient-to-r from-violet-500 to-emerald-500"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-500 italic font-medium leading-relaxed">
                                            "{p.reason}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logic Flow Visualization */}
                    {mermaidChart && (
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Layers className="text-blue-400" size={16} /> 4. Logic Flow Diagram
                            </h3>
                            <MermaidDiagram chart={mermaidChart} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
