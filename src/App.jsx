import React, { useState, useEffect } from 'react';
import { SchoolDataProvider, useSchoolData } from './context/SchoolDataContext';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { Toast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';
import { PublicLanding } from './views/PublicLanding';
import { AdmissionForm } from './views/AdmissionForm';
import { ApplicationTracker } from './views/ApplicationTracker';
import { LoginView } from './views/LoginView';
import { AdminDashboard } from './views/AdminDashboard';
import { TeacherDashboard } from './views/TeacherDashboard';
import { StudentDashboard } from './views/StudentDashboard';
import { ParentDashboard } from './views/ParentDashboard';
import { GraduationCap, ShieldCheck, Leaf, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

const AppContent = () => {
  const { activeTab, setActiveTab, currentUser, loginAsRole, schoolConfig } = useSchoolData();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'admission-form':
        return <AdmissionForm />;
      case 'application-tracker':
        return <ApplicationTracker />;
      case 'login':
        return <LoginView />;
      case 'dashboard':
        if (!currentUser) return <LoginView />;
        if (currentUser.role === 'admin') return <AdminDashboard />;
        if (currentUser.role === 'teacher') return <TeacherDashboard />;
        if (currentUser.role === 'student') return <StudentDashboard />;
        if (currentUser.role === 'parent') return <ParentDashboard />;
        return <PublicLanding />;
      case 'public':
      default:
        return <PublicLanding />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-800 transition-colors duration-300 font-sans">
      
      {/* Top Urgent Notice Ticker */}
      <NoticeTicker />

      {/* Main Glassmorphic Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Dynamic Main Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        {renderActiveView()}
      </main>

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* Modern Glassmorphic Footer */}
      <footer className="no-print mt-auto border-t border-white/[0.08] glass-panel py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand & Philosophy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-extrabold text-base tracking-tight text-white uppercase">
                  {schoolConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {schoolConfig.tagline}. A 100% paperless cloud campus providing zero-friction administration, instant academic transparency, and modern learning infrastructure.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold font-mono">
                <Leaf className="w-3.5 h-3.5" />
                <span>Zero Physical Paperwork Protocol</span>
              </div>
            </div>

            {/* Col 2: Public Navigation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Public Portals
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveTab('public')}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Academy Homepage
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('admission-form')}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Paperless Online Admission
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('application-tracker')}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Track Application Status
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Institutional Sign-In
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: 1-Click Fast Sandbox */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Instant Role Sandbox
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => loginAsRole('admin')}
                    className="hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>Principal Admin Desk</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => loginAsRole('teacher')}
                    className="hover:text-blue-400 flex items-center gap-1"
                  >
                    <span>Faculty & LMS Studio</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => loginAsRole('student')}
                    className="hover:text-indigo-400 flex items-center gap-1"
                  >
                    <span>Student Learning Arena</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => loginAsRole('parent')}
                    className="hover:text-emerald-400 flex items-center gap-1"
                  >
                    <span>Parent Transparency Portal</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Digital Verification */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Security & Standards
              </h4>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">Verified 256-Bit Ledger</span>
                </div>
                <p className="text-[11px]">
                  All admission documents, fee receipts, and term report cards are issued with electronic cryptographic certificates.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-white/5">
                  Affiliation: {schoolConfig.board} (#{schoolConfig.affiliationNo})
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p className="font-mono">© 2026 {schoolConfig.name}. All rights reserved. 100% Paperless Cloud ERP.</p>
            <p className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Engineered for Paperless Educational Excellence</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Global Toast Alerts */}
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <SchoolDataProvider>
      <AppContent />
    </SchoolDataProvider>
  );
}