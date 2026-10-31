import React from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useSchoolData();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
  };

  const bgStyles = {
    success: 'border-emerald-500/30 bg-slate-900/90 text-emerald-200 shadow-emerald-500/10',
    error: 'border-rose-500/30 bg-slate-900/90 text-rose-200 shadow-rose-500/10',
    info: 'border-cyan-500/30 bg-slate-900/90 text-cyan-200 shadow-cyan-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${bgStyles[toast.type] || bgStyles.info}`}>
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
};
