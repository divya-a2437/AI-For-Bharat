"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Layers,
    Cpu,
    Terminal,
    Settings,
    User,
    ExternalLink,
    Circle,
    Code2,
    Atom,
    Database,
    Cloud
} from "lucide-react";
import Galaxy from "@/components/Galaxy";
import NeuralNetwork from "@/components/NeuralNetwork";

// --- ANIMATION CONSTANTS (Swift-Style) ---
const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 260,
    damping: 20
} as const;

const STAGGER_CHILDREN = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
} as const;

const FADE_UP_VARIANT = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: SPRING_TRANSITION
    }
} as const;

const ICON_FLOAT_TRANSITION = (delay: number) => ({
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: delay
    }
});

export default function DashboardOverview() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            {/* Background Layer */}
            <Galaxy />
            <NeuralNetwork />

            {/* Main Glassmorphic Dashboard */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ ...SPRING_TRANSITION, duration: 1.2 }}
                className="relative w-full max-w-6xl aspect-[16/10] glass-card overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-[0_0_100px_rgba(139,92,246,0.15)]"
            >
                {/* macOS Window Controls */}
                <div className="absolute top-6 left-6 flex gap-2 z-50">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
                </div>

                {/* Sidebar */}
                <aside className="w-20 md:w-24 border-r border-white/5 flex flex-col items-center py-20 gap-8 z-20 bg-black/10 backdrop-blur-md">
                    {[
                        { icon: Home, label: "Home", active: true },
                        { icon: Layers, label: "Projects" },
                        { icon: User, label: "Profile" },
                        { icon: Settings, label: "Settings" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1), ...SPRING_TRANSITION }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-3 rounded-2xl cursor-pointer transition-colors ${item.active ? 'bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={24} />
                        </motion.div>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 relative flex flex-col md:flex-row items-center px-12 py-20 z-10">

                    {/* Left Text Content */}
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20"
                        >
                            <Circle className="fill-amber-500 text-amber-500" size={8} />
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Active Project</span>
                        </motion.div>

                        <motion.h1
                            variants={FADE_UP_VARIANT}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
                        >
                            Providing the best <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                                project experience.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={FADE_UP_VARIANT}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.2 }}
                            className="text-slate-400 text-lg max-w-lg leading-relaxed"
                        >
                            We decompile technical complexity into actionable knowledge bits, powered by agentic intelligence.
                        </motion.p>

                        <motion.div
                            variants={FADE_UP_VARIANT}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.4 }}
                            className="flex items-center gap-4 flex-wrap justify-center md:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-violet-600 rounded-2xl font-bold text-white shadow-lg shadow-violet-600/20 flex items-center gap-2 group"
                            >
                                Hire Me
                                <ExternalLink size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </motion.button>

                            <motion.button
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white transition-colors"
                            >
                                Explore More
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right Visual Content (Tech Stack Cluster) */}
                    <div className="flex-1 relative w-full h-[400px] mt-12 md:mt-0">
                        {/* Central Circle Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 blur-[100px] animate-pulse" />

                        {/* Floating Tech Icons */}
                        {[
                            { Icon: Code2, color: "text-blue-400", x: "20%", y: "20%", delay: 0 },
                            { Icon: Atom, color: "text-cyan-400", x: "70%", y: "30%", delay: 1 },
                            { Icon: Cpu, color: "text-violet-400", x: "40%", y: "60%", delay: 2 },
                            { Icon: Database, color: "text-emerald-400", x: "80%", y: "70%", delay: 3 },
                            { Icon: Terminal, color: "text-indigo-400", x: "10%", y: "80%", delay: 4 },
                            { Icon: Cloud, color: "text-blue-500", x: "50%", y: "10%", delay: 5 },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    left: tech.x,
                                    top: tech.y,
                                }}
                                transition={{ delay: 1.5 + (i * 0.1), ...SPRING_TRANSITION }}
                                className="absolute"
                            >
                                <motion.div
                                    animate={ICON_FLOAT_TRANSITION(tech.delay)}
                                    className={`p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ${tech.color}`}
                                >
                                    <tech.Icon size={32} />
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Floating Earth / Orbit-like element (Simplified CSS animation) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ delay: 2, duration: 2 }}
                            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-violet-500/20"
                            style={{
                                background: 'radial-gradient(circle at center, transparent, rgba(139, 92, 246, 0.1))'
                            }}
                        />
                    </div>
                </main>

                {/* Dynamic Background Noise/Glows */}
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-indigo-500/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* Aesthetic Overlay Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="fixed top-0 left-0 w-full h-full pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"
            />
        </div>
    );
}
