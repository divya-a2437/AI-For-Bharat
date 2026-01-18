"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Database, Code, Zap, Layers,
    Search, Filter, Plus, ChevronRight,
    ArrowUpRight, Clock, Shield, Sparkles,
    Code2, Brain, Cpu, Terminal
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
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative overflow-hidden">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-emerald-600/10 blur-[110px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-600 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <Box size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">The Atomic Vault</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Modular knowledge blocks automatically indexed by neural extraction. Your <span className="text-blue-400 font-bold">Zero-Click repository</span> for technical intelligence.
                    </p>
                </div>

                <div className="flex gap-4 p-3 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === 'all' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
                    >
                        Index All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === cat.id ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-slate-500 hover:text-white'}`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Neural Index Notification */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.005 }}
                className="p-6 bg-violet-600/10 border border-violet-500/20 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-violet-600/15 transition-all shadow-[0_15px_30px_-10px_rgba(124,58,237,0.2)]"
            >
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-violet-500/20 rounded-2xl text-violet-400 relative">
                        <Sparkles size={20} className="animate-pulse" />
                        <div className="absolute inset-0 bg-violet-400/20 rounded-2xl blur-md" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white uppercase tracking-tight">Autonomous Neural Indexing Active</p>
                        <p className="text-xs text-slate-500 font-medium italic">Ghostwriter is mapping 42 new extraction branches from your recent uploads.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-violet-400 uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform bg-violet-500/10 px-4 py-2 rounded-xl">
                    Neural Logs <ChevronRight size={14} />
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                <AnimatePresence mode="popLayout">
                    {filteredBlocks.map((block, index) => {
                        const catInfo = categories.find(c => c.id === block.category) || categories[0];
                        return (
                            <motion.div
                                key={block.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05, type: 'spring', damping: 20 }}
                                className="group relative h-full"
                            >
                                <div className={`absolute -inset-1.5 bg-gradient-to-br ${block.category === 'syntax' ? 'from-blue-600/30 to-violet-600/30' : block.category === 'logic' ? 'from-amber-600/30 to-orange-600/30' : 'from-emerald-600/30 to-cyan-600/30'} rounded-[2.8rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                                <div className="relative p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 space-y-8 flex flex-col h-full hover:border-white/20 transition-all shadow-2xl overflow-hidden">
                                    {/* Background Icon Watermark */}
                                    <div className="absolute top-[-10%] right-[-10%] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none scale-[2]">
                                        {catInfo.icon}
                                    </div>

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className={`p-4 rounded-2xl ${catInfo.bg} ${catInfo.color} border-2 ${catInfo.border} shadow-inner`}>
                                            {catInfo.icon}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{block.timestamp}</span>
                                            <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${catInfo.color}`}>Verified</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1 relative z-10">
                                        <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic tracking-tight leading-tight">{block.title}</h3>
                                        <div className="relative">
                                            {block.category === 'syntax' ? (
                                                <div className="p-6 bg-black/60 rounded-3xl border border-white/5 font-mono text-[11px] text-slate-400 leading-relaxed overflow-x-auto custom-scrollbar shadow-inner group-hover:border-blue-500/20 transition-colors">
                                                    <div className="flex gap-1.5 mb-4 opacity-30">
                                                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                    </div>
                                                    {block.content}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-l-2 border-white/5 pl-5 group-hover:border-amber-500/40 transition-colors">
                                                    {block.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 flex flex-wrap gap-2 relative z-10">
                                        {block.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-xl bg-white/[0.03] text-slate-500 text-[10px] font-black uppercase tracking-tighter border border-white/5 hover:bg-white/10 hover:text-white transition-all cursor-default">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${catInfo.color.replace('text', 'bg')} animate-pulse`} />
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${catInfo.color}`}>
                                                {catInfo.label} Node
                                            </span>
                                        </div>
                                        <button className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-white hover:bg-white/10 transition-all hover:translate-y-[-2px] hover:translate-x-[2px]">
                                            <ArrowUpRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Create New Block Placeholder */}
                <button className="group relative border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-6 hover:border-blue-500/40 hover:bg-blue-500/[0.03] transition-all min-h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-6 bg-white/5 rounded-3xl group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:rotate-12 transition-all text-slate-600 group-hover:text-blue-400 relative z-10">
                        <Plus size={32} />
                    </div>
                    <div className="text-center relative z-10">
                        <p className="text-lg font-black text-slate-400 group-hover:text-white uppercase italic tracking-tighter">Initialize Neural Block</p>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] mt-2">Manual Signal Bridge</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
