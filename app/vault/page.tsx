"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Database, Code, Zap, Layers,
    Search, Filter, Plus, ChevronRight,
    ArrowUpRight, Clock, Shield, Sparkles,
    Code2, Brain, Cpu
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

interface VaultBlock {
    id: string;
    title: string;
    content: string;
    category: 'syntax' | 'logic' | 'architecture';
    tags: string[];
    timestamp: string;
}

export default function AtomicVault() {
    const [activeFilter, setActiveFilter] = useState<'all' | 'syntax' | 'logic' | 'architecture'>('all');
    const [blocks, setBlocks] = useState<VaultBlock[]>([
        {
            id: '1',
            title: 'Asynchronous Stream Processing',
            content: 'import { from } from "rxjs";\nconst stream$ = from([1, 2, 3]);\nstream$.subscribe(console.log);',
            category: 'syntax',
            tags: ['RxJS', 'Streams', 'Async'],
            timestamp: '2h ago'
        },
        {
            id: '2',
            title: 'Backpressure Implementation',
            content: 'The strategy of handling data overflow by signaling the producer to slow down. Crucial for system stability under high load.',
            category: 'logic',
            tags: ['Performance', 'Strategy'],
            timestamp: '4h ago'
        },
        {
            id: '3',
            title: 'Distributed Event Mesh',
            content: 'Connecting multiple event brokers into a seamless fabric. Allows events to flow between clouds and on-premise apps.',
            category: 'architecture',
            tags: ['System Design', 'Cloud'],
            timestamp: 'Yesterday'
        },
        {
            id: '4',
            title: 'Promise.allSettled()',
            content: 'Promise.allSettled([p1, p2]).then(results => results.forEach(r => console.log(r.status)));',
            category: 'syntax',
            tags: ['JavaScript', 'ES2020'],
            timestamp: '2 days ago'
        }
    ]);

    const filteredBlocks = activeFilter === 'all'
        ? blocks
        : blocks.filter(b => b.category === activeFilter);

    const categories = [
        { id: 'syntax', label: 'Syntax', icon: <Code size={16} />, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        { id: 'logic', label: 'Logic', icon: <Brain size={16} />, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
        { id: 'architecture', label: 'Architecture', icon: <Layers size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            <Box size={24} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">The Atomic Vault</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium">
                        Modular knowledge blocks automatically indexed by neural extraction. Your "Zero-Click" repository for technical intelligence.
                    </p>
                </div>

                <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'all' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                    >
                        All Blocks
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat.id ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Neural Index Notification */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-violet-500/10 transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-violet-500/20 rounded-xl text-violet-400 animate-pulse">
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Neural Index Active</p>
                        <p className="text-[10px] text-slate-500 font-medium">Ghostwriter is automatically sorting your uploads into buckets.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-violet-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View Logs <ChevronRight size={14} />
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredBlocks.map((block, index) => {
                        const catInfo = categories.find(c => c.id === block.category) || categories[0];
                        return (
                            <motion.div
                                key={block.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                <div className="relative p-8 rounded-[2.3rem] bg-[#0a0a0a] border border-white/5 space-y-6 flex flex-col h-full hover:border-white/10 transition-all">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2.5 rounded-xl ${catInfo.bg} ${catInfo.color} border ${catInfo.border}`}>
                                            {catInfo.icon}
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{block.timestamp}</span>
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{block.title}</h3>
                                        <div className="relative">
                                            {block.category === 'syntax' ? (
                                                <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-slate-400 leading-relaxed overflow-x-auto custom-scrollbar">
                                                    {block.content}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                                    {block.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-wrap gap-2">
                                        {block.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-[9px] font-black uppercase tracking-tighter border border-white/10">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${catInfo.color}`}>
                                            {catInfo.label} Block
                                        </span>
                                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                            <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Create New Block Placeholder */}
                <button className="group relative border-2 border-dashed border-white/5 rounded-[2.3rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-violet-500/40 hover:bg-violet-500/[0.02] transition-all min-h-[300px]">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-violet-500/10 transition-all text-slate-500 group-hover:text-violet-400">
                        <Plus size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-400 group-hover:text-white">New Neural Block</p>
                        <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest group-hover:text-slate-500">Manual Entry</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
