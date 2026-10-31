import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Bus, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Receipt,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';
import { formatINR } from '../utils/formatters';

const GRADE_LEVELS = [
  { id: 'primary', label: 'Primary (Nursery - V)', baseMonthly: 5500, smartLab: 800 },
  { id: 'middle', label: 'Middle School (VI - VIII)', baseMonthly: 7200, smartLab: 1200 },
  { id: 'secondary', label: 'Secondary (IX - X CBSE)', baseMonthly: 9500, smartLab: 1800 },
  { id: 'senior', label: 'Senior Secondary (XI - XII)', baseMonthly: 12000, smartLab: 2500 }
];

const STREAMS = [
  { id: 'stem', label: 'STEM & AI / Pre-Eng', surcharge: 1500 },
  { id: 'medical', label: 'Pre-Medical (NEET Prep)', surcharge: 1500 },
  { id: 'commerce', label: 'Commerce & Analytics', surcharge: 600 },
  { id: 'humanities', label: 'Humanities & Design', surcharge: 400 }
];

const TRANSPORT_SLABS = [
  { id: 'none', label: 'Self Commute / No Bus', fee: 0 },
  { id: 'near', label: '0 - 5 km (Radius A)', fee: 2200 },
  { id: 'mid', label: '5 - 12 km (Radius B)', fee: 3400 },
  { id: 'far', label: '12+ km (Express Zone)', fee: 4600 }
];

const SCHOLARSHIP_TIERS = [
  { percent: 0, label: 'Standard Fee (0%)' },
  { percent: 10, label: 'Sibling / Armed Forces (10%)' },
  { percent: 25, label: 'CBSE Olympiad Merit (25%)' },
  { percent: 50, label: 'National Ranker (50%)' },
  { percent: 100, label: 'Dr. Kalam EWS Fellowship (100%)' }
];

export const FeeCalculator = () => {
  const { setActiveTab } = useSchoolData();

  const [selectedGrade, setSelectedGrade] = useState('secondary');
  const [selectedStream, setSelectedStream] = useState('stem');
  const [selectedTransport, setSelectedTransport] = useState('mid');
  const [scholarshipPercent, setScholarshipPercent] = useState(25);

  const breakdown = useMemo(() => {
    const gradeObj = GRADE_LEVELS.find(g => g.id === selectedGrade) || GRADE_LEVELS[2];
    const streamObj = STREAMS.find(s => s.id === selectedStream) || STREAMS[0];
    const transportObj = TRANSPORT_SLABS.find(t => t.id === selectedTransport) || TRANSPORT_SLABS[2];

    const streamFee = selectedGrade === 'senior' ? streamObj.surcharge : 0;
    const grossTuition = gradeObj.baseMonthly + streamFee;
    const discountAmount = Math.round((grossTuition * scholarshipPercent) / 100);
    const netTuition = grossTuition - discountAmount;

    const monthlyTotal = netTuition + gradeObj.smartLab + transportObj.fee;
    const annualTotal = monthlyTotal * 12;

    return {
      gradeLabel: gradeObj.label,
      baseMonthly: gradeObj.baseMonthly,
      smartLab: gradeObj.smartLab,
      streamFee,
      transportFee: transportObj.fee,
      discountAmount,
      monthlyTotal,
      annualTotal
    };
  }, [selectedGrade, selectedStream, selectedTransport, scholarshipPercent]);

  return (
    <div className="relative bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Fee & Scholarship Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
            Transparent, Zero-Hidden-Charge Academic Fee Structure
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Simulate monthly and annual CBSE tuition, transport slabs, and merit scholarship deductions in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-950/60 border border-white/10 px-3.5 py-2 rounded-xl text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>NEP 2020 Compliant Pricing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Grade Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              1. Select Academic Class / Grade Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GRADE_LEVELS.map(g => {
                const isSelected = selectedGrade === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGrade(g.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10' 
                        : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium text-xs text-white">{g.label}</div>
                    <div className="text-[11px] font-mono text-cyan-400/90 mt-1">
                      Base: {formatINR(g.baseMonthly)} / mo
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Stream (if Senior Secondary) */}
          {selectedGrade === 'senior' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                2. Senior Secondary Specialized Academic Stream
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STREAMS.map(s => {
                  const isSelected = selectedStream === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedStream(s.id)}
                      className={`p-2.5 rounded-xl text-center border text-xs transition-all ${
                        isSelected 
                          ? 'bg-blue-500/20 border-blue-500/50 text-white' 
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-medium truncate">{s.label}</div>
                      <div className="text-[10px] font-mono text-blue-400 mt-0.5">+{formatINR(s.surcharge)}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Transport Distance */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>{selectedGrade === 'senior' ? '3' : '2'}. GPS-Tracked Campus Transit & Bus Distance</span>
              <span className="text-[11px] text-cyan-400 font-mono flex items-center gap-1">
                <Bus className="w-3.5 h-3.5" />
                AC Electric Fleets
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TRANSPORT_SLABS.map(t => {
                const isSelected = selectedTransport === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTransport(t.id)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-white' 
                        : 'bg-slate-950/40 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium truncate text-white">{t.label}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {t.fee === 0 ? 'Free' : formatINR(t.fee)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Merit Scholarship Tier */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>{selectedGrade === 'senior' ? '4' : '3'}. Merit & Talent Scholarship Concession</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {scholarshipPercent}% Concession Active
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SCHOLARSHIP_TIERS.map(tier => {
                const isSelected = scholarshipPercent === tier.percent;
                return (
                  <button
                    key={tier.percent}
                    type="button"
                    onClick={() => setScholarshipPercent(tier.percent)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all font-medium ${
                      isSelected 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10' 
                        : 'bg-slate-950/40 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Animated Fee Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/80 border border-white/15 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Net Quotation
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                INR (₹) Breakdown
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Tuition ({breakdown.gradeLabel}):</span>
                <span className="font-mono text-white">{formatINR(breakdown.baseMonthly)}</span>
              </div>

              {breakdown.streamFee > 0 && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Stream Specialization:</span>
                  <span className="font-mono text-blue-400">+{formatINR(breakdown.streamFee)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-300">
                <span>Smart Lab & Cloud LMS Kit:</span>
                <span className="font-mono text-white">{formatINR(breakdown.smartLab)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Campus Electric Transit:</span>
                <span className="font-mono text-white">
                  {breakdown.transportFee === 0 ? '₹0 (Self)' : formatINR(breakdown.transportFee)}
                </span>
              </div>

              {breakdown.discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Scholarship Grant ({scholarshipPercent}%):</span>
                  </span>
                  <span className="font-mono font-bold">-{formatINR(breakdown.discountAmount)}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4">
                <div className="text-[11px] text-slate-400 font-medium">Estimated Net Monthly Outlay:</div>
                <div className="text-3xl font-mono font-black text-cyan-400 tracking-tight mt-0.5">
                  {formatINR(breakdown.monthlyTotal)}
                  <span className="text-xs font-normal text-slate-400 ml-1.5">/ month</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>Annualized Academic Year:</span>
                  <span className="text-white font-bold">{formatINR(breakdown.annualTotal)} / yr</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('admission-form')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
            >
              <span>Apply for Paperless Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Instant digital verification • Zero physical registration paper forms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};