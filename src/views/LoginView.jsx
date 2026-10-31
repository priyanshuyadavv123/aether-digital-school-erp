import React, { useState } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Users, 
  LogIn, 
  KeyRound, 
  Mail, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LoginView = () => {
  const { loginAsRole, loginWithCredentials, setActiveTab, schoolConfig } = useSchoolData();
  const [activeMode, setActiveMode] = useState('demo'); // 'demo' | 'credentials'
  const [email, setEmail] = useState('teacher@strobert.edu');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginWithCredentials(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/20">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white uppercase tracking-tight">
          {schoolConfig.name}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {schoolConfig.board} • 100% Paperless Cloud ERP & LMS
        </p>

        {/* Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 mt-6 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('demo')}
            className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-[0.98] ${
              activeMode === 'demo'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Fast Demo Login</span>
          </button>
          <button
            onClick={() => setActiveMode('credentials')}
            className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-[0.98] ${
              activeMode === 'credentials'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Email & Password</span>
          </button>
        </div>
      </div>

      {/* Mode 1: 1-Click Fast Role Selection */}
      {activeMode === 'demo' ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Instant Architecture Sandbox
            </span>
            <h2 className="text-lg font-heading font-bold text-white mt-1">
              Select a Role to Enter Instantly
            </h2>
            <p className="text-xs text-slate-400">
              Pre-seeded with CBSE scholars, teachers, sections, and marks. Zero configuration required.
            </p>
          </div>

          <div className="space-y-3">
            
            {/* Admin */}
            <div
              onClick={() => loginAsRole('admin')}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-heading">Principal Office</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      Dr. R.K. Verma
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Admission approvals, faculty directory, branding engine, and fee ledger.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
            </div>

            {/* Teacher */}
            <div
              onClick={() => loginAsRole('teacher')}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-blue-400/50 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-heading">Teacher Studio</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                      Dr. Priya Nair
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    1-click attendance, post & grade assignments, online test builder, report cards.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
            </div>

            {/* Student */}
            <div
              onClick={() => loginAsRole('student')}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-indigo-400/50 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-heading">Student Arena</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      Aarav Sharma (Class X-A)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Digital homework submitter, interactive test arena, official printable report card.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0 ml-2" />
            </div>

            {/* Parent */}
            <div
              onClick={() => loginAsRole('parent')}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-heading">Parent Portal</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      Rajesh Sharma (Ward: Aarav)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Child attendance log, interactive UPI checkout, test grades, and digital receipts.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
            </div>

          </div>
        </div>
      ) : (
        /* Mode 2: Standard Credentials Login */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">
                Registered Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">
                Portal Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Quick Fill Credentials Pills */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-medium font-mono uppercase tracking-wider">
                Quick Credentials Fill:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setEmail('admin@strobert.edu')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-cyan-300 hover:bg-slate-700 active:scale-[0.98]"
                >
                  admin@strobert.edu
                </button>
                <button
                  type="button"
                  onClick={() => setEmail('teacher@strobert.edu')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-blue-300 hover:bg-slate-700 active:scale-[0.98]"
                >
                  teacher@strobert.edu
                </button>
                <button
                  type="button"
                  onClick={() => setEmail('student@strobert.edu')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-indigo-300 hover:bg-slate-700 active:scale-[0.98]"
                >
                  student@strobert.edu
                </button>
                <button
                  type="button"
                  onClick={() => setEmail('parent@strobert.edu')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-emerald-300 hover:bg-slate-700 active:scale-[0.98]"
                >
                  parent@strobert.edu
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:brightness-110 flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4 text-slate-950" />
              <span>Authenticate Portal Session</span>
            </button>
          </form>
        </div>
      )}

      {/* Public Admission link */}
      <div className="text-center mt-6">
        <button
          onClick={() => setActiveTab('admission-form')}
          className="text-xs text-slate-400 hover:text-cyan-400 font-medium transition-colors"
        >
          New Student? Fill out Paperless Online Admission Form →
        </button>
      </div>

    </div>
  );
};