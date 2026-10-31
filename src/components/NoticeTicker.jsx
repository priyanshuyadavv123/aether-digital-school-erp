import React from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { Megaphone, AlertCircle, Sparkles } from 'lucide-react';

export const NoticeTicker = () => {
  const { notices } = useSchoolData();

  // Filter urgent or recent notices
  const urgentNotices = notices.filter(n => n.priority === 'urgent' || n.priority === 'high');
  const displayNotices = urgentNotices.length > 0 ? urgentNotices : notices;

  if (!displayNotices || displayNotices.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-blue-950/70 to-slate-950 border-b border-cyan-500/20 py-2 px-4 overflow-hidden relative text-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-semibold uppercase tracking-wider shrink-0 text-[10px] animate-pulse">
          <Megaphone className="w-3 h-3 text-cyan-400" />
          <span>Live Ticker</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap relative flex-1">
          <div className="inline-flex gap-8 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {displayNotices.concat(displayNotices).map((notice, i) => (
              <span key={`${notice.id}-${i}`} className="inline-flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
                <strong className="text-cyan-200">{notice.title}:</strong>
                <span className="text-slate-400 max-w-xl truncate">{notice.content}</span>
                <span className="text-[10px] text-slate-500 font-mono">[{notice.date}]</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 text-[11px] text-cyan-400/80 shrink-0 font-medium">
          <Sparkles className="w-3 h-3" />
          <span>100% Paperless Verified</span>
        </div>
      </div>
    </div>
  );
};
