import React, { useState, useMemo } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { ReportCardModal } from '../components/ReportCardModal';
import { IdCardModal } from '../components/IdCardModal';
import { TimetableWidget } from '../components/TimetableWidget';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  UserCheck, 
  FileText, 
  PlusCircle, 
  Award, 
  Check, 
  X, 
  Users, 
  Send, 
  HelpCircle,
  Eye,
  Sparkles,
  Radio,
  FileCheck2,
  XCircle,
  Droplet,
  Search,
  BellRing,
  AlertCircle,
  UploadCloud
} from 'lucide-react';

export const TeacherDashboard = () => {
  const { 
    currentUser, 
    classes, 
    users, 
    attendance, 
    assignments, 
    tests, 
    results, 
    leaves,
    markBulkAttendance, 
    createAssignment, 
    gradeAssignmentSubmission, 
    createTest, 
    publishResult,
    approveLeaveRequest,
    rejectLeaveRequest
  } = useSchoolData();

  const [activeSubTab, setActiveSubTab] = useState('attendance'); // 'attendance' | 'timetable' | 'leaves' | 'assignments' | 'tests' | 'results'
  const [showIdCard, setShowIdCard] = useState(false);

  // ================= ATTENDANCE STATE =================
  const [selectedClassId, setSelectedClassId] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-10-31');
  const [studentSearch, setStudentSearch] = useState('');
  const [statusMap, setStatusMap] = useState({}); // { [studentId]: 'Present' | 'Absent' | 'Late' }

  // All student users in the school database
  const allStudents = useMemo(() => {
    return users.filter(u => u.role === 'student');
  }, [users]);

  // Dynamically extract class section options from actual student records and registered classes
  const dynamicClassOptions = useMemo(() => {
    const map = new Map();
    // Default option: full roster
    map.set('ALL', { id: 'ALL', name: 'All Class Sections (Full Student Roster)' });

    // Derive from actual students first
    allStudents.forEach(s => {
      const raw = s.classId || s.class || s.grade;
      if (raw && !map.has(raw)) {
        // Try finding registered class in classes list
        const matched = classes.find(c => 
          c.id?.toLowerCase() === raw.toLowerCase() || 
          c.name?.toLowerCase().includes(raw.toLowerCase())
        );
        map.set(raw, { id: raw, name: matched?.name || raw });
      }
    });

    // Also include any registered classes from context
    classes.forEach(c => {
      if (c.id && !map.has(c.id)) {
        map.set(c.id, { id: c.id, name: c.name || c.id });
      }
    });

    return Array.from(map.values());
  }, [allStudents, classes]);

  // Helper to flexibly match a student against a class filter
  const isStudentInClass = (s, targetClassId) => {
    if (!targetClassId || targetClassId === 'ALL') return true;
    const sId = (s.classId || '').trim().toLowerCase();
    const sClass = (s.class || '').trim().toLowerCase();
    const sGrade = (s.grade || '').trim().toLowerCase();
    const target = targetClassId.trim().toLowerCase();

    // Exact or direct match
    if (sId === target || sClass === target || sGrade === target) return true;

    // Check against registered class definitions
    const targetClassObj = classes.find(c => 
      c.id?.toLowerCase() === target || c.name?.toLowerCase() === target
    );
    if (targetClassObj) {
      const objId = (targetClassObj.id || '').toLowerCase();
      const objName = (targetClassObj.name || '').toLowerCase();
      if (sId === objId || sClass === objId || sGrade === objId) return true;
      if (sId === objName || sClass === objName || sGrade === objName) return true;
      if (objName.includes(sId) || objName.includes(sClass)) return true;
      if (sId.includes(objId) || sClass.includes(objId)) return true;
    }

    // Alphanumeric normalized comparison (removes hyphens, spaces, parenthesis)
    const norm = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const tNorm = norm(target);
    if (norm(sId) === tNorm || norm(sClass) === tNorm || norm(sGrade) === tNorm) return true;

    // Substring matches for class sections
    if (tNorm.includes('classxa') && norm(sId).includes('classxa')) return true;
    if (tNorm.includes('classxb') && norm(sId).includes('classxb')) return true;
    if (tNorm.includes('classxi') && norm(sId).includes('classxi')) return true;
    if (tNorm.includes('classxii') && norm(sId).includes('classxii')) return true;

    // Legacy "Grade 10" / "Grade 11" / "Grade 12" mappings
    if (tNorm.includes('grade10') && (norm(sId).includes('classx') || norm(sClass).includes('classx'))) return true;
    if (tNorm.includes('grade11') && (norm(sId).includes('classxi') || norm(sClass).includes('classxi'))) return true;
    if (tNorm.includes('grade12') && (norm(sId).includes('classxii') || norm(sClass).includes('classxii'))) return true;

    return false;
  };

  // Filter students based on selected class
  const classFilteredStudents = useMemo(() => {
    if (selectedClassId === 'ALL') return allStudents;
    return allStudents.filter(s => isStudentInClass(s, selectedClassId));
  }, [allStudents, selectedClassId, classes]);

  // Fallback: If no students match the selected class filter, fallback to allStudents so roster is NEVER empty!
  const isFallbackActive = classFilteredStudents.length === 0 && selectedClassId !== 'ALL' && allStudents.length > 0;
  const activeStudentRoster = isFallbackActive ? allStudents : classFilteredStudents;

  // Search filter applied on top of the active roster
  const displayedStudents = useMemo(() => {
    if (!studentSearch.trim()) return activeStudentRoster;
    const q = studentSearch.toLowerCase().trim();
    return activeStudentRoster.filter(s => {
      const name = (s.name || '').toLowerCase();
      const roll = (s.rollNumber || s.roll || '').toLowerCase();
      const sId = (s.id || '').toLowerCase();
      const sClass = (s.classId || s.class || '').toLowerCase();
      return name.includes(q) || roll.includes(q) || sId.includes(q) || sClass.includes(q);
    });
  }, [activeStudentRoster, studentSearch]);

  // Read current student status (from local statusMap or global attendance or default 'Present')
  const getStudentStatus = (studentId) => {
    if (statusMap[studentId]) return statusMap[studentId];
    const existing = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return existing?.status || 'Present';
  };

  const handleSetStudentStatus = (studentId, status) => {
    setStatusMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const next = { ...statusMap };
    activeStudentRoster.forEach(s => {
      next[s.id] = 'Present';
    });
    setStatusMap(next);
  };

  const handleMarkAllAbsent = () => {
    const next = { ...statusMap };
    activeStudentRoster.forEach(s => {
      next[s.id] = 'Absent';
    });
    setStatusMap(next);
  };

  const handleSaveAttendance = () => {
    const recordsToSave = activeStudentRoster.map(s => ({
      studentId: s.id,
      studentName: s.name,
      classId: s.classId || (selectedClassId === 'ALL' ? 'Class X-A' : selectedClassId),
      status: getStudentStatus(s.id)
    }));
    markBulkAttendance(selectedClassId, selectedDate, recordsToSave);
  };

  // Live Counters for the active roster (updates immediately on click of [P], [A], [L])
  const liveStats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let onLeave = 0;

    activeStudentRoster.forEach(s => {
      const st = getStudentStatus(s.id);
      if (st === 'Present') present++;
      else if (st === 'Absent') absent++;
      else if (st === 'Late') late++;
      else if (st === 'On Leave' || st === 'Excused') onLeave++;
    });

    const total = activeStudentRoster.length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return { present, absent, late, onLeave, total, rate };
  }, [activeStudentRoster, statusMap, attendance, selectedDate]);

  // ================= ASSIGNMENT STATE =================
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: 'Physics',
    classId: 'Class X-A',
    dueDate: '2026-11-06',
    maxScore: 50,
    description: '',
    attachmentUrl: 'lab_specification_sheet.pdf'
  });

  // Grading Modal State
  const [gradingModalData, setGradingModalData] = useState(null); // { assignmentId, submission }
  const [gradeScoreInput, setGradeScoreInput] = useState('');
  const [gradeFeedbackInput, setGradeFeedbackInput] = useState('');

  const handleCreateAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.description) return;
    createAssignment(newAssignment);
    setShowCreateAssignmentModal(false);
    setNewAssignment({
      title: '',
      subject: 'Physics',
      classId: 'Class X-A',
      dueDate: '2026-11-06',
      maxScore: 50,
      description: '',
      attachmentUrl: 'lab_specification_sheet.pdf'
    });
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (!gradingModalData) return;
    gradeAssignmentSubmission(
      gradingModalData.assignmentId,
      gradingModalData.submission.studentId,
      Number(gradeScoreInput),
      gradeFeedbackInput
    );
    setGradingModalData(null);
  };

  // ================= ONLINE TEST BUILDER STATE =================
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [newTest, setNewTest] = useState({
    title: '',
    subject: 'Physics',
    classId: 'Class X-A',
    durationMinutes: 15,
    dueDate: '2026-11-08',
    instructions: 'Answer all multiple choice questions within the allotted duration.',
    questions: [
      {
        id: 'Q1',
        question: 'What is the SI unit of electrical capacitance?',
        options: ['Farad', 'Henry', 'Tesla', 'Ohm'],
        correctOptionIndex: 0,
        marks: 10
      },
      {
        id: 'Q2',
        question: 'Which law relates the induced electromotive force to the rate of change of magnetic flux?',
        options: ['Lenz Law', 'Faraday Law of Induction', 'Ampere Circuital Law', 'Coulomb Law'],
        correctOptionIndex: 1,
        marks: 10
      }
    ]
  });

  const handleAddQuestionToTest = () => {
    setNewTest(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `Q${prev.questions.length + 1}`,
          question: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          marks: 10
        }
      ]
    }));
  };

  const handleCreateTestSubmit = (e) => {
    e.preventDefault();
    if (!newTest.title) return;
    const totalMarks = newTest.questions.reduce((sum, q) => sum + (Number(q.marks) || 10), 0);
    createTest({ ...newTest, totalMarks });
    setShowCreateTestModal(false);
    setNewTest({
      title: '',
      subject: 'Physics',
      classId: 'Class X-A',
      durationMinutes: 15,
      dueDate: '2026-11-08',
      instructions: 'Answer all multiple choice questions within the allotted duration.',
      questions: [
        {
          id: 'Q1',
          question: 'What is the SI unit of electrical capacitance?',
          options: ['Farad', 'Henry', 'Tesla', 'Ohm'],
          correctOptionIndex: 0,
          marks: 10
        }
      ]
    });
  };

  // ================= EXAM RESULTS PUBLISHER STATE =================
  const [selectedStudentForResult, setSelectedStudentForResult] = useState(allStudents[0]?.id || 'USR-STU-001');
  const [resultTerm, setResultTerm] = useState('Term-1 Mid-Year Board Preparatory Evaluation 2026');
  const [resultMarks, setResultMarks] = useState({
    physics: 96,
    math: 98,
    cs: 95,
    english: 88,
    social: 94
  });
  const [teacherRemarksInput, setTeacherRemarksInput] = useState('Demonstrates exceptional analytical dexterity and rigorous mathematical inquiry. Exemplary class participation.');
  const [viewingReportCard, setViewingReportCard] = useState(null);

  // Leaves assigned to teacher's classes
  const teacherClassIds = currentUser?.assignedClasses || ['Class X-A', 'Class XI-Science'];
  const teacherLeaves = leaves.filter(l => teacherClassIds.includes(l.classId));
  const pendingClassLeaves = teacherLeaves.filter(l => l.status === 'Pending').length;

  const handlePublishReportCard = (e) => {
    e.preventDefault();
    const student = users.find(u => u.id === selectedStudentForResult);
    if (!student) return;

    const subjects = [
      { name: "Science (Physics, Chem, Bio)", maxMarks: 100, obtainedMarks: Number(resultMarks.physics), grade: Number(resultMarks.physics) >= 90 ? 'A1' : 'A2' },
      { name: "Mathematics Standard", maxMarks: 100, obtainedMarks: Number(resultMarks.math), grade: Number(resultMarks.math) >= 90 ? 'A1' : 'A2' },
      { name: "Information Technology & AI", maxMarks: 100, obtainedMarks: Number(resultMarks.cs), grade: Number(resultMarks.cs) >= 90 ? 'A1' : 'A2' },
      { name: "English Language & Literature", maxMarks: 100, obtainedMarks: Number(resultMarks.english), grade: Number(resultMarks.english) >= 90 ? 'A1' : 'A2' },
      { name: "Social Science", maxMarks: 100, obtainedMarks: Number(resultMarks.social), grade: Number(resultMarks.social) >= 90 ? 'A1' : 'A2' }
    ];

    const totalObtained = subjects.reduce((sum, s) => sum + s.obtainedMarks, 0);
    const percentage = Number((totalObtained / 500 * 100).toFixed(1));
    const overallGrade = percentage >= 90 ? 'A1' : percentage >= 80 ? 'A2' : 'B1';

    const published = publishResult({
      studentId: student.id,
      studentName: student.name,
      classId: student.classId || 'Class X-A',
      rollNumber: student.rollNumber || 'X-101',
      term: resultTerm,
      subjects,
      totalMarks: 500,
      obtainedMarks: totalObtained,
      percentage,
      overallGrade,
      rank: percentage > 92 ? '1st in Section' : 'Top 5% Merit',
      attendancePercentage: 96.5,
      teacherRemarks: teacherRemarksInput
    });

    setViewingReportCard(published);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Teacher Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-blue-500/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400/40 shadow-xl shadow-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-black text-white">{currentUser?.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                  Senior Faculty
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentUser?.designation} • {currentUser?.department}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-cyan-300">
                <span>Assigned Sections:</span>
                {currentUser?.assignedClasses?.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/30 font-semibold font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowIdCard(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 font-bold text-xs flex items-center gap-1.5 hover:bg-blue-500/25 active:scale-[0.98] transition-all shadow-sm"
              title="View and Print Digital Smart ID Badge"
            >
              <Radio className="w-4 h-4 text-blue-400" />
              <span>Faculty Smart ID</span>
            </button>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-right">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Academic Session</span>
              <span className="text-xs font-bold text-white font-mono">2026 - 2027 CBSE Batch</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Paperless Classroom Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs">
        <button
          onClick={() => setActiveSubTab('attendance')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'attendance'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Attendance Marker</span>
        </button>

        <button
          onClick={() => setActiveSubTab('timetable')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'timetable'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Class Routine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaves')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'leaves'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Leave Sanctions ({teacherLeaves.length})</span>
          {pendingClassLeaves > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] font-mono">
              {pendingClassLeaves}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'assignments'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Homework ({assignments.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tests')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'tests'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Quizzes ({tests.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('results')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'results'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Publish Report Cards</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODULE 1: 1-CLICK ATTENDANCE MARKER                       */}
      {/* ========================================================= */}
      {activeSubTab === 'attendance' && (
        <div className="space-y-5">
          {/* Main Control Card */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Left Selectors: Class Section & Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs w-full lg:w-auto">
                <div className="min-w-[240px] flex-1 sm:flex-initial">
                  <label className="text-slate-400 block mb-1 font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Class Section Roster:</span>
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={e => setSelectedClassId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  >
                    {dynamicClassOptions.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="min-w-[160px] flex-1 sm:flex-initial">
                  <label className="text-slate-400 block mb-1 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Date of Record:</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => {
                      setSelectedDate(e.target.value);
                      setStatusMap({});
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Bulk Actions & Save Roster */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleMarkAllPresent}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold active:scale-[0.98] transition-all flex items-center gap-1.5"
                  title="Mark all students in current roster as Present"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark All Present</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkAllAbsent}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold active:scale-[0.98] transition-all flex items-center gap-1.5"
                  title="Mark all students in current roster as Absent"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Mark All Absent</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAttendance}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Save Roster to Cloud</span>
                </button>
              </div>
            </div>

            {/* Sub-row: Quick Search & Live Status Counters */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Quick Student Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Quick search student name, roll no..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                {studentSearch && (
                  <button 
                    type="button"
                    onClick={() => setStudentSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Real-time Status Counters */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-[11px] text-slate-400 font-sans font-semibold">Live Roll Call:</span>
                
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Present: {liveStats.present}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>Absent: {liveStats.absent}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Late: {liveStats.late}</span>
                </span>

                {liveStats.onLeave > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-bold">
                    <span>On Leave: {liveStats.onLeave}</span>
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-white/5 font-semibold">
                  Total: {liveStats.total} ({liveStats.rate}%)
                </span>
              </div>
            </div>
          </div>

          {/* Fallback Banner if selected section had no exact students */}
          {isFallbackActive && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Section <strong>"{selectedClassId}"</strong> has no registered students. Displaying all <strong>{allStudents.length} enrolled students</strong> as fallback so the attendance roster is never empty.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClassId('ALL')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-[11px] shrink-0"
              >
                Switch to All Sections
              </button>
            </div>
          )}

          {/* Student Roster Row List */}
          <div className="space-y-3">
            {displayedStudents.length === 0 ? (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-white/10 text-center space-y-2">
                <Users className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-white font-heading">No Matching Students Found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No students matched your search query "{studentSearch}". Clear the search query to show all students.
                </p>
                <button
                  type="button"
                  onClick={() => setStudentSearch('')}
                  className="mt-2 px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-white border border-white/10"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              displayedStudents.map((s, idx) => {
                const status = getStudentStatus(s.id);
                const isPresent = status === 'Present';
                const isAbsent = status === 'Absent';
                const isLate = status === 'Late';
                const isOnLeave = status === 'On Leave' || status === 'Excused';

                return (
                  <div
                    key={s.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isAbsent
                        ? 'bg-rose-950/20 border-rose-500/30 shadow-lg shadow-rose-950/20'
                        : isLate
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Left: Student Avatar, Name, Roll No, Class, Status Badges */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={s.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=06b6d4&color=fff`}
                          alt={s.name}
                          className={`w-12 h-12 rounded-xl object-cover border-2 ${
                            isAbsent 
                              ? 'border-rose-500 ring-2 ring-rose-500/30' 
                              : isLate 
                              ? 'border-amber-400' 
                              : 'border-emerald-500/60'
                          }`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0284c7&color=fff`;
                          }}
                        />
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] font-black ${
                          isAbsent
                            ? 'bg-rose-500 text-white'
                            : isLate
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-emerald-500 text-slate-950'
                        }`}>
                          {isAbsent ? 'A' : isLate ? 'L' : 'P'}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white font-heading truncate">
                            {s.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-[11px] font-mono font-bold text-cyan-300">
                            {s.rollNumber || s.roll || `X-${100 + idx + 1}`}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {s.classId || s.class || selectedClassId}
                          </span>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {isPresent && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Present in Class</span>
                            </span>
                          )}

                          {isAbsent && (
                            <div className="inline-flex items-center gap-1.5 flex-wrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                <X className="w-3 h-3 text-rose-400" />
                                <span>Absent</span>
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 animate-pulse">
                                <BellRing className="w-2.5 h-2.5 text-rose-400" />
                                <span>Parent SMS/Email Dispatched</span>
                              </span>
                            </div>
                          )}

                          {isLate && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>Late Arrival Recorded</span>
                            </span>
                          )}

                          {isOnLeave && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                              <FileCheck2 className="w-3 h-3 text-indigo-400" />
                              <span>Approved Leave</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: 3 Interactive Toggle Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      {/* [P] Present */}
                      <button
                        type="button"
                        onClick={() => handleSetStudentStatus(s.id, 'Present')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                          isPresent
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 scale-[1.02]'
                            : 'bg-slate-950/80 text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/30 border border-white/10'
                        }`}
                        title="Mark Present"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>[P] Present</span>
                      </button>

                      {/* [A] Absent */}
                      <button
                        type="button"
                        onClick={() => handleSetStudentStatus(s.id, 'Absent')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                          isAbsent
                            ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 scale-[1.02]'
                            : 'bg-slate-950/80 text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border border-white/10'
                        }`}
                        title="Mark Absent & Alert Parent"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>[A] Absent</span>
                      </button>

                      {/* [L] Late */}
                      <button
                        type="button"
                        onClick={() => handleSetStudentStatus(s.id, 'Late')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                          isLate
                            ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 scale-[1.02]'
                            : 'bg-slate-950/80 text-slate-400 hover:text-amber-300 hover:bg-amber-950/30 border border-white/10'
                        }`}
                        title="Mark Late Arrival"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>[L] Late</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 2: WEEKLY CLASS ROUTINE MATRIX                     */}
      {/* ========================================================= */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-6">
          <TimetableWidget defaultClass={selectedClassId === 'ALL' ? 'Class X-A' : selectedClassId} />
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 3: LEAVE SANCTIONS                                 */}
      {/* ========================================================= */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Class Section Leave Requests ({teacherClassIds.join(', ')})</span>
            <span className="text-cyan-400 font-mono">{teacherLeaves.length} Applications</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {teacherLeaves.map((l) => (
              <div key={l.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">{l.studentName}</h4>
                    <p className="text-xs text-slate-400">{l.classId} • Requested by: {l.requestedBy}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    l.status === 'Approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : l.status === 'Rejected'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {l.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 py-3 italic">"{l.reason}"</p>
                {l.status === 'Pending' && (
                  <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => rejectLeaveRequest(l.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 text-xs font-semibold hover:bg-rose-500/20"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approveLeaveRequest(l.id)}
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-[0.98]"
                    >
                      Sanction Leave
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 4: HOMEWORK & ASSIGNMENTS                          */}
      {/* ========================================================= */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white">Active Assignments & Coursework</h3>
              <p className="text-xs text-slate-400">Post digital prompts and review submitted attachments.</p>
            </div>
            <button
              onClick={() => setShowCreateAssignmentModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Create Assignment</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {assignments.map(asg => (
              <div key={asg.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">{asg.title}</h4>
                    <p className="text-xs text-slate-400">{asg.classId} • Subject: {asg.subject} • Due: {asg.dueDate}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">Max Score: {asg.maxScore}</span>
                </div>
                <p className="text-xs text-slate-300 py-3">{asg.description}</p>
                <div className="text-xs text-slate-400 border-t border-white/5 pt-2">
                  <span>Submissions: {asg.submissions?.length || 0} scholars</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 5: ONLINE TESTS & QUIZZES                          */}
      {/* ========================================================= */}
      {activeSubTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white">Live Timed Assessments & Quizzes</h3>
              <p className="text-xs text-slate-400">Author MCQ tests for instant student evaluation.</p>
            </div>
            <button
              onClick={() => setShowCreateTestModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Author New Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map(t => (
              <div key={t.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <h4 className="text-base font-bold text-white font-heading">{t.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{t.classId} • {t.durationMinutes} Mins • Total Marks: {t.totalMarks}</p>
                <div className="mt-3 text-xs text-cyan-400 font-mono">
                  {t.attempts?.length || 0} student attempts logged
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 6: PUBLISH DIGITAL REPORT CARDS                    */}
      {/* ========================================================= */}
      {activeSubTab === 'results' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-heading">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>CBSE Digital Marksheet & Report Card Publisher</span>
            </h3>

            <form onSubmit={handlePublishReportCard} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">Select Student</label>
                  <select
                    value={selectedStudentForResult}
                    onChange={e => setSelectedStudentForResult(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-medium focus:outline-none focus:border-cyan-500"
                  >
                    {users.filter(u => u.role === 'student').map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.classId})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Assessment Term</label>
                  <input
                    type="text"
                    value={resultTerm}
                    onChange={e => setResultTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Teacher Remarks</label>
                <input
                  type="text"
                  value={teacherRemarksInput}
                  onChange={e => setTeacherRemarksInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98] shadow-md shadow-cyan-500/20"
                >
                  Publish & Issue Certified Report Card
                </button>
              </div>
            </form>
          </div>

          {/* Published Results Archive */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-4">
              Recently Published Official Report Cards ({results.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map(r => (
                <div 
                  key={r.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-sm font-bold text-white font-heading">{r.studentName}</h5>
                    <p className="text-[11px] text-slate-400">
                      {r.classId} • Percentage: <strong className="text-cyan-300 font-mono">{r.percentage}%</strong> ({r.overallGrade})
                    </p>
                    <span className="text-[10px] text-emerald-400 font-mono">Rank: {r.rank}</span>
                  </div>

                  <button
                    onClick={() => setViewingReportCard(r)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold flex items-center gap-1 active:scale-[0.98]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Transcript</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {viewingReportCard && (
        <ReportCardModal
          result={viewingReportCard}
          onClose={() => setViewingReportCard(null)}
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