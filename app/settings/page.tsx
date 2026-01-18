"use client";

import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Bell, Database, Zap, Cpu, Key, User, ChevronRight, Sliders } from 'lucide-react';

export default function Settings() {
    const settings = [
        { group: 'Security', items: [{ icon: <Key />, name: 'Neural API Keys', desc: 'Secure management of OpenAI & Claude credentials' }, { icon: <Shield />, name: 'Privacy Mode', desc: 'Local-only processing for sensitive documentation' }] },
        { group: 'Core', items: [{ icon: <Cpu />, name: 'Intelligence Node', desc: 'GPT-4o / Claude 3 Sonnet selection' }, { icon: <Sliders />, name: 'Extraction Depth', desc: 'Balance between speed and architectural precision' }] },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-24 text-white">
            <header className="space-y-4 border-b border-white/5 pb-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-800 rounded-2xl">
                        <SettingsIcon size={24} />
                    </div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">System Configuration</h1>
                </div>
                <p className="text-slate-400 font-medium">
                    Configure the Ghostwriter engine, adjust neural parameters, and manage your intelligence credentials.
                </p>
            </header>

            <div className="space-y-12">
                {settings.map((group, i) => (
                    <div key={i} className="space-y-6">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">{group.group}</h2>
                        <div className="grid gap-4">
                            {group.items.map((item, j) => (
                                <div key={j} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-black/40 rounded-xl text-slate-400 group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-200">{item.name}</h3>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
