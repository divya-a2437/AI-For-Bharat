"use client";

import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon, Shield, Bell,
    Database, Zap, Cpu, Key, User,
    ChevronRight, Sliders, Activity,
    ShieldCheck, Smartphone, Globe
} from 'lucide-react';
import BentoCard from "@/components/BentoCard";

export default function Settings() {
    const settings = [
        {
            group: 'Security & Access',
            items: [
                { icon: <Key />, name: 'Neural API Keys', desc: 'Secure management of OpenAI, Claude, and JAX credentials', status: '4 Active' },
                { icon: <ShieldCheck />, name: 'Privacy Shield', desc: 'Enable air-gapped local processing for sensitive source materials', status: 'Enabled' }
            ]
        },
        {
            group: 'Neural Engine',
            items: [
                { icon: <Cpu />, name: 'Intelligence Provider', desc: 'GPT-4o (Cloud) / Neural.jax (Local Fallback)', status: 'Optimal' },
                { icon: <Activity />, name: 'Heuristic Depth', desc: 'Adjust extraction granularity vs synthesis speed', status: 'Balanced' }
            ]
        },
        {
            group: 'System Preferences',
            items: [
                { icon: <Globe />, name: 'Data Localization', desc: 'Manage where your extracted neural blocks are stored', status: 'Global' },
                { icon: <Smartphone />, name: 'Interface Mode', desc: 'Toggle high-fidelity visual effects and neural streams', status: 'Neural Dark' }
            ]
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 pb-32 relative overflow-hidden text-white">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-slate-800 rounded-3xl shadow-[0_0_30px_rgba(30,41,59,0.4)] relative border border-white/10">
                            <div className="absolute inset-0 bg-white/10 rounded-3xl animate-ping opacity-10" />
                            <SettingsIcon size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">System Config</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Configure the Ghostwriter engine, adjust neural parameters, and manage your <span className="text-white font-bold">intelligence credentials</span>.
                    </p>
                </div>

                <div className="flex gap-4 p-4 bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <div className="px-6 border-r border-white/10 flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Engine State</span>
                        <span className="text-xl font-black text-emerald-400 font-mono italic tracking-tighter uppercase">Operational</span>
                    </div>
                    <div className="px-6 flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Neural Core</span>
                        <span className="text-xl font-black text-blue-400 font-mono italic tracking-tighter uppercase">v4.0.2</span>
                    </div>
                </div>
            </header>

            <div className="space-y-16 lg:px-12">
                {settings.map((group, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="space-y-8"
                    >
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-4 border-l-2 border-violet-500 flex items-center gap-3">
                            {group.group}
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
                        </h2>
                        <div className="grid gap-6">
                            {group.items.map((item, j) => (
                                <motion.div
                                    key={j}
                                    whileHover={{ x: 8 }}
                                    className="group p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex items-center justify-between hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer shadow-xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-center gap-8 relative z-10">
                                        <div className="p-4 bg-black/60 rounded-2xl text-slate-500 group-hover:text-white group-hover:bg-violet-600/20 group-hover:border-violet-500/20 border border-white/5 transition-all shadow-inner">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-slate-200 group-hover:text-white transition-colors uppercase italic tracking-tight">{item.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium group-hover:text-slate-400 transition-colors">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 relative z-10">
                                        <span className="text-[10px] font-black text-slate-600 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 uppercase tracking-widest group-hover:border-white/20 group-hover:text-slate-400 transition-all">
                                            {item.status}
                                        </span>
                                        <ChevronRight size={20} className="text-slate-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 p-10 rounded-[3rem] bg-rose-500/5 border border-rose-500/10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-rose-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-transparent" />
                <div className="flex items-center gap-8 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse" />
                        <Zap className="text-rose-400" size={48} />
                    </div>
                    <div>
                        <p className="text-xl font-black text-white uppercase italic tracking-tight">Factory Resynthesize</p>
                        <p className="text-sm text-slate-500 font-medium italic">Purge all neural extractions and reset the Ghostwriter core logic tree.</p>
                    </div>
                </div>
                <button className="px-10 py-5 rounded-[1.5rem] bg-rose-500 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(244,63,94,0.3)] transition-all active:scale-95 flex items-center gap-3 relative z-10">
                    Wipe Neural Cache
                </button>
            </div>
        </div>
    );
}
