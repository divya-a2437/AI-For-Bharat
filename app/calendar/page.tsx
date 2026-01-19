"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, X } from 'lucide-react';

interface Event { id: string; title: string; time: string; type: 'exam' | 'deadline' | 'study' | 'meeting'; color: string; }

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const events: { [key: number]: Event[] } = {
        5: [{ id: '1', title: 'Distributed Systems Exam', time: '10:00 AM', type: 'exam', color: 'bg-rose-500' }],
        12: [{ id: '3', title: 'Study Group Session', time: '3:00 PM', type: 'study', color: 'bg-violet-500' }],
        20: [{ id: '6', title: 'Algorithm Review', time: '9:00 AM', type: 'study', color: 'bg-violet-500' }],
        25: [{ id: '7', title: 'Final Exam', time: '9:00 AM', type: 'exam', color: 'bg-rose-500' }],
    };

    const typeLabels = {
        exam: { label: 'Exam', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
        deadline: { label: 'Deadline', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
        study: { label: 'Study', bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
        meeting: { label: 'Meeting', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full animate-pulse" />
            </div>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-600 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                            <CalendarIcon size={28} className="text-white" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Calendar</h1>
                    </div>
                    <p className="text-slate-400 max-w-lg font-medium">Track <span className="text-blue-400 font-bold">exams and study sessions</span>.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold"><Plus size={18} />Add Event</button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                <div className="lg:col-span-2 p-8 bg-[#0a0a0a] rounded-[2.5rem] border border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-3 hover:bg-white/10 rounded-2xl text-slate-400"><ChevronLeft size={20} /></button>
                        <h2 className="text-2xl font-black text-white uppercase">{months[month]} <span className="text-slate-500">{year}</span></h2>
                        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-3 hover:bg-white/10 rounded-2xl text-slate-400"><ChevronRight size={20} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-4">{days.map(d => <div key={d} className="text-center text-[10px] font-black text-slate-600 uppercase py-2">{d}</div>)}</div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="aspect-square" />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                            const dayEvents = events[day] || [];
                            return (
                                <motion.button key={day} onClick={() => setSelectedDay(day)} whileHover={{ scale: 1.05 }} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 ${isToday ? 'bg-blue-600 text-white' : selectedDay === day ? 'bg-white/10 ring-2 ring-violet-500' : 'hover:bg-white/5 text-slate-400'}`}>
                                    <span className="text-sm font-bold">{day}</span>
                                    {dayEvents.length > 0 && <div className="flex gap-0.5">{dayEvents.map((e, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${e.color}`} />)}</div>}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-6">
                    {selectedDay && events[selectedDay] && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/10 space-y-4">
                            <div className="flex items-center justify-between"><h3 className="text-lg font-black text-white">{months[month]} {selectedDay}</h3><button onClick={() => setSelectedDay(null)} className="p-2 hover:bg-white/10 rounded-xl text-slate-500"><X size={16} /></button></div>
                            {events[selectedDay].map(event => {
                                const t = typeLabels[event.type];
                                return (<div key={event.id} className={`p-4 rounded-2xl ${t.bg} border ${t.border} space-y-2`}><span className={`text-[10px] font-black uppercase ${t.text}`}>{t.label}</span><h4 className="text-sm font-bold text-white">{event.title}</h4><div className="flex items-center gap-2 text-slate-500"><Clock size={12} /><span className="text-xs">{event.time}</span></div></div>);
                            })}
                        </motion.div>
                    )}
                    <div className="p-6 bg-gradient-to-br from-violet-600/10 to-blue-600/10 rounded-3xl border border-violet-500/20">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">This Month</h3>
                        <div className="grid grid-cols-2 gap-4"><div className="text-center"><p className="text-3xl font-black text-white">2</p><p className="text-[10px] text-rose-400 font-bold uppercase">Exams</p></div><div className="text-center"><p className="text-3xl font-black text-white">2</p><p className="text-[10px] text-violet-400 font-bold uppercase">Study</p></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
