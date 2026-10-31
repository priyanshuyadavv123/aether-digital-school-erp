import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Command, 
  ArrowRight, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  Calendar, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  Moon, 
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

export const CommandPalette = ({ isOpen, onClose, onOpenIdCard, onOpenReportCard, onOpenReceipt }) => {
  const { 
    setActiveTab, 
    currentUser, 
    loginAsRole, 
    users, 
    fees, 
    leaves, 
    toggleTheme, 
    theme, 
    resetAllDataToDefault,
    schoolConfig
  } = useSchoolData();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Construct quick action list
  const defaultActions = [
    {
      id: 'nav-public',
      title: 'Academy Homepage & Overview',
      subtitle: `${schoolConfig.name} landing, curriculum, and admissions`,
      category: 'Navigation',
      icon: GraduationCap,
      action: () => { setActiveTab('public'); onClose(); }
    },
    {
      id: 'nav-admission-form',
      title: 'Paperless Digital Admission Portal',
      subtitle: 'Apply for admission, upload verification documents',
      category: 'Navigation',
      icon: FileText,
      action: () => { setActiveTab('admission-form'); onClose(); }
    },
    {
      id: 'nav-tracker',
      title: 'Track Admission Application',
      subtitle: 'Check real-time application verification status',
      category: 'Navigation',
      icon: Clock,
      action: () => { setActiveTab('application-tracker'); onClose(); }
    },
    {
      id: 'role-admin',
      title: 'Switch to Principal / Admin Desk',
      subtitle: 'Admissions queue, fee ledger, institutional settings',
      category: 'Quick Role Sandbox',
      icon: ShieldCheck,
      action: () => { loginAsRole('admin'); onClose(); }
    },
    {
      id: 'role-teacher',
      title: 'Switch to Faculty & LMS Studio',
      subtitle: 'Attendance marker, assignments, test authoring',
      category: 'Quick Role Sandbox',
      icon: BookOpen,
      action: () => { loginAsRole('teacher'); onClose(); }
    },
    {
      id: 'role-student',
      title: 'Switch to Student Learning Arena',
      subtitle: 'Aarav Sharma (Class X-A, Roll X-101)',
      category: 'Quick Role Sandbox',
      icon: User,
      action: () => { loginAsRole('student'); onClose(); }
    },
    {
      id: 'role-parent',
      title: 'Switch to Parent Transparency Hub',
      subtitle: 'Rajesh Sharma (Ward: Aarav Sharma)',
      category: 'Quick Role Sandbox',
      icon: User,
      action: () => { loginAsRole('parent'); onClose(); }
    },
    {
      id: 'action-theme',
      title: `Switch Theme (${theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'})`,
      subtitle: 'Toggle between cyber dark and clean high-contrast light',
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => { toggleTheme(); onClose(); }
    },
    {
      id: 'action-reset',
      title: 'Reset Demo State (Factory Pristine)',
      subtitle: 'Clear local modifications and re-seed Indian school database',
      category: 'System',
      icon: RotateCcw,
      action: () => { resetAllDataToDefault(); onClose(); }
    }
  ];

  // Dynamic user records
  const userActions = users.map(u => ({
    id: `user-${u.id}`,
    title: `${u.name} (${u.role.toUpperCase()})`,
    subtitle: u.role === 'student' 
      ? `Roll: ${u.rollNumber} | Class: ${u.classId}` 
      : (u.designation || u.email),
    category: 'Institutional Directory',
    icon: User,
    action: () => {
      if (u.role === 'admin') loginAsRole('admin');
      else if (u.role === 'teacher') loginAsRole('teacher');
      else if (u.role === 'student') loginAsRole('student');
      else if (u.role === 'parent') loginAsRole('parent');
      onClose();
    }
  }));

  // Dynamic fee invoices
  const feeActions = fees.map(f => ({
    id: `fee-${f.id}`,
    title: `Fee Invoice ${f.invoiceNumber} - ${f.studentName}`,
    subtitle: `${f.term} | ₹${f.amount?.toLocaleString('en-IN')} | Status: ${f.status}`,
    category: 'Fee & Invoices',
    icon: CreditCard,
    action: () => {
      loginAsRole('parent');
      onClose();
    }
  }));

  const allItems = [...defaultActions, ...userActions, ...feeActions];

  const filteredItems = query.trim() === ''
    ? defaultActions
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Top Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-slate-950/60">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input 
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search students, faculty, fee invoices, portals, or actions..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <div className="flex items-center gap-1 shrink-0 text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              <span>ESC</span>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No matching records or actions found for "{query}".
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-white' 
                        : 'text-slate-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'bg-cyan-500 text-slate-950' 
                          : 'bg-white/5 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate text-white">{item.title}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↵</kbd>
                <span className="ml-1">Execute</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aether Spotlight</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};