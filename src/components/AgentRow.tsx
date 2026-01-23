import { Loader2, CheckCircle2, Circle } from "lucide-react";

export default function AgentRow({ name, status, action }: { name: string, status: string, action: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
                {/* Status Icon */}
                {status === 'active' && <Loader2 className="animate-spin text-cyan-400" size={14} />}
                {status === 'indexing' && <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />}
                {status === 'idle' && <Circle className="text-white/20" size={14} />}

                <span className="text-[10px] font-black tracking-widest text-white/80 uppercase">{name}</span>
            </div>
            <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{action}</span>
        </div>
    );
}