import { Loader2, CheckCircle2, Circle } from "lucide-react";

export default function AgentRow({ name, status, action }: { name: string, status: string, action: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
                {/* Status Icon */}
                {status === 'active' && <Loader2 className="animate-spin text-amber-400" size={14} />}
                {status === 'indexing' && <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                {status === 'idle' && <Circle className="text-slate-600" size={14} />}

                <span className="text-xs font-bold text-slate-200">{name}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">{action}</span>
        </div>
    );
}