# ARCHITECTURE SPECIFICATION
## 100% Paperless Digital School ERP & LMS Portal
**System Name:** AETHER CLOUD ACADEMY (Digital ERP & LMS Ecosystem)  
**Version:** 1.0.0 Production Architecture  
**Author:** Principal Full-Stack Architect  

---

## 1. High-Level System Architecture

The Paperless Digital School ERP & LMS is an all-in-one institutional operations and learning platform engineered to eliminate 100% of physical paperwork across school management, admissions, classroom learning, testing, grading, and parent communications.

```
                           +----------------------------------------+
                           |       Public Admission Portal          |
                           |  (Application, Tracking, Notice Feed)  |
                           +-------------------+--------------------+
                                               |
                                     (Online Submission)
                                               v
+---------------------------------------------------------------------------------------+
|                                CENTRAL DATA STORE ENGINE                              |
|                 (Persistent LocalStorage Engine: src/context/SchoolDataContext.jsx)   |
+-----------+--------------------+---------------------+--------------------+-----------+
            |                    |                     |                    |
            v                    v                     v                    v
+-----------------------+ +--------------------+ +--------------------+ +---------------+
|     ADMIN PORTAL      | |   TEACHER PORTAL   | |   STUDENT PORTAL   | | PARENT PORTAL |
|                       | |                    | |                    | |               |
| - Verify & Enroll     | | - 1-Click Attend.  | | - Test Arena       | | - Attendance  |
| - Staff/Student Mgmt  | | - Assignment Hub   | | - Homework Submit  | | - Grades/Log  |
| - Urgent Broadcasts   | | - Quiz / Test Lab  | | - Digital Reports  | | - Teacher Chat|
| - Fee & Receipts      | | - Publish Results  | | - Course Docs      | | - Fee Receipts|
+-----------------------+ +--------------------+ +--------------------+ +---------------+
```

---

## 2. Core Entities & Data Schema Specifications

All entities are reactive, strongly typed in contract, synchronized across portals, and backed by localStorage persistence with fallback seeds.

### 2.1 User Entity (`users`)
Supports standard authentication and 1-click role switching for instant evaluation.
```json
{
  "id": "USR-TCH-001",
  "name": "Dr. Sarah Jenkins",
  "email": "teacher@aether.edu",
  "role": "teacher",
  "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  "phone": "+1 (555) 382-9011",
  "department": "Science & Mathematics",
  "assignedClasses": ["Grade 10-A", "Grade 11-Science"],
  "subjects": ["Physics", "Advanced Mathematics"],
  "childStudentId": null // Populated for role: "parent"
}
```

### 2.2 Admission Application Entity (`admissions`)
Handles the paperless intake pipeline from public form submission to admin verification.
```json
{
  "id": "ADM-2026-7841",
  "trackingId": "APP-9842",
  "submittedAt": "2026-10-30T10:15:00.000Z",
  "studentName": "Aria Montgomery",
  "dob": "2010-04-12",
  "gender": "Female",
  "gradeApplied": "Grade 10-A",
  "parentName": "Robert Montgomery",
  "parentEmail": "robert.m@example.com",
  "parentPhone": "+1 (555) 762-1144",
  "previousSchool": "Oakridge Horizon High",
  "previousGpa": "3.92 / 4.0",
  "address": "404 Silicon Parkway, Tech District",
  "status": "Pending", // "Pending" | "Approved" | "Rejected"
  "verifiedDocuments": [
    { "name": "Birth Certificate (Digital Copy)", "file": "birth_cert_aria.pdf", "verified": true },
    { "name": "Previous Year Transcript", "file": "transcript_2025.pdf", "verified": true },
    { "name": "Immunization Record", "file": "health_record.pdf", "verified": false }
  ],
  "adminNotes": "Excellent previous academic score. Awaiting final seat approval.",
  "generatedStudentId": null,
  "generatedParentId": null
}
```

### 2.3 Attendance Entity (`attendance`)
Recorded per student, date, and class session with immediate live KPI calculations.
```json
{
  "id": "ATT-20261031-10A-001",
  "date": "2026-10-31",
  "classId": "Grade 10-A",
  "studentId": "USR-STU-001",
  "studentName": "Leo Harrison",
  "status": "Present", // "Present" | "Absent" | "Late" | "Excused"
  "markedByTeacherId": "USR-TCH-001",
  "timestamp": "2026-10-31T08:30:00.000Z"
}
```

### 2.4 Assignment & Submission Entity (`assignments`)
Full digital lifecycle: Teacher creates -> Student submits -> Teacher grades with feedback.
```json
{
  "id": "ASG-101",
  "title": "Quantum Mechanics & Wave Theory Analysis",
  "subject": "Physics",
  "classId": "Grade 10-A",
  "teacherId": "USR-TCH-001",
  "teacherName": "Dr. Sarah Jenkins",
  "createdAt": "2026-10-25T09:00:00.000Z",
  "dueDate": "2026-11-04T23:59:00.000Z",
  "maxScore": 50,
  "description": "Analyze double-slit interference patterns and write a 2-page digital lab synthesis.",
  "attachmentUrl": "assignment_spec_quantum.pdf",
  "submissions": [
    {
      "studentId": "USR-STU-001",
      "studentName": "Leo Harrison",
      "submittedAt": "2026-10-28T14:22:00.000Z",
      "content": "Submitted simulated lab calculation spreadsheet & report summary.",
      "fileUrl": "leo_quantum_lab.pdf",
      "status": "Graded", // "Submitted" | "Graded" | "Late"
      "score": 48,
      "feedback": "Outstanding derivation of wavelength interference!"
    }
  ]
}
```

### 2.5 Online Test & Quiz Arena Entity (`tests`)
Interactive exam room supporting time limits, automated evaluation, and recorded history.
```json
{
  "id": "TEST-201",
  "title": "Kinematics & Dynamics Speed Test",
  "subject": "Physics",
  "classId": "Grade 10-A",
  "durationMinutes": 15,
  "totalMarks": 30,
  "status": "Active", // "Active" | "Upcoming" | "Completed"
  "questions": [
    {
      "id": "Q1",
      "question": "What is the acceleration of a freely falling body in a vacuum near Earth's surface?",
      "options": ["9.8 m/s²", "8.9 m/s²", "12.4 m/s²", "98 m/s²"],
      "correctOptionIndex": 0,
      "marks": 10
    },
    {
      "id": "Q2",
      "question": "Which of Newton's laws states that action and reaction are equal and opposite?",
      "options": ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
      "correctOptionIndex": 2,
      "marks": 10
    },
    {
      "id": "Q3",
      "question": "The rate of change of momentum is proportional to:",
      "options": ["Inertia", "Applied Net Force", "Velocity", "Displacement"],
      "correctOptionIndex": 1,
      "marks": 10
    }
  ],
  "attempts": [
    {
      "studentId": "USR-STU-001",
      "studentName": "Leo Harrison",
      "score": 30,
      "totalMarks": 30,
      "percentage": 100,
      "attemptedAt": "2026-10-30T11:45:00.000Z",
      "answers": { "Q1": 0, "Q2": 2, "Q3": 1 }
    }
  ]
}
```

### 2.6 Academic Results & Digital Report Card (`results`)
Aggregated academic terms with printable/downloadable paperless report card rendering.
```json
{
  "id": "REP-2026-STU-001",
  "studentId": "USR-STU-001",
  "studentName": "Leo Harrison",
  "classId": "Grade 10-A",
  "rollNumber": "A-101",
  "term": "Mid-Term Academic Assessment 2026",
  "publishedDate": "2026-10-25",
  "subjects": [
    { "name": "Physics", "maxMarks": 100, "obtainedMarks": 94, "grade": "A+" },
    { "name": "Mathematics", "maxMarks": 100, "obtainedMarks": 98, "grade": "A+" },
    { "name": "Computer Science", "maxMarks": 100, "obtainedMarks": 95, "grade": "A+" },
    { "name": "English Literature", "maxMarks": 100, "obtainedMarks": 88, "grade": "A" },
    { "name": "Social Sciences", "maxMarks": 100, "obtainedMarks": 89, "grade": "A" }
  ],
  "totalMarks": 500,
  "obtainedMarks": 464,
  "percentage": 92.8,
  "overallGrade": "A+",
  "rank": "1st in Class",
  "attendancePercentage": 96.5,
  "teacherRemarks": "Leo exhibits exceptional analytical capabilities and consistent diligence across all scientific domains.",
  "principalSignatureVerified": true
}
```

### 2.7 Digital Notices & Urgent Circulars (`notices`)
School-wide and targeted communication system with priority tags and ticker feeds.
```json
{
  "id": "NOT-501",
  "title": "Paperless Clean-Campus Initiative & Q4 Exam Schedule",
  "content": "All terminal examinations will be conducted paperlessly via the Student Portal Test Arena starting Nov 15. Zero physical paperwork required.",
  "category": "Academic",
  "targetAudience": "All", // "All" | "Teachers" | "Students" | "Parents"
  "author": "Dr. Arthur Vance (Principal)",
  "date": "2026-10-30",
  "priority": "urgent" // "urgent" | "high" | "normal"
}
```

### 2.8 Fee & Paperwork Ledger (`fees`)
Digital paperless receipting and fee audit trail.
```json
{
  "id": "FEE-8891",
  "invoiceNumber": "INV-2026-089",
  "studentId": "USR-STU-001",
  "studentName": "Leo Harrison",
  "classId": "Grade 10-A",
  "term": "Term 2 Tuition & Digital Lab Fee",
  "amount": 1250,
  "dueDate": "2026-11-10",
  "status": "Paid", // "Paid" | "Pending" | "Overdue"
  "paidDate": "2026-10-20",
  "paymentMethod": "Digital Campus UPI / Card",
  "receiptId": "REC-77123"
}
```

### 2.9 Paperless Digital Leave Entity (`leaves`)
Replaces physical sick-leave letters and parental excuse paper slips.
```json
{
  "id": "LEV-2026-001",
  "studentId": "USR-STU-001",
  "studentName": "Leo Harrison",
  "classId": "Grade 10-A",
  "requestedBy": "David Harrison (Guardian)",
  "startDate": "2026-11-02",
  "endDate": "2026-11-03",
  "type": "Medical", // "Medical" | "Family" | "Academic Event" | "Emergency"
  "reason": "Scheduled pediatric ophthalmology evaluation and preventive eye rest.",
  "attachmentUrl": "pediatric_medical_slip_leo.pdf",
  "status": "Approved", // "Pending" | "Approved" | "Rejected"
  "submittedAt": "2026-10-29T10:00:00.000Z",
  "reviewedBy": "Dr. Sarah Jenkins",
  "reviewedAt": "2026-10-29T14:30:00.000Z",
  "reviewerNotes": "Approved. Take rest and catch up on lecture recordings in the Student Hub."
}
```
*Note on Attendance Automation:* When a teacher or administrator approves a leave application, the system automatically registers or updates attendance records for that student across the date range with `status: "Excused"`.

### 2.10 Digital Smart ID Badge & RFID Gate Model
Contactless campus gate entry token with simulated QR code and NFC tag.
- Visual elements: Institutional Crest, Photo Avatar with holographic border, Legal Name, Role Badge, Roll / Employee ID, Blood Group, Emergency Contact, and Dynamic Verification QR Vector.
- Print-Perfect CSS: Encapsulated within `.printable-document` for borderless paper/card badge printing.

---

## 3. UI/UX Design System Specifications

- **Theme Palette:**
  - Dark Mode Base: Deep Space Glass (`bg-slate-950`, `bg-slate-900/60`, `border-white/10`)
  - Accent Primary: Electric Cyan (`#06b6d4`, Tailwind `cyan-500`)
  - Accent Secondary: Neon Blue (`#3b82f6`, Tailwind `blue-500`)
  - Accent Success: Emerald Green (`#10b981`, Tailwind `emerald-500`)
  - Accent Alert: Crimson Neon (`#f43f5e`, Tailwind `rose-500`)
  - Accent Warning: Amber Gold (`#f59e0b`, Tailwind `amber-500`)
  - Light Mode Base: Crisp Clean Slate (`bg-slate-50`, `bg-white/80`, `border-slate-200`)
- **Glassmorphic Characteristics:**
  - Backdrop filter: `backdrop-blur-md`
  - Subtle reflective borders: `border border-white/10 dark:border-white/10 light:border-slate-200`
  - Glowing highlights and badge pulses for urgent notices and live indicators
- **Accessibility & Responsiveness:**
  - Full mobile, tablet, and desktop responsive flex/grid layouts.
  - Keyboard accessible forms with visual status feedback and toast notifications.

---

## 4. Multi-Role Portal Routing & Workflows

1. **Role Switcher & 1-Click Fast Login:**
   - Always available in header navigation + explicit login screen.
   - 1-click test buttons for `Admin`, `Teacher`, `Student`, `Parent`, and `Public Admission`.
2. **Real-Time Cross-Portal Reactivity:**
   - **Admission submission** on Public Landing immediately increments "Pending Admissions" badge in Admin Portal.
   - **Admin "Approve"** creates the student and parent accounts, generating ready-to-use logins.
   - **Teacher Marks Attendance** -> Instantly recalculates Student Portal attendance meter and Parent Portal daily attendance status.
   - **Teacher Posts Assignment** -> Instantly appears in Student homework feed. Student submission marks it ready for teacher grading.
   - **Teacher Grades Submission** -> Instantly visible to Student and Parent.
   - **Teacher Creates Quiz** -> Student takes it in Test Arena -> Score instantly recorded and synced.
   - **Admin / Teacher Publishes Notice** -> Broadcasts to Public Ticker, Student Dashboard, Parent Feed, and Teacher Board.
   - **Fee Receipt Generation** -> Instant digital invoice download and verification view.
