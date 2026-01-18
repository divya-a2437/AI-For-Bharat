"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, CheckCircle2, Zap, ArrowRight, Code } from "lucide-react";

interface QuickLessonProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

export default function QuickLesson({ isOpen, onClose, topic }: QuickLessonProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Lesson Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-violet-600 rounded-2xl">
                                    <BookOpen size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Quick Lesson</h3>
                                    <p className="text-xl font-black text-white italic uppercase tracking-tighter">{topic}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-violet-400 uppercase tracking-[0.3em]">Core Concept</h4>
                                <p className="text-slate-300 leading-relaxed font-medium">
                                    In a <span className="text-white font-bold italic">Distributed Environment</span>, state isn't just in one place. Your Server Actions might be stateless, but your users expect consistency across multiple nodes.
                                </p>
                            </div>

                            <div className="p-8 bg-black/60 rounded-[2rem] border border-white/5 font-mono text-sm relative group">
                                <div className="flex items-center gap-2 mb-4 text-slate-500">
                                    <Code size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Implementation Bridge</span>
                                </div>
                                <pre className="text-violet-300 group-hover:text-blue-300 transition-colors">
                                    {`// syncing state across edges
export async function updateState(data) {
  const result = await db.insert(stats).values(data);
  revalidatePath('/dashboard'); 
  // Force global re-sync
  return { success: true };
}`}
                                </pre>
                                <div className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap size={14} className="text-amber-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/5 transition-colors">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <span className="text-sm text-slate-400 font-medium">Use <span className="text-white">Radix UI</span> primitives for local optimism.</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/5 transition-colors">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <span className="text-sm text-slate-400 font-medium">Leverage <span className="text-white">Redis</span> for shared-edge cache sync.</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-white/[0.02] border-t border-white/5 flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-8 py-4 rounded-xl text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Dismiss
                            </button>
                            <button
                                className="px-10 py-4 rounded-xl bg-white text-black text-[11px] font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
                            >
                                Mark as Complete <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
