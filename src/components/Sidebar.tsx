"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, BookOpen, Settings, ChevronLeft, ChevronRight, Menu, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: <LayoutDashboard size={20} />, href: '/' },
        { name: 'Learning Assistant', icon: <Brain size={20} />, href: '/learning-assistant' },
        { name: 'Exam Predictor', icon: <Target size={20} />, href: '/predictor' },
        { name: 'Study Library', icon: <BookOpen size={20} />, href: '/library' },
        { name: 'Settings', icon: <Settings size={20} />, href: '/settings' },
    ];

    return (
        <aside
            className={`
                sticky top-0 h-screen bg-[#050505] border-r border-white/10 hidden md:flex flex-col transition-all duration-300 ease-in-out z-[100]
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}
        >
            <div className="p-6 flex items-center gap-3 justify-between">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                        >
                            <img src="/ghostwriter-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                            <h1 className="text-xl font-bold tracking-tighter text-white whitespace-nowrap overflow-hidden">
                                GHOSTWRITER
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all
                                ${isActive
                                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <div className={`${isActive ? 'text-violet-400' : 'text-slate-500'}`}>
                                {item.icon}
                            </div>

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="whitespace-nowrap overflow-hidden"
                                >
                                    {item.name}
                                </motion.span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-white/10 shadow-xl">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link href="/profile">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-3 p-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg cursor-pointer group">
                            <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center ring-1 ring-violet-500/30 overflow-hidden group-hover:ring-violet-500/50 transition-all">
                                <img src="/ghostwriter-logo.png" alt="User" className="w-6 h-6 object-contain" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">Student User</p>
                                <p className="text-[10px] text-slate-500 truncate">Free Plan</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center ring-1 ring-violet-500/30 cursor-pointer hover:bg-violet-500/30 transition-colors overflow-hidden">
                                <img src="/ghostwriter-logo.png" alt="User" className="w-6 h-6 object-contain" />
                            </div>
                        </div>
                    )}
                </Link>
            </div>
        </aside>
    );
}