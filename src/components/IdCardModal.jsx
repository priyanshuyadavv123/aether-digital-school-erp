import React from 'react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  GraduationCap, 
  QrCode, 
  Sparkles, 
  Radio, 
  Droplet, 
  PhoneCall, 
  UserCheck 
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

export const IdCardModal = ({ user, onClose }) => {
  const { schoolConfig } = useSchoolData();

  if (!user) return null;

  const handlePrint = () => {
    window.print();
  };

  const isStudent = user.role === 'student';
  const isTeacher = user.role === 'teacher';
  const isAdmin = user.role === 'admin';
  const isParent = user.role === 'parent';

  const roleTitle = isStudent 
    ? 'STUDENT SCHOLAR' 
    : isTeacher 
    ? 'SENIOR FACULTY' 
    : isAdmin 
    ? 'EXECUTIVE ADMINISTRATOR' 
    : 'OFFICIAL GUARDIAN';

  const roleColor = isStudent
    ? 'from-cyan-500 to-blue-600'
    : isTeacher
    ? 'from-blue-600 to-indigo-600'
    : isAdmin
    ? 'from-amber-500 to-cyan-500'
    : 'from-emerald-500 to-teal-600';

  const badgeId = isStudent 
    ? `AETH-STU-${user.rollNumber || 'X-101'}`
    : isTeacher 
    ? `AETH-FAC-${user.id.slice(-3)}`
    : isAdmin
    ? `AETH-ADM-001`
    : `AETH-PAR-${user.id.slice(-3)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md my-8">
        
        {/* Modal Controls Bar (Hidden in Print) */}
        <div className="no-print flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Autonomous NFC / QR Smart Identity Badge</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Badge</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Glassmorphic Smart ID Badge */}
        <div className="printable-document relative rounded-3xl p-6 sm:p-7 glass-panel-glow border border-cyan-500/40 text-slate-100 shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950">
          
          {/* Card Ambient Glow Watermark */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-gradient-to-tr from-blue-500/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Lanyard Clip Slot Simulation */}
          <div className="mx-auto w-16 h-2 rounded-full bg-slate-800 border border-white/15 mb-4 shadow-inner" />

          {/* Academy Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-extrabold tracking-tight text-white leading-none uppercase">
                  {schoolConfig.name}
                </h3>
                <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-semibold mt-1 block">
                  {schoolConfig.board}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold">
              <Radio className="w-3 h-3 text-cyan-400" />
              <span>RFID Active</span>
            </div>
          </div>

          {/* Central Profile Area */}
          <div className="flex items-start gap-4 mb-5">
            {/* Photo Avatar with Holographic Border */}
            <div className="relative shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-28 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-slate-900 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest text-white uppercase bg-gradient-to-r ${roleColor} mb-1.5 shadow-sm`}>
                {roleTitle}
              </span>
              <h2 className="text-lg font-heading font-black text-white truncate leading-tight">
                {user.name}
              </h2>
              <p className="text-xs text-cyan-300 font-mono mt-0.5 truncate">
                {user.email}
              </p>

              {/* Department / Class */}
              <div className="mt-2 text-xs text-slate-300">
                {isStudent && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Class & Section:</span>
                    <strong className="text-white font-mono">{user.classId || 'Class X-A'}</strong>
                  </div>
                )}
                {isTeacher && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Faculty Dept:</span>
                    <strong className="text-white">{user.department}</strong>
                  </div>
                )}
                {isAdmin && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Executive Office:</span>
                    <strong className="text-white">{user.designation}</strong>
                  </div>
                )}
                {isParent && (
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Ward / Student:</span>
                    <strong className="text-white">{user.childName} ({user.childClass})</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Smart Chip & Key Details Ribbon */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-white/5 mb-5 text-[11px]">
            <div>
              <span className="text-[9px] uppercase text-slate-400 font-semibold block">ID Number</span>
              <strong className="font-mono text-cyan-300 text-xs">{badgeId}</strong>
            </div>

            <div>
              <span className="text-[9px] uppercase text-slate-400 font-semibold block">Blood Group</span>
              <strong className="text-rose-400 flex items-center gap-0.5 text-xs font-mono">
                <Droplet className="w-3 h-3 fill-rose-500/20" />
                <span>{user.bloodGroup || 'O+'}</span>
              </strong>
            </div>

            <div>
              <span className="text-[9px] uppercase text-slate-400 font-semibold block">Academic Session</span>
              <strong className="font-mono text-emerald-400 text-xs">{schoolConfig.session}</strong>
            </div>
          </div>

          {/* Dynamic Simulated Gate Entry QR Code */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 flex items-center justify-between gap-3">
            <div className="text-left flex-1">
              <span className="text-[10px] font-black uppercase text-cyan-300 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Campus Turnstile Pass</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                Scan at campus gate sensors for automatic paperless attendance logging.
              </p>
              <span className="text-[9px] font-mono text-slate-500 mt-1 block">
                AUTH-SHA: 7a8f9c2d1e0b...
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white shadow-lg shrink-0">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-slate-950">
                <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="4" y="4" width="3" height="3" fill="currentColor"/>
                <rect x="15" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="17" y="4" width="3" height="3" fill="currentColor"/>
                <rect x="2" y="15" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="4" y="17" width="3" height="3" fill="currentColor"/>
                <rect x="11" y="4" width="2" height="2" fill="currentColor"/>
                <rect x="11" y="8" width="2" height="2" fill="currentColor"/>
                <rect x="8" y="11" width="2" height="2" fill="currentColor"/>
                <rect x="14" y="11" width="2" height="2" fill="currentColor"/>
                <rect x="11" y="14" width="2" height="2" fill="currentColor"/>
                <rect x="15" y="15" width="3" height="2" fill="currentColor"/>
                <rect x="19" y="18" width="2" height="3" fill="currentColor"/>
                <rect x="15" y="19" width="2" height="2" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Footer Emergency Call */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              <span className="font-mono">Campus SOS: {schoolConfig.phone}</span>
            </span>
            <span className="font-mono text-[9px] text-slate-500">
              SEC-ID: #{user.id}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};