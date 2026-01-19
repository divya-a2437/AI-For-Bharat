"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Copy, Star, Clock, ChevronRight, BookOpen, Target, Brain, Code } from 'lucide-react';

interface Template { id: string; title: string; description: string; category: 'study' | 'exam' | 'project' | 'notes'; icon: React.ReactNode; uses: number; isFavorite: boolean; }

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([
        { id: '1', title: 'Cornell Notes', description: 'Structured note-taking with cues, notes, and summary sections', category: 'notes', icon: <BookOpen size={20} />, uses: 156, isFavorite: true },
        { id: '2', title: 'Exam Study Plan', description: 'Weekly breakdown with topics, resources, and practice tests', category: 'exam', icon: <Target size={20} />, uses: 243, isFavorite: true },
        { id: '3', title: 'Project Tracker', description: 'Milestones, deliverables, and progress tracking', category: 'project', icon: <Brain size={20} />, uses: 89, isFavorite: false },
        { id: '4', title: 'Code Review', description: 'Checklist for reviewing code quality and best practices', category: 'project', icon: <Code size={20} />, uses: 67, isFavorite: false },
        { id: '5', title: 'Flashcard Set', description: 'Q&A format for active recall practice', category: 'study', icon: <BookOpen size={20} />, uses: 312, isFavorite: true },
        { id: '6', title: 'Weekly Planner', description: 'Time-blocked schedule with priorities', category: 'study', icon: <Target size={20} />, uses: 198, isFavorite: false },
    ]);
    const [filter, setFilter] = useState<'all' | Template['category']>('all');
    const [search, setSearch] = useState('');

    const categoryColors = {
        study: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
        exam: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
        project: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
        notes: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    };

    const filtered = templates.filter(t => (filter === 'all' || t.category === filter) && t.title.toLowerCase().includes(search.toLowerCase()));
    const toggleFavorite = (id: string) => setTemplates(templates.map(t => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t));

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 pointer-events-none"><div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-emerald-600/10 blur-[130px] rounded-full animate-pulse" /></div>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-600 rounded-3xl shadow-[0_0_30px_rgba(5,150,105,0.4)]"><FileText size={28} className="text-white" /></div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Templates</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium">Pre-built formats for <span className="text-emerald-400 font-bold">faster productivity</span>. Start with structure, customize as needed.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none w-48" /></div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold"><Plus size={18} />Create</button>
                </div>
            </header>

            <div className="flex gap-3 p-2 bg-black/40 rounded-2xl border border-white/10 w-fit">
                {['all', 'study', 'exam', 'project', 'notes'].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat as any)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${filter === cat ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>{cat}</button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                {filtered.map((template, index) => {
                    const colors = categoryColors[template.category];
                    return (
                        <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group p-8 bg-[#0a0a0a] rounded-[2rem] border border-white/5 hover:border-white/20 transition-all space-y-6">
                            <div className="flex justify-between items-start">
                                <div className={`p-4 rounded-2xl ${colors.bg} ${colors.text}`}>{template.icon}</div>
                                <button onClick={() => toggleFavorite(template.id)} className={`p-2 rounded-xl transition-colors ${template.isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400'}`}><Star size={18} fill={template.isFavorite ? 'currentColor' : 'none'} /></button>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">{template.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{template.description}</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <span className={`px-2 py-1 rounded-lg ${colors.bg} ${colors.text} text-[9px] font-black uppercase`}>{template.category}</span>
                                    <span className="text-[10px] text-slate-600 font-bold">{template.uses} uses</span>
                                </div>
                                {template.id === '2' ? (
                                    <Link href="/study-plan" className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-emerald-900/40">
                                        <Plus size={12} />Use
                                    </Link>
                                ) : (
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
                                        <Copy size={12} />Use
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}

                <button className="group border-2 border-dashed border-white/10 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/40 transition-all min-h-[280px]">
                    <div className="p-6 bg-white/5 rounded-3xl group-hover:bg-emerald-500/20 transition-all text-slate-600 group-hover:text-emerald-400"><Plus size={32} /></div>
                    <p className="text-lg font-black text-slate-400 group-hover:text-white uppercase italic">Create Template</p>
                </button>
            </div>
        </div>
    );
}
