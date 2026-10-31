import React, { useState } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Users, 
  GraduationCap, 
  Copy, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export const AdmissionForm = () => {
  const { submitAdmissionApplication, setActiveTab, loginAsRole, classes } = useSchoolData();

  const [formData, setFormData] = useState({
    studentName: '',
    dob: '2010-05-14',
    gender: 'Female',
    gradeApplied: 'Class X-A',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    previousSchool: '',
    previousGpa: '',
    address: '',
    birthCertName: 'birth_cert_digital.pdf',
    transcriptName: 'previous_transcripts.pdf',
    medicalCertName: 'immunization_record.pdf',
    declarationAgreed: true
  });

  const [submittedTrackingId, setSubmittedTrackingId] = useState(null);
  const [copied, setCopied] = useState(false);

  // Fast autofill for quick testing
  const handleQuickAutofill = () => {
    setFormData({
      studentName: 'Reyansh Singhal',
      dob: '2010-03-22',
      gender: 'Male',
      gradeApplied: 'Class X-A',
      parentName: 'Vikram Singhal',
      parentEmail: 'vikram.singhal@example.in',
      parentPhone: '+91 98110 55432',
      previousSchool: 'Modern School, Barakhamba Road',
      previousGpa: '95.4% (CBSE)',
      address: 'D-12 Anand Niketan, New Delhi - 110021',
      birthCertName: 'reyansh_birth_certificate.pdf',
      transcriptName: 'cbse_grade9_marksheet.pdf',
      medicalCertName: 'medical_fitness_clearance.pdf',
      declarationAgreed: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.parentEmail) {
      alert('Please fill out student and parent mandatory fields.');
      return;
    }

    const trackingId = submitAdmissionApplication(formData);
    setSubmittedTrackingId(trackingId);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback safe
    }
  };

  const copyToClipboard = () => {
    if (submittedTrackingId) {
      navigator.clipboard.writeText(submittedTrackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* If already submitted, show the confirmation screen */}
      {submittedTrackingId ? (
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow text-center border border-cyan-500/40 animate-fade-in shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20">
            <CheckCircle2 className="w-10 h-10 text-slate-950 font-bold" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Application Dispatched (100% Paperless)
          </span>

          <h2 className="text-3xl font-extrabold text-white mt-4">
            Admission Application Received!
          </h2>

          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
            Your application for <strong className="text-cyan-300">{formData.studentName}</strong> has been transmitted directly into the Administrative Queue for document verification and credential generation.
          </p>

          {/* Tracking ID Card */}
          <div className="my-8 max-w-md mx-auto p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Official Tracking ID
              </span>
              <span className="text-2xl font-black text-cyan-400 font-mono tracking-wider">
                {submittedTrackingId}
              </span>
            </div>

            <button
              onClick={copyToClipboard}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Workflow Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('application-tracker')}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2"
            >
              <span>Track Application Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                loginAsRole('admin');
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 text-cyan-300 border border-cyan-500/30 font-semibold text-xs hover:bg-slate-700 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Open Admin Portal & Approve It</span>
            </button>

            <button
              onClick={() => {
                setSubmittedTrackingId(null);
                setFormData({
                  studentName: '',
                  dob: '2010-05-14',
                  gender: 'Female',
                  gradeApplied: 'Grade 10-A',
                  parentName: '',
                  parentEmail: '',
                  parentPhone: '',
                  previousSchool: '',
                  previousGpa: '',
                  address: '',
                  birthCertName: 'birth_cert_digital.pdf',
                  transcriptName: 'previous_transcripts.pdf',
                  medicalCertName: 'immunization_record.pdf',
                  declarationAgreed: true
                });
              }}
              className="px-4 py-3 text-xs text-slate-400 hover:text-white"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        /* The Interactive Admission Form */
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Paperless Intake Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Online Admission Application
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Zero paperwork. Upload digital copies and receive your real-time tracking key.
              </p>
            </div>

            <button
              type="button"
              onClick={handleQuickAutofill}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Auto-Fill Demo Data</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Student Information */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold text-sm">
                <User className="w-4 h-4" />
                <span>1. Student Personal Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Sterling"
                    value={formData.studentName}
                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Grade & Section Applying For *
                  </label>
                  <select
                    value={formData.gradeApplied}
                    onChange={e => setFormData({ ...formData, gradeApplied: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Parent / Guardian Information */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>2. Parent / Guardian Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Sterling"
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Parent Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@example.com"
                    value={formData.parentEmail}
                    onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 789-2104"
                    value={formData.parentPhone}
                    onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Residential Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. 502 Horizon Boulevard, Suite 400, Tech District"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Section 3: Previous Academic History */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>3. Previous Academic Records</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Previous School / Academy Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Crestview Science Magnet"
                    value={formData.previousSchool}
                    onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Cumulative GPA or Percentage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.94 / 4.0 or 95%"
                    value={formData.previousGpa}
                    onChange={e => setFormData({ ...formData, previousGpa: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Digital Document Upload Simulation */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Upload className="w-4 h-4" />
                  <span>4. Digital Document Upload Simulation (100% Paperless)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">PDF, JPG, PNG &lt; 10MB</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Document 1 */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <span className="text-[11px] font-semibold text-slate-200 block mb-1">
                    Digital Birth Certificate
                  </span>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{formData.birthCertName}</span>
                  </div>
                </div>

                {/* Document 2 */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <span className="text-[11px] font-semibold text-slate-200 block mb-1">
                    Previous Transcript
                  </span>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{formData.transcriptName}</span>
                  </div>
                </div>

                {/* Document 3 */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <span className="text-[11px] font-semibold text-slate-200 block mb-1">
                    Immunization Record
                  </span>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{formData.medicalCertName}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Declaration & Submission */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationAgreed}
                  onChange={e => setFormData({ ...formData, declarationAgreed: e.target.checked })}
                  className="mt-0.5 rounded border-white/20 text-cyan-500 focus:ring-0 bg-slate-900"
                />
                <span>
                  I certify that all information submitted is accurate and understand this digital application will be authenticated paperlessly by Aether Academy's Board of Admissions.
                </span>
              </label>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('public')}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  <span>Submit Paperless Application</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>

          </form>

        </div>
      )}

    </div>
  );
};
