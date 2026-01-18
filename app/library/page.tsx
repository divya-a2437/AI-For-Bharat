"use client";

import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, Bookmark, Clock, Grid, List, ChevronRight, Library as LibraryIcon, Star } from 'lucide-react';
import BentoCard from "@/components/BentoCard";

export default function StudyLibrary() {
    const shelf = [
        { title: "Distributed Systems Architecture", icon: <BookOpen className="text-violet-400" />, type: "Manual", date: "2 days ago" },
        { title: "Advanced React Patterns 2024", icon: <LibraryIcon className="text-emerald-400" />, type: "Extraction", date: "5 days ago" },
        { title: "Ghostwriter Internal Specs", icon: <Clock className="text-amber-400" />, type: "Source", date: "1 week ago" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-24 text-white">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-violet-600 rounded-2xl">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Study Library</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium">
                        Your permanent collection of neural extractions and technical materials. Refined for long-term knowledge retention.
                    </p>
                </div>

                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex p-1 bg-black/40 rounded-xl">
                        <button className="p-2 bg-white/10 rounded-lg"><Grid size={16} /></button>
                        <button className="p-2 text-slate-500"><List size={16} /></button>
                    </div>
                    <div className="px-4 border-l border-white/10 flex items-center gap-2">
                        <Search size={16} className="text-slate-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Search Collection</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shelf.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/20 group-hover:to-blue-500/20 rounded-[2rem] transition-all duration-500" />
                        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 hover:border-white/20 transition-all flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-xl">
                                    {item.icon}
                                </div>
                                <button className="text-slate-600 hover:text-amber-400 transition-colors">
                                    <Star size={18} />
                                </button>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-lg font-bold group-hover:text-violet-400 transition-colors">{item.title}</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.type} • {item.date}</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center group/btn cursor-pointer">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/btn:text-white transition-colors">Open Resource</span>
                                <ChevronRight size={14} className="text-slate-600 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
