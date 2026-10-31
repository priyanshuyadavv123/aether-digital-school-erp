import React, { useState, useEffect } from 'react';
import { useSchoolData } from '../context/SchoolDataContext';
import { ReceiptModal } from '../components/ReceiptModal';
import { IdCardModal } from '../components/IdCardModal';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserPlus, 
  Trash2, 
  Search, 
  Printer, 
  Sparkles, 
  Megaphone, 
  Check, 
  Calendar, 
  Radio, 
  IdCard,
  XCircle,
  FileCheck2,
  Sliders,
  Building,
  Phone,
  Mail,
  MapPin,
  Save
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const AdminDashboard = () => {
  const { 
    currentUser, 
    schoolConfig,
    updateSchoolConfig,
    users, 
    admissions, 
    classes, 
    notices, 
    fees,
    leaves,
    verifyAdmissionDocument,
    approveAdmission,
    rejectAdmission,
    addUser,
    deleteUser,
    createNotice,
    deleteNotice,
    payFee,
    approveLeaveRequest,
    rejectLeaveRequest
  } = useSchoolData();

  const [activeSubTab, setActiveSubTab] = useState('admissions'); // 'admissions' | 'users' | 'leaves' | 'notices' | 'fees' | 'branding'
  
  // Admissions Filters
  const [admissionFilter, setAdmissionFilter] = useState('All');
  const [adminNotes, setAdminNotes] = useState('');

  // User Directory Filters & Add Modal
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student',
    classId: 'Class X-A',
    department: 'Science & Mathematics',
    phone: '+91 98100 12345',
    designation: 'Enrolled Scholar',
    bloodGroup: 'O+'
  });

  // Leave Desk Filter
  const [leaveFilter, setLeaveFilter] = useState('All');

  // Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    category: 'Administrative',
    targetAudience: 'All',
    priority: 'high'
  });

  // School Branding & White-Label Form State
  const [brandingForm, setBrandingForm] = useState({
    name: schoolConfig.name,
    tagline: schoolConfig.tagline,
    board: schoolConfig.board,
    affiliationNo: schoolConfig.affiliationNo,
    schoolCode: schoolConfig.schoolCode || '84129',
    address: schoolConfig.address,
    phone: schoolConfig.phone,
    email: schoolConfig.email,
    session: schoolConfig.session,
    principalName: schoolConfig.principalName,
    upiId: schoolConfig.upiId || 'strobertacademy@sbi'
  });

  useEffect(() => {
    setBrandingForm({
      name: schoolConfig.name,
      tagline: schoolConfig.tagline,
      board: schoolConfig.board,
      affiliationNo: schoolConfig.affiliationNo,
      schoolCode: schoolConfig.schoolCode || '84129',
      address: schoolConfig.address,
      phone: schoolConfig.phone,
      email: schoolConfig.email,
      session: schoolConfig.session,
      principalName: schoolConfig.principalName,
      upiId: schoolConfig.upiId || 'strobertacademy@sbi'
    });
  }, [schoolConfig]);

  // Modals state
  const [viewingReceiptFee, setViewingReceiptFee] = useState(null);
  const [feeFilter, setFeeFilter] = useState('All');
  const [selectedUserForIdCard, setSelectedUserForIdCard] = useState(null);

  // Computed KPIs
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;
  const pendingAdmissions = admissions.filter(a => a.status === 'Pending').length;
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
  const totalFeeCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);

  // Filtered Admissions
  const filteredAdmissions = admissions.filter(adm => {
    if (admissionFilter === 'All') return true;
    return adm.status === admissionFilter;
  });

  // Filtered Users
  const filteredUsers = users.filter(u => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userSearchQuery && !u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) && !u.email.toLowerCase().includes(userSearchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Filtered Leaves
  const filteredLeaves = leaves.filter(l => {
    if (leaveFilter === 'All') return true;
    return l.status === leaveFilter;
  });

  // Filtered Fees
  const filteredFees = fees.filter(f => {
    if (feeFilter === 'All') return true;
    return f.status === feeFilter;
  });

  const handleApprove = (admId) => {
    approveAdmission(admId, adminNotes);
    setAdminNotes('');
  };

  const handleReject = (admId) => {
    rejectAdmission(admId, adminNotes || 'Declined per seat allocation quota.');
    setAdminNotes('');
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;
    addUser(newUserData);
    setShowAddUserModal(false);
    setNewUserData({
      name: '',
      email: '',
      role: 'student',
      classId: 'Class X-A',
      department: 'Science & Mathematics',
      phone: '+91 98100 12345',
      designation: 'Enrolled Scholar',
      bloodGroup: 'O+'
    });
  };

  const handleCreateNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    createNotice(noticeForm);
    setNoticeForm({
      title: '',
      content: '',
      category: 'Administrative',
      targetAudience: 'All',
      priority: 'high'
    });
  };

  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateSchoolConfig(brandingForm);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Executive Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Principal Administrative Office
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                  Admin Control
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Executive Administrator: <strong className="text-slate-200">{currentUser?.name}</strong> • {schoolConfig.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedUserForIdCard(currentUser)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-500/25 active:scale-[0.98] transition-all shadow-sm"
              title="View and Print Digital Smart ID Badge"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Executive Smart ID</span>
            </button>

            <span className="text-[11px] font-mono text-emerald-400 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cross-Tab Sync Online</span>
            </span>
          </div>
        </div>

        {/* Real-time KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pending Admissions</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-extrabold text-amber-400">{pendingAdmissions}</span>
              <span className="text-[10px] text-amber-400/70 font-medium">Awaiting Audit</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pending Leave Requests</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-extrabold text-indigo-400">{pendingLeaves}</span>
              <span className="text-[10px] text-indigo-400/70 font-medium">Digital Sick Notes</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Scholars & Staff</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-extrabold text-cyan-400">{totalStudents + totalTeachers}</span>
              <span className="text-[10px] text-cyan-400/70 font-medium">Paperless IDs</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Paperless Fee Ledger</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-extrabold text-emerald-400">{formatINR(totalFeeCollected)}</span>
              <span className="text-[10px] text-emerald-400/70 font-medium">Reconciled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Module Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs">
        <button
          onClick={() => setActiveSubTab('admissions')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'admissions'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Admissions Queue</span>
          {pendingAdmissions > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black font-mono ${
              activeSubTab === 'admissions' ? 'bg-slate-950 text-cyan-300' : 'bg-amber-500 text-slate-950'
            }`}>
              {pendingAdmissions}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('users')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'users'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaves')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'leaves'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Paperless Leave Desk</span>
          {pendingLeaves > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black font-mono ${
              activeSubTab === 'leaves' ? 'bg-slate-950 text-cyan-300' : 'bg-indigo-500 text-white'
            }`}>
              {pendingLeaves}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('notices')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'notices'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Circulars ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fees')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'fees'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fee Ledger</span>
        </button>

        <button
          onClick={() => setActiveSubTab('branding')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'branding'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>School Branding & Settings</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ADMISSIONS MANAGEMENT & DOCUMENT VERIFICATION      */}
      {/* ========================================================= */}
      {activeSubTab === 'admissions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Application Status:</span>
              {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setAdmissionFilter(status)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    admissionFilter === status
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-950/60'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredAdmissions.length} of {admissions.length} online applications
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredAdmissions.map((adm) => (
              <div 
                key={adm.id} 
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white font-heading">{adm.studentName}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {adm.trackingId}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        adm.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : adm.status === 'Rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {adm.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Applied for: <strong className="text-slate-200">{adm.gradeApplied}</strong> • Previous: {adm.previousSchool} ({adm.previousGpa})
                    </p>
                  </div>

                  <div className="text-left lg:text-right text-xs text-slate-400 font-mono">
                    <span>Submitted: {new Date(adm.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Parent / Guardian Information
                    </span>
                    <p className="text-slate-200 font-medium">{adm.parentName}</p>
                    <p className="text-slate-400">{adm.parentEmail} • {adm.parentPhone}</p>
                    <p className="text-slate-400 mt-0.5">{adm.address}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                      Paperless Digital Documents Verification
                    </span>
                    <div className="space-y-1.5">
                      {adm.verifiedDocuments?.map((doc, idx) => (
                        <div 
                          key={idx}
                          onClick={() => verifyAdmissionDocument(adm.id, doc.name)}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5 cursor-pointer hover:border-cyan-400/40 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-300">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[11px]">
                            {doc.verified ? (
                              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                              </span>
                            ) : (
                              <span className="text-amber-400 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Pending Click
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {adm.status === 'Pending' && (
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Add reviewer notes (optional)..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full sm:w-96 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleReject(adm.id)}
                        className="px-4 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold text-xs hover:bg-rose-500/20 transition-all"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(adm.id)}
                        className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md shadow-cyan-500/20 transition-all"
                      >
                        Approve & Auto-Enroll
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: USER DIRECTORY                                     */}
      {/* ========================================================= */}
      {activeSubTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Role:</span>
              {['all', 'admin', 'teacher', 'student', 'parent'].map(role => (
                <button
                  key={role}
                  onClick={() => setUserRoleFilter(role)}
                  className={`px-3 py-1 rounded-lg font-medium uppercase text-[11px] font-mono transition-colors ${
                    userRoleFilter === role
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-950/60'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-md shadow-cyan-500/20 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-slate-950" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((u) => (
              <div 
                key={u.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-xl object-cover border border-cyan-400/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white truncate">{u.name}</h4>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-white/5 text-cyan-400 border border-white/10">
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{u.email}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {u.role === 'student' ? `Roll: ${u.rollNumber} • ${u.classId}` : u.designation || u.phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => setSelectedUserForIdCard(u)}
                    className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                    title="View Smart Digital ID Card"
                  >
                    <Radio className="w-3.5 h-3.5" />
                  </button>
                  {u.id !== currentUser?.id && (
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20"
                      title="Remove User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PAPERLESS LEAVE DESK (PHASE 2 PRESERVED)           */}
      {/* ========================================================= */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Filter Leave Status:</span>
              {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setLeaveFilter(status)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    leaveFilter === status
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-950/60'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <span className="text-slate-400 font-mono">
              {filteredLeaves.length} digital leave records
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredLeaves.map((leave) => (
              <div 
                key={leave.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white font-heading">{leave.studentName}</h4>
                      <span className="text-xs text-cyan-400 font-mono">({leave.classId})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        leave.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : leave.status === 'Rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Submitted by: {leave.requestedBy} • Reason Type: <strong className="text-slate-300">{leave.type}</strong>
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-400">
                    Period: <strong className="text-white">{leave.startDate}</strong> to <strong className="text-white">{leave.endDate}</strong>
                  </div>
                </div>

                <div className="py-3 text-xs text-slate-300">
                  <p className="leading-relaxed italic">"{leave.reason}"</p>
                  {leave.attachmentUrl && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-[11px] text-cyan-400 font-mono">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{leave.attachmentUrl}</span>
                    </div>
                  )}
                </div>

                {leave.status === 'Pending' && (
                  <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                    <button
                      onClick={() => rejectLeaveRequest(leave.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold text-xs hover:bg-rose-500/20 transition-all"
                    >
                      Reject Request
                    </button>
                    <button
                      onClick={() => approveLeaveRequest(leave.id)}
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md shadow-cyan-500/20 transition-all"
                    >
                      Approve & Mark Excused
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: CIRCULARS & NOTICES                                */}
      {/* ========================================================= */}
      {activeSubTab === 'notices' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-heading">
              <Megaphone className="w-4 h-4 text-cyan-400" />
              <span>Broadcast Official Institutional Circular</span>
            </h3>

            <form onSubmit={handleCreateNoticeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Circular Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBSE Regional Science Exhibition Schedule"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Notice Body Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Draft full circular text..."
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target Audience</label>
                  <select
                    value={noticeForm.targetAudience}
                    onChange={(e) => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="All">All Campus Roles</option>
                    <option value="Students">Students Only</option>
                    <option value="Teachers">Faculty Only</option>
                    <option value="Parents">Parents Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Classification Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Administrative">Administrative</option>
                    <option value="Academic">Academic</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Parent Advisory">Parent Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Broadcast Priority</label>
                  <select
                    value={noticeForm.priority}
                    onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all"
                >
                  <Megaphone className="w-4 h-4 text-slate-950" />
                  <span>Transmit Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((n) => (
              <div 
                key={n.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                      n.priority === 'urgent'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : n.priority === 'high'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {n.priority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 font-heading">{n.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>Audience: <strong className="text-cyan-400 font-mono">{n.targetAudience}</strong></span>
                  <button
                    onClick={() => deleteNotice(n.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: FEE & PAPERWORK LEDGER                             */}
      {/* ========================================================= */}
      {activeSubTab === 'fees' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Invoices:</span>
              {['All', 'Paid', 'Pending'].map(status => (
                <button
                  key={status}
                  onClick={() => setFeeFilter(status)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    feeFilter === status
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-950/60'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <span className="text-xs text-emerald-400 font-semibold font-mono">
              Total Invoiced: {formatINR(fees.reduce((a, b) => a + b.amount, 0))}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/90 text-slate-300 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Fee Head</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Receipt / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {filteredFees.map((f) => (
                    <tr key={f.id} className="hover:bg-white/5">
                      <td className="py-3 px-4 font-mono text-cyan-300">{f.invoiceNumber}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-200 block">{f.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{f.classId}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{f.term}</td>
                      <td className="py-3 px-4 font-bold text-white font-mono">{formatINR(f.amount)}</td>
                      <td className="py-3 px-4">
                        {f.status === 'Paid' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            <Clock className="w-3 h-3" /> Due {f.dueDate}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {f.status === 'Paid' ? (
                          <button
                            onClick={() => setViewingReceiptFee(f)}
                            className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold hover:bg-cyan-500/20 inline-flex items-center gap-1 active:scale-[0.98]"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Digital Receipt</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => payFee(f.id, 'Cashier Bank Settlement')}
                            className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:brightness-110 shadow-sm active:scale-[0.98]"
                          >
                            Record Settlement
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: SCHOOL BRANDING & WHITE-LABEL SETTINGS             */}
      {/* ========================================================= */}
      {activeSubTab === 'branding' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Client Demo White-Label Engine</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Institutional Identity, Board Affiliation & Settings
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Changes made here update the School Name, Address, Phone, and Affiliation live across the Navbar, Landing Page, Report Cards, Receipts, and ID Badges.
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Sync Active</span>
              </div>
            </div>

            <form onSubmit={handleSaveBranding} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Official School Name</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.name}
                    onChange={(e) => setBrandingForm({ ...brandingForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Motto / Tagline</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.tagline}
                    onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Board Affiliation Status</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.board}
                    onChange={(e) => setBrandingForm({ ...brandingForm, board: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">CBSE / Board Affiliation No.</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.affiliationNo}
                    onChange={(e) => setBrandingForm({ ...brandingForm, affiliationNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">School Exam Code</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.schoolCode}
                    onChange={(e) => setBrandingForm({ ...brandingForm, schoolCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Campus Physical Address</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.address}
                    onChange={(e) => setBrandingForm({ ...brandingForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Principal / CAO Full Name</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.principalName}
                    onChange={(e) => setBrandingForm({ ...brandingForm, principalName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Official Administrative Phone</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.phone}
                    onChange={(e) => setBrandingForm({ ...brandingForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={brandingForm.email}
                    onChange={(e) => setBrandingForm({ ...brandingForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Active Academic Session</label>
                  <input
                    type="text"
                    required
                    value={brandingForm.session}
                    onChange={(e) => setBrandingForm({ ...brandingForm, session: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Campus UPI Merchant VPA</label>
                <input
                  type="text"
                  required
                  value={brandingForm.upiId}
                  onChange={(e) => setBrandingForm({ ...brandingForm, upiId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Institutional Branding</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-cyan-500/30 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-heading">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              <span>Enroll New User into Directory</span>
            </h3>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya Sengupta"
                  value={newUserData.name}
                  onChange={e => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. diya.s@strobert.edu"
                  value={newUserData.email}
                  onChange={e => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Role</label>
                  <select
                    value={newUserData.role}
                    onChange={e => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Class / Section</label>
                  <select
                    value={newUserData.classId}
                    onChange={e => setNewUserData({ ...newUserData, classId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Blood Group</label>
                  <select
                    value={newUserData.bloodGroup}
                    onChange={e => setNewUserData({ ...newUserData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98]"
                >
                  Create User Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal View */}
      {viewingReceiptFee && (
        <ReceiptModal
          fee={viewingReceiptFee}
          onClose={() => setViewingReceiptFee(null)}
        />
      )}

      {/* Digital Smart ID Card Modal View */}
      {selectedUserForIdCard && (
        <IdCardModal
          user={selectedUserForIdCard}
          onClose={() => setSelectedUserForIdCard(null)}
        />
      )}

    </div>
  );
};