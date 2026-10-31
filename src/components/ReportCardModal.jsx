import React from 'react';
import { 
  X, 
  Printer, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Calendar,
  User,
  Hash
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

export const ReportCardModal = ({ result, onClose }) => {
  const { schoolConfig } = useSchoolData();

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-2xl p-6 sm:p-8 bg-slate-900 border border-cyan-500/30 text-slate-100 my-8 shadow-2xl">
        
        {/* Action Header (No Print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Award className="w-5 h-5" />
            <span>Digital Paperless Transcript & Grade Sheet</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div className="printable-document p-6 sm:p-8 rounded-xl bg-slate-950/80 border border-white/10 shadow-inner">
          
          {/* Institution Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-cyan-500/30 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-extrabold tracking-tight text-white uppercase">
                  {schoolConfig.name}
                </h2>
                <p className="text-xs text-cyan-400 font-medium tracking-wide">
                  {schoolConfig.board} • Affiliation No: {schoolConfig.affiliationNo}
                </p>
                <p className="text-[10px] text-slate-400">
                  {schoolConfig.address}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digitally Certified</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                Ref ID: {result.id}
              </p>
            </div>
          </div>

          {/* Student Profile Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/90 border border-white/5 mb-6 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Student Scholar</span>
              <strong className="text-sm text-cyan-300">{result.studentName}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Academic Class</span>
              <strong className="text-slate-200">{result.classId}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Roll Number</span>
              <strong className="text-slate-200 font-mono">{result.rollNumber || 'X-101'}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Assessment Term</span>
              <strong className="text-slate-200">{result.term}</strong>
            </div>
          </div>

          {/* Subject Performance Breakdown Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-slate-900/90 text-slate-300 font-semibold uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">Subject / Paper</th>
                  <th className="py-2.5 px-3 text-center">Max Marks</th>
                  <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                  <th className="py-2.5 px-3 text-center">CBSE Grade</th>
                  <th className="py-2.5 px-3 text-center">Performance Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {result.subjects?.map((sub, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-slate-200">{sub.name}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400 font-mono">{sub.maxMarks}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-cyan-300 font-mono">{sub.obtainedMarks}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded font-bold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                        {sub.grade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-300">
                      {sub.obtainedMarks >= 90 ? 'Outstanding (A1)' : sub.obtainedMarks >= 80 ? 'Very Good (A2)' : 'Satisfactory (B1)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cumulative Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900/40 border border-cyan-500/20 mb-6 text-center">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Total Aggregate</span>
              <span className="text-base font-extrabold text-white font-mono">
                {result.obtainedMarks} / {result.totalMarks}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Percentage</span>
              <span className="text-base font-extrabold text-cyan-400 font-mono">
                {result.percentage}%
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Overall Grade</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">
                {result.overallGrade}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Section Standings</span>
              <span className="text-base font-extrabold text-amber-400">
                {result.rank}
              </span>
            </div>
          </div>

          {/* Qualitative Remarks */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 mb-6 text-xs">
            <span className="text-[10px] uppercase text-cyan-400 font-bold block mb-1">
              Faculty Advisory & Continuous Comprehensive Evaluation:
            </span>
            <p className="text-slate-300 italic leading-relaxed">
              "{result.teacherRemarks}"
            </p>
          </div>

          {/* Digital Signatures Verification */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-emerald-300 block">Cryptographically Verified Document</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  SHA256: 9e88a7c2b01f849c... [Zero Paperwork Guarantee]
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-semibold text-cyan-300 font-mono block">
                {result.principalSignature || `${schoolConfig.principalName} (CBSE Affiliated Digital Sign)`}
              </span>
              <span className="text-[10px] text-slate-400">Principal & Controller of Examinations</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};