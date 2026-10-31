import React from 'react';
import { motion } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Leaf, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Calculator,
  QrCode,
  Layers,
  MapPin,
  Calendar
} from 'lucide-react';
import { FeeCalculator } from '../components/FeeCalculator';

export const PublicLanding = () => {
  const { setActiveTab, loginAsRole, notices, classes, users, schoolConfig } = useSchoolData();

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;

  return (
    <div className="space-y-16 pb-20 bg-dot-matrix">
      
      {/* Editorial Hero Section with Bento Accents */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-14 sm:pb-16 border-b border-white/[0.08]">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent blur-[130px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{schoolConfig.board}</span>
            <span className="text-slate-400 font-mono">• Affiliation #{schoolConfig.affiliationNo}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            The 100% Paperless{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Smart School Operating System.
            </span>
          </h1>

          {/* Tagline */}
          <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {schoolConfig.tagline}. A unified digital ecosystem connecting Principals, Educators, CBSE Scholars, and Parents with instant transparency.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveTab('admission-form')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Apply for Paperless Admission</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('application-tracker')}
              className="px-6 py-3 rounded-xl bg-slate-900/80 text-white font-semibold text-xs border border-white/10 hover:border-cyan-400/50 hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Track Application Verification</span>
            </button>
          </div>

          {/* High-Craft Bento Stats Ribbon */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md text-left">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Paper Reduction</span>
              <span className="text-2xl font-mono font-bold text-cyan-400 mt-0.5 block">100%</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Zero physical documents</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md text-left">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">State Sync Latency</span>
              <span className="text-2xl font-mono font-bold text-blue-400 mt-0.5 block">0 ms</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Cross-tab storage hooks</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md text-left">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Security Layer</span>
              <span className="text-2xl font-mono font-bold text-emerald-400 mt-0.5 block">256-Bit</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Cryptographic report cards</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md text-left">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">CBSE Academic Standing</span>
              <span className="text-2xl font-mono font-bold text-indigo-400 mt-0.5 block">98.4%</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Board distinctions</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4-Role Instant Exploration Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/[0.08] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant 1-Click Interactive Testbed</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                Explore All 4 Enterprise Portals Seamlessly
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              No registration or setup needed. Click any portal card to simulate the live experience of school stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* Admin Card */}
            <div 
              onClick={() => loginAsRole('admin')}
              className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] hover:border-cyan-500/40 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white flex items-center justify-between font-heading">
                <span>Principal Office</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Admissions approval queue, faculty directory, white-label branding, and institutional fee ledger.
              </p>
              <div className="mt-3 text-[10px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                <span>Dr. R.K. Verma</span>
                <span>• Principal</span>
              </div>
            </div>

            {/* Teacher Card */}
            <div 
              onClick={() => loginAsRole('teacher')}
              className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] hover:border-blue-500/40 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white flex items-center justify-between font-heading">
                <span>Faculty & LMS Studio</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                1-click bulk attendance marker, homework evaluations, online quiz arena, and digital report card publishing.
              </p>
              <div className="mt-3 text-[10px] font-mono text-blue-400 font-semibold flex items-center gap-1">
                <span>Dr. Priya Nair</span>
                <span>• Head of Sciences</span>
              </div>
            </div>

            {/* Student Card */}
            <div 
              onClick={() => loginAsRole('student')}
              className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] hover:border-indigo-500/40 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white flex items-center justify-between font-heading">
                <span>Student Arena</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Submit coursework digitally, take timed MCQ quizzes, and inspect official printable report cards.
              </p>
              <div className="mt-3 text-[10px] font-mono text-indigo-400 font-semibold flex items-center gap-1">
                <span>Aarav Sharma</span>
                <span>• Class X-A</span>
              </div>
            </div>

            {/* Parent Card */}
            <div 
              onClick={() => loginAsRole('parent')}
              className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] hover:border-emerald-500/40 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white flex items-center justify-between font-heading">
                <span>Parent Portal</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Live child attendance logs, interactive UPI fee payments, paperless leave desk, and teacher remarks.
              </p>
              <div className="mt-3 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span>Rajesh Sharma</span>
                <span>• Guardian</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Fee & Scholarship Calculator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeCalculator />
      </section>

      {/* Academic Programs & Curricula Bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Future-Proof CBSE Learning Streams
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Fully digitized coursework designed to foster analytical depth, algorithmic reasoning, and scientific inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">STEM & AI Intelligence</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Electromagnetic Induction, Differential Calculus, Python Data Structures, and hands-on robotics workshops in FabLab.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300 border-t border-white/5 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 
                <span>Simulated Cloud Science Labs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 
                <span>Automated Python Code Evaluator</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-blue-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">CBSE Honors & Pre-Engineering</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Targeted preparation for national competitions, rigorous physics derivations, and inter-school academic symposiums.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300 border-t border-white/5 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 
                <span>Digital Seminar Submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 
                <span>Peer-Reviewed Project Portfolios</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">Commerce & Computational Design</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Financial Accountancy, Business Informatics, Design Thinking, and algorithmic statistics modeling.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300 border-t border-white/5 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 
                <span>Paperless Digital Portfolios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 
                <span>Instant Exhibition Verification</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Official Circulars & Notice Board Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Official Circulars
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                Live School Announcements & Board Orders
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('login')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Access Internal Portals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                    notice.priority === 'urgent'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : notice.priority === 'high'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{notice.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 font-heading">{notice.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {notice.content}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2">
                  <span>Author: {notice.author}</span>
                  <span className="text-cyan-400 font-mono">Target: {notice.targetAudience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-slate-900/90 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
            Experience the 100% Paperless Standard
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mt-3">
            Submit your child's online application today or launch any role workspace with 1 click.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveTab('admission-form')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Start Online Admission</span>
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs border border-white/20 hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Switch to Institutional Login</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};