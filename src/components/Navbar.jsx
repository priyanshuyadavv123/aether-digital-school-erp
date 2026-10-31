import React, { useState } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { 
  GraduationCap, 
  Sun, 
  Moon, 
  ShieldCheck, 
  BookOpen, 
  UserCheck, 
  Users, 
  LogOut, 
  LogIn, 
  FileText, 
  Search, 
  RefreshCw,
  Sparkles,
  ChevronDown,
  Command
} from 'lucide-react';

export const Navbar = ({ onOpenCommandPalette }) => {
  const { 
    schoolConfig,
    theme, 
    toggleTheme, 
    currentUser, 
    activeTab, 
    setActiveTab, 
    loginAsRole, 
    logout, 
    resetAllDataToDefault,
    admissions
  } = useSchoolData();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const pendingAdmissionsCount = admissions.filter(a => a.status === 'Pending').length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            if (currentUser) {
              setActiveTab('dashboard');
            } else {
              setActiveTab('public');
            }
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {schoolConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold hidden md:inline-block">
                CBSE Portal
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              100% Paperless Digital ERP
            </p>
          </div>
        </div>

        {/* Global Cmd+K Search Trigger Pill */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all font-mono shadow-sm group"
          title="Search directory & actions (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-sans text-xs text-slate-300">Quick Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">⌘K</kbd>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('public')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'public'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Public Overview
          </button>
          
          <button
            onClick={() => setActiveTab('admission-form')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'admission-form'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Apply Online</span>
          </button>

          <button
            onClick={() => setActiveTab('application-tracker')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'application-tracker'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Track Status</span>
          </button>

          {currentUser && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentUser.role.toUpperCase()} Workspace</span>
              {currentUser.role === 'admin' && pendingAdmissionsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {pendingAdmissionsCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Section: 1-Click Fast Role Switcher & User Profile */}
        <div className="flex items-center gap-2">
          
          {/* 1-Click Fast Role Switcher Bar */}
          <div className="relative">
            <div className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 font-mono">
                Role:
              </span>
              <button
                onClick={() => loginAsRole('admin')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 active:scale-[0.98] ${
                  currentUser?.role === 'admin'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-cyan-300'
                }`}
                title="Switch to Principal Admin"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => loginAsRole('teacher')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 active:scale-[0.98] ${
                  currentUser?.role === 'teacher'
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-blue-300'
                }`}
                title="Switch to Science Teacher"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Teacher</span>
              </button>

              <button
                onClick={() => loginAsRole('student')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 active:scale-[0.98] ${
                  currentUser?.role === 'student'
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-indigo-300'
                }`}
                title="Switch to Student Aarav Sharma"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                onClick={() => loginAsRole('parent')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 active:scale-[0.98] ${
                  currentUser?.role === 'parent'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-emerald-300'
                }`}
                title="Switch to Parent Rajesh Sharma"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent</span>
              </button>
            </div>

            {/* Mobile/Tablet Role Switcher Dropdown */}
            <div className="xl:hidden">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-cyan-300 flex items-center gap-1"
              >
                <span>Roles</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-white/15 p-2 shadow-2xl z-50 flex flex-col gap-1">
                  <button
                    onClick={() => { loginAsRole('admin'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 hover:bg-cyan-500/20 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Desk
                  </button>
                  <button
                    onClick={() => { loginAsRole('teacher'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/20 flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Teacher Studio
                  </button>
                  <button
                    onClick={() => { loginAsRole('student'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-400 hover:bg-indigo-500/20 flex items-center gap-2"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Student Hub
                  </button>
                  <button
                    onClick={() => { loginAsRole('parent'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 flex items-center gap-2"
                  >
                    <Users className="w-3.5 h-3.5" /> Parent Portal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 border border-white/10 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Sleek Reset Demo State Button */}
          <button
            onClick={resetAllDataToDefault}
            className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400/50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
            title="Clear and restore factory demo data across all portals"
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Auth Actions / Profile */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-white/5 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-cyan-400/50 shadow-sm"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-slate-200 leading-none">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono uppercase mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 flex items-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-950" />
              <span>Login</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};