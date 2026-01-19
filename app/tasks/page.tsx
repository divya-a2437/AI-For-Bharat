"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderKanban, Plus, MoreHorizontal, Clock, Tag, User,
    CheckCircle2, Circle, Loader2, ChevronRight, X, Flag
} from 'lucide-react';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate: string;
}

interface Column {
    id: 'todo' | 'inProgress' | 'done';
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    tasks: Task[];
}

export default function TaskBoard() {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'todo',
            title: 'To Do',
            icon: <Circle size={16} />,
            color: 'text-slate-400',
            bgColor: 'bg-slate-500/10',
            tasks: [
                { id: '1', title: 'Review Chapter 5: Distributed Systems', description: 'Focus on consensus algorithms and Paxos', priority: 'high', tags: ['Exam Prep'], dueDate: 'Tomorrow' },
                { id: '2', title: 'Practice LeetCode - Trees', description: 'Complete 5 medium difficulty problems', priority: 'medium', tags: ['DSA'], dueDate: 'In 3 days' },
                { id: '3', title: 'Watch lecture recordings', description: 'Database normalization lectures 7-9', priority: 'low', tags: ['Coursework'], dueDate: 'This week' },
            ]
        },
        {
            id: 'inProgress',
            title: 'In Progress',
            icon: <Loader2 size={16} className="animate-spin" />,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
            tasks: [
                { id: '4', title: 'Build React Portfolio Project', description: 'Complete the dashboard section with charts', priority: 'high', tags: ['Project'], dueDate: 'In 2 days' },
                { id: '5', title: 'Study TypeScript Generics', description: 'Advanced patterns and utility types', priority: 'medium', tags: ['Learning'], dueDate: 'Ongoing' },
            ]
        },
        {
            id: 'done',
            title: 'Done',
            icon: <CheckCircle2 size={16} />,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
            tasks: [
                { id: '6', title: 'Complete JavaScript Quiz', description: 'Scored 95% on closures and async', priority: 'medium', tags: ['Assessment'], dueDate: 'Completed' },
                { id: '7', title: 'Setup development environment', description: 'VS Code, Node.js, and all extensions', priority: 'low', tags: ['Setup'], dueDate: 'Completed' },
            ]
        }
    ]);

    const [showAddTask, setShowAddTask] = useState<string | null>(null);
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as Task['priority'] });

    const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
        setColumns(prev => {
            const newColumns = [...prev];
            const fromCol = newColumns.find(c => c.id === fromColumnId);
            const toCol = newColumns.find(c => c.id === toColumnId);
            if (!fromCol || !toCol) return prev;

            const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
            if (taskIndex === -1) return prev;

            const [task] = fromCol.tasks.splice(taskIndex, 1);
            toCol.tasks.push(task);
            return newColumns;
        });
    };

    const addTask = (columnId: string) => {
        if (!newTask.title.trim()) return;
        setColumns(prev => prev.map(col => {
            if (col.id !== columnId) return col;
            return {
                ...col,
                tasks: [...col.tasks, {
                    id: Date.now().toString(),
                    title: newTask.title,
                    description: newTask.description,
                    priority: newTask.priority,
                    tags: [],
                    dueDate: 'No due date'
                }]
            };
        }));
        setNewTask({ title: '', description: '', priority: 'medium' });
        setShowAddTask(null);
    };

    const priorityColors = {
        low: 'bg-slate-500/20 text-slate-400',
        medium: 'bg-amber-500/20 text-amber-400',
        high: 'bg-rose-500/20 text-rose-400'
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-12 space-y-12 relative overflow-hidden min-h-screen">
            {/* Neural Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-violet-600/10 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-emerald-600/10 blur-[110px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-600 rounded-3xl shadow-[0_0_30px_rgba(5,150,105,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20" />
                            <FolderKanban size={28} className="text-white relative z-10" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Task Board</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                        Organize your workflow with <span className="text-emerald-400 font-bold">Kanban-style</span> task management. Drag, track, and conquer.
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 p-2 bg-black/40 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-slate-400" />
                            <span className="text-slate-400">{columns[0].tasks.length} To Do</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400">{columns[1].tasks.length} In Progress</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-emerald-400">{columns[2].tasks.length} Done</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
                {columns.map((column) => (
                    <div key={column.id} className="space-y-4">
                        {/* Column Header */}
                        <div className={`flex items-center justify-between p-4 rounded-2xl ${column.bgColor} border border-white/5`}>
                            <div className="flex items-center gap-3">
                                <span className={column.color}>{column.icon}</span>
                                <h3 className={`text-sm font-black uppercase tracking-wide ${column.color}`}>{column.title}</h3>
                                <span className="px-2 py-0.5 bg-white/10 rounded-lg text-[10px] font-bold text-slate-400">
                                    {column.tasks.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowAddTask(column.id)}
                                className="p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Add Task Form */}
                        <AnimatePresence>
                            {showAddTask === column.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-white/10 space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Task title..."
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none"
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={() => addTask(column.id)} className="px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl">Add</button>
                                            <button onClick={() => setShowAddTask(null)} className="px-4 py-2 bg-white/5 text-slate-400 text-xs font-bold rounded-xl">Cancel</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tasks */}
                        <div className="space-y-4">
                            {column.tasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-white/20 transition-all space-y-4 cursor-pointer"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors leading-tight">
                                            {task.title}
                                        </h4>
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${priorityColors[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                    </div>

                                    {task.description && (
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{task.description}</p>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {task.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-white/5 text-slate-500 text-[9px] font-bold uppercase rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Clock size={12} />
                                            <span className="text-[10px] font-bold">{task.dueDate}</span>
                                        </div>

                                        {/* Move Buttons */}
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {column.id !== 'todo' && (
                                                <button
                                                    onClick={() => moveTask(task.id, column.id, column.id === 'done' ? 'inProgress' : 'todo')}
                                                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 text-[9px] font-bold"
                                                >
                                                    ← Back
                                                </button>
                                            )}
                                            {column.id !== 'done' && (
                                                <button
                                                    onClick={() => moveTask(task.id, column.id, column.id === 'todo' ? 'inProgress' : 'done')}
                                                    className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-400 text-[9px] font-bold"
                                                >
                                                    Next →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
