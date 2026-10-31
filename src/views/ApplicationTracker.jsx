import React, { useState } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Users 
} from 'lucide-react';

export const ApplicationTracker = () => {
  const { admissions, setActiveTab, loginAsRole, loginWithCredentials } = useSchoolData();
  const [searchId, setSearchId] = useState('APP-9842');
  const [searchedRecord, setSearchedRecord] = useState(() => {
    return admissions.find(a => a.trackingId === 'APP-9842') || admissions[0];
  });

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = admissions.find(a => a.trackingId.toUpperCase() === query || a.id.toUpperCase() === query);
    setSearchedRecord(found || null);
  };

  const handleSelectQuickId = (trackingId) => {
    setSearchId(trackingId);
    const found = admissions.find(a => a.trackingId === trackingId);
    setSearchedRecord(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1">
          Real-Time Intake Ledger
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Track Admission Application
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Enter your Application Tracking ID to inspect real-time digital document verification, admissions board reviews, and student credentials.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2 max-w-xl mx-auto p-2 rounded-2xl glass-panel-glow border border-cyan-500/30">
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g. APP-9842, APP-5120)"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-transparent text-sm text-white focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 flex items-center gap-1.5 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Quick Test Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
        <span className="text-slate-400">Quick Test Samples:</span>
        {admissions.slice(0, 4).map(adm => (
          <button
            key={adm.id}
            type="button"
            onClick={() => handleSelectQuickId(adm.trackingId)}
            className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
              searchedRecord?.trackingId === adm.trackingId
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20'
            }`}
          >
            {adm.trackingId} ({adm.status})
          </button>
        ))}
      </div>

      {/* Result Card */}
      {searchedRecord ? (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl animate-fade-in">
          
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white font-mono">{searchedRecord.trackingId}</span>
                <span className="text-xs text-slate-400">({searchedRecord.id})</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Submitted on {new Date(searchedRecord.submittedAt).toLocaleDateString()} at {new Date(searchedRecord.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Dynamic Status Badge */}
            <div>
              {searchedRecord.status === 'Approved' ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Admission Approved & Enrolled</span>
                </div>
              ) : searchedRecord.status === 'Rejected' ? (
                <div className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/10">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Application Declined</span>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/10 animate-pulse">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Under Administrative Verification</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Applicant</span>
              <strong className="text-sm text-cyan-300">{searchedRecord.studentName}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Grade Applied</span>
              <strong className="text-sm text-slate-200">{searchedRecord.gradeApplied}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Parent / Guardian</span>
              <strong className="text-sm text-slate-200">{searchedRecord.parentName}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Prior Academic GPA</span>
              <strong className="text-sm text-emerald-400">{searchedRecord.previousGpa || 'N/A'}</strong>
            </div>
          </div>

          {/* Paperless Document Checklist */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 mb-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Digital Document Verification Audit</span>
            </h4>
            <div className="space-y-2">
              {searchedRecord.verifiedDocuments?.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-white/5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-medium text-slate-200">{doc.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({doc.file})</span>
                  </div>
                  <div>
                    {doc.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                        <Clock className="w-3.5 h-3.5" /> Pending Check
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Administrative Remarks */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 mb-6 text-xs">
            <span className="text-[10px] uppercase text-cyan-400 font-bold block mb-1">
              Admissions Board Decision Notes:
            </span>
            <p className="text-slate-300 italic">
              "{searchedRecord.adminNotes || 'Under initial review by Office of the Registrar.'}"
            </p>
          </div>

          {/* If Approved: Generated Credentials & Fast Login */}
          {searchedRecord.status === 'Approved' && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-slate-900/60 border border-emerald-500/30 mb-6">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Student Enrolled & Institutional Digital Accounts Active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Generated Student ID</span>
                  <span className="font-mono text-cyan-300 font-bold">{searchedRecord.generatedStudentId || 'USR-STU-099'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Assigned Section & Roll</span>
                  <span className="font-mono text-emerald-300 font-bold">{searchedRecord.gradeApplied} (Roll: {searchedRecord.generatedRoll || 'A-108'})</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Parent Portal Link</span>
                  <span className="font-mono text-indigo-300 font-bold">{searchedRecord.parentEmail}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => loginAsRole('student')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Launch Student Portal Demo</span>
                </button>
                <button
                  onClick={() => loginAsRole('parent')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>Launch Parent Portal Demo</span>
                </button>
              </div>
            </div>
          )}

          {/* If Pending: Shortcut for Admin Review */}
          {searchedRecord.status === 'Pending' && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Administrators can verify documents and approve this application in the Admin Office.</span>
              </div>
              <button
                onClick={() => loginAsRole('admin')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 shrink-0 flex items-center gap-1.5"
              >
                <span>Switch to Admin & Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="p-10 rounded-3xl glass-panel text-center border border-white/10">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Application Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Check the Tracking ID or select one of the quick test sample IDs above.
          </p>
        </div>
      )}

    </div>
  );
};
