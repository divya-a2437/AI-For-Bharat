"use client";

import { motion } from 'framer-motion';
import {
    BookOpen, Search, Filter, Bookmark,
    Clock, Grid, List, ChevronRight,
    Library as LibraryIcon, Star, Sparkles,
    Box, Layers, Zap, ArrowUpRight
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

export default function StudyLibrary() {
    const shelf = [
        { title: "Distributed Systems Architecture", icon: <BookOpen />, type: "Manual", date: "2 days ago", color: "text-violet-400", bg: "bg-violet-400/10" },
        { title: "Advanced React Patterns 2024", icon: <LibraryIcon />, type: "Extraction", date: "5 days ago", color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { title: "Ghostwriter Internal Specs", icon: <Clock />, type: "Source", date: "1 week ago", color: "text-amber-400", bg: "bg-amber-400/10" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-32 relative overflow-hidden text-white">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-violet-600 rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <BookOpen size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Study Library</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Your permanent collection of neural extractions. Ghostwriter <span className="text-violet-400 font-bold">preserves technical context</span> for rapid long-term recall.
                    </p>
                </div>

                <div className="flex items-center gap-6 p-3 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/5">
                        <button className="p-3 bg-white/10 rounded-xl shadow-lg"><Grid size={18} /></button>
                        <button className="p-3 text-slate-600 hover:text-white transition-colors"><List size={18} /></button>
                    </div>
                    <div className="px-8 border-l border-white/10 flex items-center gap-3 group cursor-pointer">
                        <Search size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Search Vault</span>
                    </div>
                </div>
            </header>

            {/* Featured Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {shelf.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-full cursor-pointer"
                    >
                        <div className="absolute -inset-1.5 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-[2.8rem] p-10 hover:border-white/20 transition-all flex flex-col shadow-2xl overflow-hidden">
                            {/* Background Icon Watermark */}
                            <div className="absolute top-[-10%] right-[-10%] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none scale-[2.5] rotate-12">
                                {item.icon}
                            </div>

                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div className={`p-5 rounded-[1.5rem] ${item.bg} ${item.color} border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <button className="p-3 rounded-2xl bg-white/5 text-slate-600 hover:text-amber-400 transition-all hover:bg-white/10">
                                    <Star size={20} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4 relative z-10">
                                <div className="space-y-1">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${item.color}`}>{item.type} Node</span>
                                    <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter leading-tight border-b-2 border-white/5 pb-4">{item.title}</h3>
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <Clock size={12} className="text-slate-600" />
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Last Synced {item.date}</p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center group/btn relative z-10">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover/btn:text-white transition-colors flex items-center gap-2">
                                    <Box size={14} className="group-hover/btn:animate-pulse" /> Initialize Recall
                                </span>
                                <div className="p-3 rounded-xl bg-white/5 text-slate-600 group-hover/btn:translate-x-1 group-hover/btn:text-white group-hover/btn:bg-violet-600 transition-all duration-500 shadow-lg">
                                    <ChevronRight size={18} />
                                </div>
                            </div>

                            {/* Signal Indicator */}
                            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Zap size={14} className="text-amber-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Library Growth Indicator */}
                <div className="lg:col-span-3 p-10 rounded-[3rem] bg-violet-600/5 border border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-violet-500/30 transition-all shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent" />
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20 animate-pulse" />
                            <Layers className="text-violet-400" size={48} />
                        </div>
                        <div>
                            <p className="text-xl font-black text-white uppercase italic tracking-tight">Expand Neural Library</p>
                            <p className="text-sm text-slate-500 font-medium italic">Your collection automatically grows as you decompile more source materials.</p>
                        </div>
                    </div>
                    <button className="px-10 py-5 rounded-[1.5rem] bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all active:scale-95 flex items-center gap-3 relative z-10">
                        View Expansion Logs <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
