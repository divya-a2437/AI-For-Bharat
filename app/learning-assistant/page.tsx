"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Upload, Mic, FileText, Sparkles,
    Layers, Ghost, Zap, Clock, Globe,
    FileVideo, Music, Play, ChevronRight,
    Brain, Target, BookOpen
} from "lucide-react";
import BentoCard from "@/components/BentoCard";
import AgentRow from "@/components/AgentRow";
import Flashcard from "@/components/Flashcard";

export default function LearningAssistant() {
    const [currentTime, setCurrentTime] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen text-white bg-transparent p-8 md:p-12 selection:bg-violet-500/30">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                            <Ghost className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">Ghostwriter</h1>
                    </div>
                    <p className="text-slate-400 max-w-md font-medium leading-relaxed">
                        High-fidelity study extraction engine. Distilling lecture noise into exam-day clarity.
                    </p>
                </div>

                <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <div className="p-2 bg-white/5 rounded-xl text-slate-400">
                        <Ghost size={20} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Latency</p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-black text-emerald-400 font-mono">52ms</span>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex flex-col px-4 text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Sync</p>
                        <p className="text-sm font-black text-violet-400 font-mono">{currentTime || "12:19:27"}</p>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                {/* Source Material Card */}
                <BentoCard
                    title="Source Material"
                    subtitle="UPLOAD YOUR COURSE MATERIALS AND WE'LL GENERATE SUMMARIES, NOTES, AND QUIZ'S."
                    className="md:col-span-8 border-violet-500/10 min-h-[500px] flex flex-col"
                >
                    <div className="mt-10 flex-1 flex flex-col">
                        <label className="relative w-full h-64 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center group hover:bg-white/[0.01] hover:border-violet-500/20 transition-all duration-500 cursor-pointer">
                            <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.pptx,.txt" />
                            <div className="relative mb-6">
                                {/* Central Glow Icon */}
                                <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-30 animate-pulse" />
                                <div className="relative flex items-center justify-center">
                                    {/* Floating Music Icon */}
                                    <motion.div
                                        animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="absolute -left-16 bottom-0 p-2.5 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-white/10 text-blue-400 shadow-2xl"
                                    >
                                        <Music size={18} />
                                    </motion.div>

                                    {/* Main File Icon */}
                                    <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] ring-1 ring-white/20">
                                        <FileText size={40} />
                                    </div>

                                    {/* Floating Video Icon */}
                                    <motion.div
                                        animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                        className="absolute -right-12 -top-4 p-2.5 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-white/10 text-violet-400 shadow-2xl"
                                    >
                                        <FileVideo size={18} />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="text-slate-500 mb-1">
                                    <ChevronRight size={16} className="-rotate-90" />
                                </div>
                                <p className="text-sm font-bold text-slate-300 tracking-tight">
                                    {file ? `Selected: ${file.name}` : "Drag & drop files here or click to browse"}
                                </p>
                            </div>
                        </label>

                        {/* Action Section */}
                        <div className="mt-8 flex flex-col items-center">
                            <label className="px-12 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-violet-600 rounded-full text-white font-black uppercase tracking-[0.1em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] cursor-pointer">
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.pptx,.txt" />
                                <Upload size={20} />
                                Upload Files
                            </label>

                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {[
                                    { label: 'PDF', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
                                    { label: 'PPTX', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
                                    { label: 'MFT4', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
                                    { label: 'MP4', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
                                    { label: 'MP3', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
                                ].map((pill) => (
                                    <span
                                        key={pill.label}
                                        className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${pill.bg} ${pill.border} ${pill.color}`}
                                    >
                                        {pill.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="mt-auto pt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-slate-600" />
                                Max size: 500MB
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-violet-500" />
                                Works great with lecture recordings - <span className="underline cursor-pointer hover:text-white transition-colors">See example</span>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Right Column Stack */}
                <div className="md:col-span-4 space-y-8">
                    <BentoCard
                        title="The Archivist"
                        subtitle="DOCUMENT LOGIC ENGINE"
                        className="border-blue-500/10"
                    >
                        <div className="mt-4 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-slate-500" />
                                <Brain className="text-violet-400" size={24} />
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                Crawls through PDFs and slides to extract definitions, structural hierarchy, and hidden charts.
                            </p>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="The Listener"
                        subtitle="SEMANTIC AUDIO ANALYZER"
                        className="border-orange-500/10"
                    >
                        <div className="absolute top-8 right-8 bg-orange-500 text-[10px] font-black uppercase px-2 py-1 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                            Coming Soon
                        </div>
                        <div className="mt-4 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <Mic className="text-orange-400" size={24} />
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                Monitors tone and emphasis to find the "exam signals" buried in transcripts. Detects when the lecturer slows down.
                            </p>
                        </div>
                    </BentoCard>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* The Master Guide */}
                <BentoCard
                    title="The Master Guide"
                    subtitle="GENERATED EXAM INTELLIGENCE"
                    className="md:col-span-12 border-violet-500/10 min-h-[500px]"
                >
                    <div className="mt-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-slate-500" />
                                <Layers className="text-violet-400" size={20} />
                                <span className="text-xs font-black uppercase tracking-widest text-white">Distillation Engine</span>
                            </div>
                            <div className="flex gap-2">
                                {['PDF', 'NOTION', 'ANKI'].map(plat => (
                                    <button key={plat} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                        <ChevronRight size={12} />
                                        {plat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Flashcard
                                    question="What is the primary function of Reactive Streams?"
                                    answer="To provide a standard for asynchronous stream processing with non-blocking back pressure."
                                />
                                <Flashcard
                                    question="Explain the 'Event Loop' in Node.js."
                                    answer="A single-threaded mechanism that handles multiple concurrent operations by delegating I/O to the system kernel."
                                />
                                <Flashcard
                                    question="Define 'Ghostwriting' in this context."
                                    answer="The process of autonomous agents decompiling noise into high-fidelity knowledge blocks."
                                />
                            </div>
                        </div>
                    </div>
                </BentoCard>
            </div>
        </div>
    );
}
