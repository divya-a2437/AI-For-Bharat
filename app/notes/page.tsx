"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    StickyNote, Plus, Search, MoreHorizontal, Pin, Trash2,
    Edit3, Clock, Tag, ChevronRight, Sparkles, X
} from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    color: 'violet' | 'blue' | 'emerald' | 'amber' | 'rose';
    isPinned: boolean;
    tags: string[];
    createdAt: string;
}

const colorClasses = {
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', glow: 'from-violet-600/30' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', glow: 'from-blue-600/30' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'from-emerald-600/30' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', glow: 'from-amber-600/30' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', glow: 'from-rose-600/30' },
};

export default function QuickNotes() {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'React Server Components',
            content: 'RSC allows components to render on the server, reducing bundle size and improving performance. Key insight: data fetching happens at component level.',
            color: 'violet',
            isPinned: true,
            tags: ['React', 'Next.js'],
            createdAt: '2 hours ago'
        },
        {
            id: '2',
            title: 'Exam Strategy: System Design',
            content: 'Focus on: scalability patterns, CAP theorem trade-offs, and database sharding. Draw diagrams for every answer.',
            color: 'amber',
            isPinned: true,
            tags: ['Exam Prep', 'System Design'],
            createdAt: '5 hours ago'
        },
        {
            id: '3',
            title: 'TypeScript Utility Types',
            content: 'Partial<T>, Required<T>, Pick<T, K>, Omit<T, K> - memorize these for the interview. Also: ReturnType and Parameters.',
            color: 'blue',
            isPinned: false,
            tags: ['TypeScript'],
            createdAt: 'Yesterday'
        },
        {
            id: '4',
            title: 'Quick Reminder',
            content: 'Submit assignment by Friday. Review lecture notes on distributed consensus algorithms.',
            color: 'rose',
            isPinned: false,
            tags: ['Personal'],
            createdAt: '2 days ago'
        },
    ]);

    const [showNewNote, setShowNewNote] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', color: 'violet' as Note['color'] });
    const [searchQuery, setSearchQuery] = useState('');

    const pinnedNotes = notes.filter(n => n.isPinned);
    const otherNotes = notes.filter(n => !n.isPinned);

    const filteredPinned = pinnedNotes.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredOther = otherNotes.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addNote = () => {
        if (!newNote.title.trim()) return;
        const note: Note = {
            id: Date.now().toString(),
            title: newNote.title,
            content: newNote.content,
            color: newNote.color,
            isPinned: false,
            tags: [],
            createdAt: 'Just now'
        };
        setNotes([note, ...notes]);
        setNewNote({ title: '', content: '', color: 'violet' });
        setShowNewNote(false);
    };

    const togglePin = (id: string) => {
        setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative overflow-hidden">
            {/* Neural Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-violet-600/10 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-amber-600/10 blur-[110px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-amber-600 rounded-3xl shadow-[0_0_30px_rgba(217,119,6,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <StickyNote size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Quick Notes</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Capture thoughts, ideas, and insights <span className="text-amber-400 font-bold">instantly</span>. Your neural scratchpad for rapid knowledge capture.
                    </p>
                </div>

                <div className="flex gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 w-64 backdrop-blur-xl"
                        />
                    </div>
                    {/* New Note Button */}
                    <button
                        onClick={() => setShowNewNote(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40"
                    >
                        <Plus size={18} />
                        New Note
                    </button>
                </div>
            </header>

            {/* New Note Modal */}
            <AnimatePresence>
                {showNewNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
                        onClick={() => setShowNewNote(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl space-y-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">New Note</h2>
                                <button onClick={() => setShowNewNote(false)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Note title..."
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50"
                            />

                            <textarea
                                placeholder="Write your note..."
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 resize-none"
                            />

                            <div className="flex gap-2">
                                {(Object.keys(colorClasses) as Note['color'][]).map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setNewNote({ ...newNote, color })}
                                        className={`w-8 h-8 rounded-full ${colorClasses[color].bg} border-2 ${newNote.color === color ? 'border-white' : 'border-transparent'} transition-all`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={addNote}
                                className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold transition-all"
                            >
                                Create Note
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pinned Notes */}
            {filteredPinned.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Pin size={16} className="text-amber-400" />
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Pinned</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPinned.map((note, index) => (
                            <NoteCard key={note.id} note={note} index={index} onPin={togglePin} onDelete={deleteNote} />
                        ))}
                    </div>
                </section>
            )}

            {/* Other Notes */}
            <section className="space-y-6 pb-32">
                <div className="flex items-center gap-3">
                    <StickyNote size={16} className="text-slate-500" />
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">All Notes</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOther.map((note, index) => (
                        <NoteCard key={note.id} note={note} index={index} onPin={togglePin} onDelete={deleteNote} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function NoteCard({ note, index, onPin, onDelete }: { note: Note; index: number; onPin: (id: string) => void; onDelete: (id: string) => void }) {
    const colors = colorClasses[note.color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
        >
            <div className={`absolute -inset-1.5 bg-gradient-to-br ${colors.glow} to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
            <div className={`relative p-8 rounded-[2rem] bg-[#0a0a0a] border ${colors.border} hover:border-white/20 transition-all shadow-2xl space-y-5`}>
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text}`}>
                        <StickyNote size={18} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onPin(note.id)} className={`p-2 hover:bg-white/10 rounded-xl ${note.isPinned ? 'text-amber-400' : 'text-slate-500'}`}>
                            <Pin size={16} />
                        </button>
                        <button onClick={() => onDelete(note.id)} className="p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-rose-400">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h3 className="text-lg font-black text-white group-hover:text-violet-400 transition-colors">{note.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{note.content}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {note.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-slate-500 text-[10px] font-bold uppercase rounded-lg">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase">{note.createdAt}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </motion.div>
    );
}
