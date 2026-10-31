import React, { useState } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { ReportCardModal } from '../components/ReportCardModal';
import { ReceiptModal } from '../components/ReceiptModal';
import { IdCardModal } from '../components/IdCardModal';
import { TimetableWidget } from '../components/TimetableWidget';
import { UpiPaymentModal } from '../components/UpiPaymentModal';
import { 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  Printer, 
  Sparkles,
  ShieldCheck,
  Radio,
  FileCheck2,
  PlusCircle,
  XCircle,
  X,
  QrCode
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const ParentDashboard = () => {
  const { 
    currentUser, 
    users, 
    attendance, 
    assignments, 
    tests, 
    results, 
    notices, 
    fees, 
    leaves, 
    payFee,
    submitLeaveRequest
  } = useSchoolData();

  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'timetable' | 'attendance' | 'academics' | 'leaves' | 'fees' | 'notices'

  // Guardian & Child identification
  const childStudentId = currentUser?.childStudentId || 'USR-STU-001';
  const child = users.find(u => u.id === childStudentId) || {
    id: 'USR-STU-001',
    name: 'Aarav Sharma',
    classId: 'Class X-A',
    rollNumber: 'X-101',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    bloodGroup: 'O+'
  };

  // Child Attendance Records
  const childAttendance = attendance.filter(a => a.studentId === child.id);
  const totalDays = childAttendance.length;
  const presentDays = childAttendance.filter(a => a.status === 'Present' || a.status === 'Late' || a.status === 'On Leave' || a.status === 'Excused').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 96;

  // Child Results & Assignments
  const childResult = results.find(r => r.studentId === child.id) || results[0];
  const childAssignments = assignments.filter(a => a.classId === child.classId);
  const childFees = fees.filter(f => f.studentId === child.id);
  const childLeaves = leaves.filter(l => l.studentId === child.id);

  // Modals state
  const [viewingReportCard, setViewingReportCard] = useState(false);
  const [viewingReceiptFee, setViewingReceiptFee] = useState(null);
  const [payingFee, setPayingFee] = useState(null);
  const [idCardUser, setIdCardUser] = useState(null);

  // Leave Form State for Parent
  const [showParentLeaveModal, setShowParentLeaveModal] = useState(false);
  const [parentLeaveForm, setParentLeaveForm] = useState({
    startDate: '2026-11-04',
    endDate: '2026-11-05',
    type: 'Medical',
    reason: '',
    attachmentUrl: 'apollo_clinic_prescription.pdf'
  });

  const handleParentLeaveSubmit = (e) => {
    e.preventDefault();
    if (!parentLeaveForm.reason) return;
    submitLeaveRequest({
      studentId: child.id,
      studentName: child.name,
      classId: child.classId,
      requestedBy: `${currentUser?.name} (Parent/Guardian)`,
      ...parentLeaveForm
    });
    setShowParentLeaveModal(false);
    setParentLeaveForm({
      startDate: '2026-11-04',
      endDate: '2026-11-05',
      type: 'Medical',
      reason: '',
      attachmentUrl: 'apollo_clinic_prescription.pdf'
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Parent & Child Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-black text-white">{currentUser?.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                  Verified Guardian
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Parent of <strong className="text-cyan-300">{child.name}</strong> • Section: <span className="font-mono text-white">{child.classId}</span> • Roll: <span className="font-mono text-slate-300">{child.rollNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIdCardUser(child)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500/25 active:scale-[0.98] transition-all shadow-sm"
              title="View and Print Child's Smart Identity Badge"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Ward's Smart ID Card</span>
            </button>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Attendance Meter</span>
              <span className="text-xl font-mono font-extrabold text-emerald-400">{attendanceRate}%</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Cumulative Score</span>
              <span className="text-xl font-mono font-extrabold text-cyan-400">{childResult?.percentage || 94.2}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Child Progress Radar</span>
        </button>

        <button
          onClick={() => setActiveSubTab('timetable')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'timetable'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Class Routine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('attendance')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'attendance'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Daily Attendance Log</span>
        </button>

        <button
          onClick={() => setActiveSubTab('academics')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'academics'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Homework & Exams</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaves')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'leaves'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Digital Sick Leaves ({childLeaves.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fees')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'fees'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Tuition & UPI Receipts</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notices')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'notices'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Teacher Remarks</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODULE 1: CHILD ACADEMIC RADAR (PROGRESS OVERVIEW)        */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Live Performance Metrics
                </span>
                <h3 className="text-xl font-bold text-white mt-1 font-heading">
                  {child.name}'s Academic Progress Dashboard
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time updates directly from teachers and automated testing nodes.
                </p>
              </div>

              <button
                onClick={() => setViewingReportCard(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                <span>View Certified Transcript</span>
              </button>
            </div>

            {/* Visual Subject Progress Meters */}
            <div className="my-6 space-y-4">
              <span className="text-xs font-bold uppercase text-slate-300 block">
                Subject Mastery & Evaluated Marks:
              </span>

              {childResult?.subjects?.map((sub, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{sub.name}</span>
                    <span className="font-mono text-cyan-300 font-bold">{sub.obtainedMarks} / {sub.maxMarks} ({sub.grade})</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-950 border border-white/10 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        sub.obtainedMarks >= 90 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      style={{ width: `${(sub.obtainedMarks / sub.maxMarks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 2: WEEKLY CLASS ROUTINE MATRIX                     */}
      {/* ========================================================= */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-6">
          <TimetableWidget defaultClass={child.classId || 'Class X-A'} />
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 3: DAILY ATTENDANCE LOG                            */}
      {/* ========================================================= */}
      {activeSubTab === 'attendance' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Real-Time Daily Attendance Log</h3>
              <p className="text-xs text-slate-400">Marked digitally by classroom subject teachers.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">Overall Rate: {attendanceRate}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {childAttendance.map(a => (
              <div key={a.id} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-mono">{a.date}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Faculty: {a.markedBy} • Time: {a.time}</div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase font-mono ${
                  a.status === 'Present'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : a.status === 'Late'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : a.status === 'On Leave'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 4: HOMEWORK & EXAM TRACKER                         */}
      {/* ========================================================= */}
      {activeSubTab === 'academics' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Assigned Coursework Tracking</h3>
            <div className="space-y-3">
              {childAssignments.map(asg => {
                const sub = asg.submissions?.find(s => s.studentId === child.id);
                return (
                  <div key={asg.id} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{asg.title}</h4>
                      <p className="text-[11px] text-slate-400">{asg.subject} • Due: {asg.dueDate}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      sub?.status === 'Graded'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : sub?.status === 'Submitted'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {sub ? `Score: ${sub.score || 'Pending'} / ${asg.maxScore}` : 'Not Submitted'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 5: PAPERLESS LEAVE LETTERS                         */}
      {/* ========================================================= */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white">Guardian Leave Applications</h3>
              <p className="text-xs text-slate-400">Directly sanction medical or family leave with digital documents.</p>
            </div>
            <button
              onClick={() => setShowParentLeaveModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Apply for Sick Leave</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {childLeaves.map(leave => (
              <div key={leave.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white font-heading">{leave.type} Leave ({leave.startDate} to {leave.endDate})</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    leave.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {leave.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 py-3 italic">"{leave.reason}"</p>
                {leave.reviewerNotes && (
                  <p className="text-[11px] text-emerald-400 border-t border-white/5 pt-2">
                    Faculty Remarks: "{leave.reviewerNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Modal */}
      {showParentLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-cyan-500/30 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 font-heading">
              Submit Guardian Leave Letter
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Replaces physical letters with authenticated digital audit clearance.
            </p>

            <form onSubmit={handleParentLeaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={parentLeaveForm.startDate}
                    onChange={e => setParentLeaveForm({ ...parentLeaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={parentLeaveForm.endDate}
                    onChange={e => setParentLeaveForm({ ...parentLeaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Reason Classification</label>
                <select
                  value={parentLeaveForm.type}
                  onChange={e => setParentLeaveForm({ ...parentLeaveForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Medical">Medical / Doctor Recommended</option>
                  <option value="Family Event">Family Engagement</option>
                  <option value="Academic Event">Academic Conclave / Olympiad</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Detailed Explanation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the reason for your ward's leave..."
                  value={parentLeaveForm.reason}
                  onChange={e => setParentLeaveForm({ ...parentLeaveForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Digital Medical Slip Simulation</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-emerald-300">{parentLeaveForm.attachmentUrl}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold font-mono">Ready</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowParentLeaveModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98]"
                >
                  Submit Guardian Leave Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 6: TUITION & DIGITAL FEE RECEIPTS (WITH UPI CHECKOUT) */}
      {/* ========================================================= */}
      {activeSubTab === 'fees' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">Paperless Tuition & Lab Invoices</h3>
              <p className="text-xs text-slate-400">100% electronic receipts backed by cryptographic digital signatures & Indian UPI checkout.</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Student: {child.name}</span>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-300 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt / Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {childFees.map(fee => (
                  <tr key={fee.id} className="hover:bg-white/5">
                    <td className="py-3 px-4 font-mono text-cyan-300">{fee.invoiceNumber}</td>
                    <td className="py-3 px-4 text-slate-200">{fee.term}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{fee.dueDate}</td>
                    <td className="py-3 px-4 font-bold text-white font-mono">{formatINR(fee.amount)}</td>
                    <td className="py-3 px-4">
                      {fee.status === 'Paid' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Paid on {fee.paidDate}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          <Clock className="w-3 h-3" /> Due {fee.dueDate}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {fee.status === 'Paid' ? (
                        <button
                          onClick={() => setViewingReceiptFee(fee)}
                          className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-bold hover:bg-emerald-500/20 inline-flex items-center gap-1 active:scale-[0.98]"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Official Receipt</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setPayingFee(fee)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold hover:brightness-110 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 ml-auto active:scale-[0.98]"
                        >
                          <QrCode className="w-3.5 h-3.5 text-slate-950" />
                          <span>Pay via UPI Now</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 7: TEACHER REMARKS & NOTICES                       */}
      {/* ========================================================= */}
      {activeSubTab === 'notices' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Head of Science Faculty Communication</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 italic leading-relaxed">
              "{childResult?.teacherRemarks}"
            </div>
            <div className="mt-2 text-right text-[11px] text-slate-400">
              — Dr. Priya Nair (Head of Senior Sciences)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Official Institutional Bulletins & Advisories
            </h3>

            <div className="space-y-3">
              {notices.filter(n => n.targetAudience === 'All' || n.targetAudience === 'Parents').map(n => (
                <div key={n.id} className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white font-heading">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {viewingReportCard && (
        <ReportCardModal
          result={childResult}
          onClose={() => setViewingReportCard(false)}
        />
      )}

      {/* Fee Receipt Modal */}
      {viewingReceiptFee && (
        <ReceiptModal
          fee={viewingReceiptFee}
          onClose={() => setViewingReceiptFee(null)}
        />
      )}

      {/* UPI Checkout Modal */}
      {payingFee && (
        <UpiPaymentModal
          fee={payingFee}
          isOpen={Boolean(payingFee)}
          onClose={() => setPayingFee(null)}
          onPaymentSuccess={(receiptId) => {
            const updated = {
              ...payingFee,
              status: 'Paid',
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod: 'Instant UPI (Google Pay / PhonePe)',
              receiptId
            };
            setPayingFee(null);
            setViewingReceiptFee(updated);
          }}
        />
      )}

      {/* Digital Smart ID Card */}
      {idCardUser && (
        <IdCardModal
          user={idCardUser}
          onClose={() => setIdCardUser(null)}
        />
      )}

    </div>
  );
};