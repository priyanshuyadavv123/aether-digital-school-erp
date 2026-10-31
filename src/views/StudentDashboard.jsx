import React, { useState, useEffect } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { ReportCardModal } from '../components/ReportCardModal';
import { IdCardModal } from '../components/IdCardModal';
import { TimetableWidget } from '../components/TimetableWidget';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  Send, 
  Printer, 
  Sparkles, 
  Calendar, 
  Check, 
  Eye, 
  Radio, 
  FileCheck2, 
  PlusCircle, 
  XCircle,
  X
} from 'lucide-react';

export const StudentDashboard = () => {
  const { 
    currentUser, 
    attendance, 
    assignments, 
    tests, 
    results, 
    notices, 
    leaves,
    submitAssignment, 
    submitTestAttempt,
    submitLeaveRequest
  } = useSchoolData();

  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'timetable' | 'assignments' | 'tests' | 'leaves' | 'results'
  const [showIdCard, setShowIdCard] = useState(false);

  // Student specific data
  const studentId = currentUser?.id || 'USR-STU-001';
  const studentName = currentUser?.name || 'Aarav Sharma';
  const classId = currentUser?.classId || 'Class X-A';

  // Compute Live Attendance Rate for this student
  const studentAttendanceRecords = attendance.filter(a => a.studentId === studentId);
  const presentCount = studentAttendanceRecords.filter(a => a.status === 'Present' || a.status === 'Late' || a.status === 'On Leave' || a.status === 'Excused').length;
  const attendancePercentage = studentAttendanceRecords.length > 0 
    ? Math.round((presentCount / studentAttendanceRecords.length) * 100) 
    : 96;

  // Student's Assignments
  const classAssignments = assignments.filter(a => a.classId === classId);
  const pendingAssignmentsCount = classAssignments.filter(a => {
    const sub = a.submissions?.find(s => s.studentId === studentId);
    return !sub;
  }).length;

  // Student's Leaves
  const studentLeaves = leaves.filter(l => l.studentId === studentId);

  // Student's Result
  const studentResult = results.find(r => r.studentId === studentId) || results[0];
  const [viewingReportCard, setViewingReportCard] = useState(false);

  // ================= ASSIGNMENT SUBMISSION STATE =================
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [submissionFileName, setSubmissionFileName] = useState('physics_faraday_solution.pdf');

  const handleOpenSubmitDrawer = (asgId) => {
    setSubmittingAssignmentId(asgId);
    setSubmissionContent('');
    setSubmissionFileName(`${studentName.toLowerCase().replace(/\s+/g, '_')}_solution.pdf`);
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!submittingAssignmentId || !submissionContent) return;
    submitAssignment(submittingAssignmentId, submissionContent, submissionFileName);
    setSubmittingAssignmentId(null);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  // ================= LEAVE APPLICATION MODAL STATE =================
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '2026-11-04',
    endDate: '2026-11-05',
    type: 'Medical',
    reason: '',
    attachmentUrl: 'apollo_clinic_prescription.pdf'
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.reason) return;
    submitLeaveRequest(leaveForm);
    setShowLeaveModal(false);
    setLeaveForm({
      startDate: '2026-11-04',
      endDate: '2026-11-05',
      type: 'Medical',
      reason: '',
      attachmentUrl: 'apollo_clinic_prescription.pdf'
    });
  };

  // ================= ONLINE TEST RUNNER STATE =================
  const [activeTestRunner, setActiveTestRunner] = useState(null); // active test object
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { Q1: 0, Q2: 1 }
  const [testTimeRemaining, setTestTimeRemaining] = useState(600); // 10 mins in seconds
  const [testSubmittedResult, setTestSubmittedResult] = useState(null);

  useEffect(() => {
    let timer;
    if (activeTestRunner && testTimeRemaining > 0) {
      timer = setInterval(() => {
        setTestTimeRemaining(prev => {
          if (prev <= 1) {
            handleCompleteTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTestRunner, testTimeRemaining]);

  const handleStartTest = (test) => {
    setActiveTestRunner(test);
    setSelectedAnswers({});
    setTestTimeRemaining((test.durationMinutes || 10) * 60);
    setTestSubmittedResult(null);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCompleteTest = () => {
    if (!activeTestRunner) return;

    let score = 0;
    activeTestRunner.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score += (q.marks || 10);
      }
    });

    submitTestAttempt(activeTestRunner.id, selectedAnswers, score, activeTestRunner.totalMarks);
    setTestSubmittedResult({
      score,
      totalMarks: activeTestRunner.totalMarks,
      percentage: Math.round((score / activeTestRunner.totalMarks) * 100)
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const formatTestTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Student Profile Ribbon */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={studentName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-xl shadow-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-black text-white">{studentName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
                  CBSE Scholar
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Class: <strong className="text-cyan-300 font-mono">{classId}</strong> • Roll No: <span className="font-mono text-white">{currentUser?.rollNumber || 'X-101'}</span> • Blood Group: <span className="text-rose-400 font-bold font-mono">{currentUser?.bloodGroup || 'O+'}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Smart ID Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowIdCard(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-500/25 active:scale-[0.98] transition-all shadow-sm"
              title="View and Print Digital Smart ID Badge"
            >
              <Radio className="w-4 h-4 text-indigo-400" />
              <span>Smart Student ID</span>
            </button>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Attendance Meter</span>
              <span className={`text-xl font-mono font-extrabold ${attendancePercentage >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {attendancePercentage}%
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Section Standings</span>
              <span className="text-xl font-extrabold text-cyan-400 font-mono">
                {studentResult?.rank || '1st in Section'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>My Learning Arena</span>
        </button>

        <button
          onClick={() => setActiveSubTab('timetable')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'timetable'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Class Routine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'assignments'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Coursework & Homework</span>
          {pendingAssignmentsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] font-mono">
              {pendingAssignmentsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('tests')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'tests'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Online Test Arena</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaves')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'leaves'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Paperless Sick Leaves ({studentLeaves.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('results')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'results'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Official Grade Sheet</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODULE 1: STUDENT OVERVIEW DASHBOARD                      */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Academic Standing</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-black text-cyan-400">{studentResult?.percentage || 94.2}%</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">Grade: {studentResult?.overallGrade || 'A1'}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Certified on 100% Paperless Digital Ledger
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Pending Tasks</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-black text-amber-400">{pendingAssignmentsCount}</span>
                <span className="text-xs text-slate-400">Assignments Due</span>
              </div>
              <button
                onClick={() => setActiveSubTab('assignments')}
                className="text-[11px] text-cyan-400 hover:underline mt-2 block font-medium"
              >
                View and Submit Homework →
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Active Online Tests</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-black text-indigo-400">{tests.length}</span>
                <span className="text-xs text-slate-400">Ready in Test Arena</span>
              </div>
              <button
                onClick={() => setActiveSubTab('tests')}
                className="text-[11px] text-cyan-400 hover:underline mt-2 block font-medium"
              >
                Launch Test Arena →
              </button>
            </div>
          </div>

          {/* Urgent School Notices for Students */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <span>Campus Bulletins & Academic Circulars</span>
            </h3>

            <div className="space-y-3">
              {notices.filter(n => n.targetAudience === 'All' || n.targetAudience === 'Students').map(n => (
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

      {/* ========================================================= */}
      {/* MODULE 2: WEEKLY CLASS ROUTINE MATRIX                     */}
      {/* ========================================================= */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-6">
          <TimetableWidget defaultClass={classId || 'Class X-A'} />
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 3: ASSIGNMENTS & DIGITAL SUBMISSION                */}
      {/* ========================================================= */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Coursework & Laboratory Homework</h3>
              <p className="text-xs text-slate-400">Submit homework paperlessly directly to faculty.</p>
            </div>
            <span className="text-xs text-cyan-400 font-mono">Section: {classId}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {classAssignments.map(asg => {
              const submission = asg.submissions?.find(s => s.studentId === studentId);

              return (
                <div 
                  key={asg.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">{asg.subject}</span>
                        <span className="text-xs text-slate-400 font-mono">• Due: {asg.dueDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1 font-heading">{asg.title}</h4>
                      <p className="text-xs text-slate-400">Assigned by: {asg.teacherName}</p>
                    </div>

                    <div>
                      {submission ? (
                        submission.status === 'Graded' ? (
                          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Score: {submission.score} / {asg.maxScore}</span>
                          </div>
                        ) : (
                          <div className="px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs flex items-center gap-1.5 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Submitted • Awaiting Grade</span>
                          </div>
                        )
                      ) : (
                        <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Pending Submission</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 my-4 leading-relaxed">
                    {asg.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    {submission ? (
                      <div className="space-y-1">
                        <p className="text-slate-300">
                          <strong className="text-slate-200">Your Submission:</strong> "{submission.content}"
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Digital Attachment: <span className="text-cyan-400">{submission.fileUrl}</span>
                        </p>
                        {submission.feedback && (
                          <p className="text-emerald-300 font-medium">
                            Teacher Feedback: "{submission.feedback}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">
                        Not submitted yet. Click button to attach digital work.
                      </span>
                    )}

                    {!submission && (
                      <button
                        onClick={() => handleOpenSubmitDrawer(asg.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 shrink-0 self-end sm:self-auto active:scale-[0.98]"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Work Digitally</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Assignment Submission Modal */}
      {submittingAssignmentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-cyan-500/30 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 font-heading">
              Submit Coursework Paperlessly
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your answer explanation and attach your digital solution file.
            </p>

            <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Answer Summary / Derivation Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize your analytical steps, computational derivations, or lab observations..."
                  value={submissionContent}
                  onChange={e => setSubmissionContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Digital File Attachment Simulation</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-cyan-300">{submissionFileName}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold font-mono">Simulated Upload OK</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSubmittingAssignmentId(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98]"
                >
                  Submit to Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 4: ONLINE TEST ARENA                               */}
      {/* ========================================================= */}
      {activeSubTab === 'tests' && (
        <div className="space-y-6">
          
          {!activeTestRunner ? (
            <div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">Online Assessment & Quiz Arena</h3>
                  <p className="text-xs text-slate-400">Attempt live teacher-authored quizzes and get instant marks.</p>
                </div>
                <span className="text-xs text-indigo-400 font-mono">Active Assessments: {tests.length}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tests.map(test => {
                  const attempt = test.attempts?.find(a => a.studentId === studentId);

                  return (
                    <div 
                      key={test.id}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">{test.subject}</span>
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{test.durationMinutes} Minutes</span>
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white font-heading">{test.title}</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {test.instructions}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="text-xs">
                          <span className="text-slate-400">Total Weightage:</span>
                          <span className="font-mono font-bold text-white ml-1">{test.totalMarks} Marks</span>
                        </div>

                        {attempt ? (
                          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold font-mono">
                            Score: {attempt.score} / {attempt.totalMarks} ({attempt.percentage}%)
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartTest(test)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-[0.98]"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Start Timed Quiz</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Live Test Runner */
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/40">
              
              {/* Header with Live Countdown */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block font-bold">
                    Ongoing Assessment Arena • {activeTestRunner.subject}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 font-heading">{activeTestRunner.title}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-xl bg-slate-950 border border-indigo-500/40 text-cyan-300 font-mono text-base font-black flex items-center gap-2 shadow-inner">
                    <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>{formatTestTimer(testTimeRemaining)}</span>
                  </div>

                  <button
                    onClick={() => setActiveTestRunner(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {testSubmittedResult ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">Assessment Completed & Certified!</h4>
                  <p className="text-sm text-slate-300">
                    Your answers were graded automatically on the LMS cloud engine.
                  </p>
                  <div className="inline-block p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono">
                    <div className="text-2xl font-black text-emerald-400">
                      {testSubmittedResult.score} / {testSubmittedResult.totalMarks}
                    </div>
                    <span className="text-xs text-slate-400">Score ({testSubmittedResult.percentage}%)</span>
                  </div>
                  <div>
                    <button
                      onClick={() => setActiveTestRunner(null)}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-[0.98]"
                    >
                      Return to Test List
                    </button>
                  </div>
                </div>
              ) : (
                /* Question List */
                <div className="py-6 space-y-8">
                  {activeTestRunner.questions.map((q, qIndex) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h5 className="text-sm font-semibold text-white leading-relaxed font-heading">
                          <span className="text-cyan-400 font-mono font-bold mr-2">Q{qIndex + 1}.</span>
                          {q.question}
                        </h5>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 bg-white/5 px-2 py-0.5 rounded">
                          {q.marks || 10} Marks
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedAnswers[q.id] === optIndex;

                          return (
                            <button
                              key={optIndex}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIndex)}
                              className={`p-3 rounded-xl text-left text-xs transition-all flex items-center gap-3 ${
                                isSelected
                                  ? 'bg-cyan-500/20 border border-cyan-400/60 text-white font-semibold shadow-md shadow-cyan-500/10'
                                  : 'bg-slate-900/80 border border-white/5 text-slate-300 hover:border-white/20'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 ${
                                isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'
                              }`}>
                                {String.fromCharCode(65 + optIndex)}
                              </div>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      onClick={handleCompleteTest}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                    >
                      Submit Exam Paper
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 5: PAPERLESS SICK LEAVES (PHASE 2 PRESERVED)       */}
      {/* ========================================================= */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10 gap-3">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">Paperless Medical & Event Leaves</h3>
              <p className="text-xs text-slate-400">Submit digital leave requests to faculty without physical paper letters.</p>
            </div>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-md shadow-indigo-500/20 active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Apply for Digital Leave</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {studentLeaves.map(leave => (
              <div key={leave.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-heading">{leave.type} Leave</span>
                    <span className="text-xs font-mono text-slate-400">({leave.startDate} to {leave.endDate})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    leave.status === 'Approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : leave.status === 'Rejected'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {leave.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 py-3 italic">"{leave.reason}"</p>
                {leave.reviewedBy && (
                  <p className="text-[11px] text-cyan-400 border-t border-white/5 pt-2">
                    Reviewed by: {leave.reviewedBy} • Notes: "{leave.reviewerNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-cyan-500/30 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 font-heading">
              Submit Digital Leave Request
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Replaces physical letters with authenticated digital audit clearance.
            </p>

            <form onSubmit={handleLeaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Reason Classification</label>
                <select
                  value={leaveForm.type}
                  onChange={e => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Medical">Medical / Recuperation</option>
                  <option value="Family Event">Family Engagement</option>
                  <option value="Academic Event">Academic Olympiad / Competition</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Detailed Explanation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the reason for leave..."
                  value={leaveForm.reason}
                  onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98]"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 6: OFFICIAL TRANSCRIPTS & REPORT CARD              */}
      {/* ========================================================= */}
      {activeSubTab === 'results' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  Verified Academic Transcripts
                </span>
                <h3 className="text-xl font-bold text-white mt-1 font-heading">
                  {studentResult?.term || 'Term-1 Mid-Year Board Preparatory Evaluation 2026'}
                </h3>
                <p className="text-xs text-slate-400">
                  Published: {studentResult?.publishedDate} • Issued by Controller of Examinations
                </p>
              </div>

              <button
                onClick={() => setViewingReportCard(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                <span>View Full Printable Transcript</span>
              </button>
            </div>

            <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Overall Percentage</span>
                <span className="text-2xl font-mono font-black text-cyan-400">{studentResult?.percentage}%</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Overall Grade</span>
                <span className="text-2xl font-mono font-black text-emerald-400">{studentResult?.overallGrade}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Section Standings</span>
                <span className="text-2xl font-black text-amber-400">{studentResult?.rank}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Verified Attendance</span>
                <span className="text-2xl font-mono font-black text-indigo-400">{attendancePercentage}%</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/90 text-slate-300 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4 text-center">Max Marks</th>
                    <th className="py-2.5 px-4 text-center">Obtained Marks</th>
                    <th className="py-2.5 px-4 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {studentResult?.subjects?.map((sub, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="py-3 px-4 font-semibold text-slate-200">{sub.name}</td>
                      <td className="py-3 px-4 text-center text-slate-400 font-mono">{sub.maxMarks}</td>
                      <td className="py-3 px-4 text-center font-bold text-cyan-300 font-mono">{sub.obtainedMarks}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                Faculty Remarks & Pedagogical Notes:
              </span>
              <p className="text-slate-300 italic">
                "{studentResult?.teacherRemarks}"
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Modals */}
      {viewingReportCard && (
        <ReportCardModal
          result={studentResult}
          onClose={() => setViewingReportCard(false)}
        />
      )}

      {showIdCard && (
        <IdCardModal
          user={currentUser}
          onClose={() => setShowIdCard(false)}
        />
      )}

    </div>
  );
};