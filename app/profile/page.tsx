"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, Zap, BookOpen, FileText, Clock, CreditCard, ChevronRight } from "lucide-react";

export default function ProfilePage() {
    const stats = [
        { label: "Files Processed", value: "24", icon: <FileText size={18} />, color: "text-blue-400" },
        { label: "Study Hours", value: "112", icon: <Clock size={18} />, color: "text-emerald-400" },
        { label: "Flashcards", value: "450", icon: <BookOpen size={18} />, color: "text-violet-400" },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Profile Header */}
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-violet-600/10 blur-[100px] -z-10 rounded-full" />
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-32 h-32 rounded-full border-2 border-white/10 p-1 bg-black/40 backdrop-blur-xl overflow-hidden">
                            <img src="/ghostwriter-logo.png" alt="Profile" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-violet-500 border-4 border-[#020202] flex items-center justify-center">
                            <Zap size={14} className="text-white fill-white" />
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black tracking-tight text-white mb-2">Student User</h1>
                        <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} /> student@ghostwriter.ai
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest">
                                Free Plan
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                    >
                        <div className={`p-3 rounded-2xl bg-white/5 inline-block mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-violet-400" /> Account Security
                </h3>

                <div className="grid gap-4">
                    <button className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-left group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Personal Information</p>
                                <p className="text-xs text-slate-500">Update your name and email address</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                    </button>

                    <button className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-left group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Billing & Subscription</p>
                                <p className="text-xs text-slate-500">Manage your plan and payment methods</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-tighter bg-violet-400/10 px-2 py-0.5 rounded">Legacy</span>
                            <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
