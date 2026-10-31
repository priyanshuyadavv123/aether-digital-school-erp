import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SchoolDataContext = createContext();

// Dynamic White-Label School Configuration (Indian CBSE/ICSE Context)
const INITIAL_SCHOOL_CONFIG = {
  name: "Aether Public School",
  tagline: "Empowering Next-Gen Innovators & CBSE Scholars",
  board: "CBSE Affiliated (Senior Secondary)",
  affiliationNo: "330492",
  schoolCode: "84129",
  address: "Sector 21-A, Institutional Knowledge Corridor, New Delhi - 110001",
  phone: "+91 11 4982 7700",
  email: "admissions@aetherpublic.edu.in",
  session: "2026-27",
  principalName: "Dr. R.K. Verma",
  founded: "2012",
  upiId: "aetheracademy@sbi"
};

// Initial Realistic Seed Data with Indian Names & Context
const INITIAL_USERS = [
  {
    id: "USR-ADM-001",
    name: "Dr. R.K. Verma",
    email: "admin@aether.edu",
    role: "admin",
    designation: "Principal & Chief Academic Officer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    phone: "+91 98110 44210",
    department: "Office of the Principal",
    bloodGroup: "O+",
    joinedDate: "2018-06-15"
  },
  {
    id: "USR-TCH-001",
    name: "Dr. Priya Nair",
    email: "teacher@aether.edu",
    role: "teacher",
    designation: "Head of Senior Sciences & Physics Faculty",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    phone: "+91 98712 39011",
    department: "Department of Pure & Applied Physics",
    assignedClasses: ["Class X-A", "Class XI-Science"],
    subjects: ["Physics", "Applied Mechanics", "Computational Physics"],
    bloodGroup: "A+",
    joinedDate: "2021-04-01"
  },
  {
    id: "USR-STU-001",
    name: "Aarav Sharma",
    email: "student@aether.edu",
    role: "student",
    rollNumber: "X-101",
    classId: "Class X-A",
    class: "Class X - Section A",
    grade: "Class X - Section A",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    phone: "+91 98101 22890",
    parentId: "USR-PAR-001",
    parentName: "Rajesh Sharma",
    dob: "2009-08-14",
    bloodGroup: "O+",
    address: "Flat 402, Nilgiri Heights, Vasant Kunj, New Delhi - 110070"
  },
  {
    id: "USR-STU-002",
    name: "Ananya Patel",
    email: "ananya.patel@aether.edu",
    role: "student",
    rollNumber: "X-102",
    classId: "Class X-A",
    class: "Class X - Section A",
    grade: "Class X - Section A",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    phone: "+91 98210 33491",
    parentId: "USR-PAR-002",
    parentName: "Meenakshi Patel",
    dob: "2009-10-18",
    bloodGroup: "B+",
    address: "B-22 Gulmohar Park, South Delhi - 110049"
  },
  {
    id: "USR-STU-003",
    name: "Rohan Malhotra",
    email: "rohan.m@aether.edu",
    role: "student",
    rollNumber: "X-103",
    classId: "Class X-A",
    class: "Class X - Section A",
    grade: "Class X - Section A",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    phone: "+91 97118 45902",
    parentId: "USR-PAR-003",
    parentName: "Vikram Malhotra",
    dob: "2009-11-22",
    bloodGroup: "B+",
    address: "14-C Defence Colony, New Delhi - 110024"
  },
  {
    id: "USR-STU-004",
    name: "Diya Sengupta",
    email: "diya.s@aether.edu",
    role: "student",
    rollNumber: "X-104",
    classId: "Class X-A",
    class: "Class X - Section A",
    grade: "Class X - Section A",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
    phone: "+91 98302 78119",
    parentId: "USR-PAR-004",
    parentName: "Subhash Sengupta",
    dob: "2009-03-29",
    bloodGroup: "AB+",
    address: "78 Chittaranjan Park, New Delhi - 110019"
  },
  {
    id: "USR-STU-005",
    name: "Kabir Mehta",
    email: "kabir.m@aether.edu",
    role: "student",
    rollNumber: "X-105",
    classId: "Class X-B",
    class: "Class X - Section B",
    grade: "Class X - Section B",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    phone: "+91 98234 11290",
    parentId: "USR-PAR-005",
    parentName: "Sanjay Mehta",
    dob: "2009-07-11",
    bloodGroup: "A+",
    address: "51 Preet Vihar, Delhi - 110092"
  },
  {
    id: "USR-STU-006",
    name: "Tanvi Deshmukh",
    email: "tanvi.d@aether.edu",
    role: "student",
    rollNumber: "XI-201",
    classId: "Class XI-Science",
    class: "Class XI - Science",
    grade: "Class XI - Science",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    phone: "+91 98912 66734",
    parentId: "USR-PAR-006",
    parentName: "Rahul Deshmukh",
    dob: "2008-05-19",
    bloodGroup: "O+",
    address: "88 Greater Kailash I, New Delhi - 110048"
  },
  {
    id: "USR-STU-007",
    name: "Siddharth Rao",
    email: "siddharth.r@aether.edu",
    role: "student",
    rollNumber: "XII-301",
    classId: "Class XII-Science",
    class: "Class XII - Science",
    grade: "Class XII - Science",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    phone: "+91 98119 55021",
    parentId: "USR-PAR-007",
    parentName: "Gopal Rao",
    dob: "2007-09-02",
    bloodGroup: "B+",
    address: "23 Safdarjung Enclave, New Delhi - 110029"
  },
  {
    id: "USR-STU-008",
    name: "Isha Gupta",
    email: "isha.g@aether.edu",
    role: "student",
    rollNumber: "XII-302",
    classId: "Class XII-Science",
    class: "Class XII - Science",
    grade: "Class XII - Science",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    phone: "+91 98730 44912",
    parentId: "USR-PAR-008",
    parentName: "Amit Gupta",
    dob: "2007-12-14",
    bloodGroup: "A-",
    address: "67 Model Town II, Delhi - 110009"
  },
  {
    id: "USR-PAR-001",
    name: "Rajesh Sharma",
    email: "parent@aether.edu",
    role: "parent",
    designation: "Guardian / Principal Architect, Enterprise Cloud",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    phone: "+91 98101 22891",
    childStudentId: "USR-STU-001",
    childName: "Aarav Sharma",
    childClass: "Class X-A",
    bloodGroup: "O+",
    occupation: "Principal Software Architect",
    emergencyContact: "+91 98101 22891"
  }
];

const INITIAL_CLASSES = [
  { id: "Class X-A", name: "Class X - Section A (CBSE STEM Honors)", room: "Aryabhata Hall 301", teacher: "Dr. Priya Nair", totalStudents: 28 },
  { id: "Class X-B", name: "Class X - Section B (Commerce & Humanities)", room: "Tagore Hall 204", teacher: "Prof. Kenneth Cole", totalStudents: 26 },
  { id: "Class XI-Science", name: "Class XI - Science & Pre-Engineering", room: "Raman Physics Lab", teacher: "Dr. Priya Nair", totalStudents: 24 },
  { id: "Class XII-Science", name: "Class XII - Senior CBSE Board Batch", room: "Homi Bhabha Auditorium", teacher: "Dr. Priya Nair", totalStudents: 22 }
];

const INITIAL_ADMISSIONS = [
  {
    id: "ADM-2026-7841",
    trackingId: "APP-9842",
    submittedAt: "2026-10-30T10:15:00.000Z",
    studentName: "Ishaan Verma",
    dob: "2010-04-12",
    gender: "Male",
    gradeApplied: "Class X-A",
    parentName: "Sanjay Verma",
    parentEmail: "sanjay.verma@example.in",
    parentPhone: "+91 98112 34567",
    previousSchool: "Delhi Public School, R.K. Puram",
    previousGpa: "94.6% (CBSE)",
    address: "C-14 Mayur Vihar Phase 1, New Delhi",
    status: "Pending",
    verifiedDocuments: [
      { name: "Digital Birth Certificate", file: "birth_cert_ishaan.pdf", verified: true },
      { name: "Grade IX CBSE Marksheet", file: "marksheet_grade9.pdf", verified: true },
      { name: "Aadhaar Card Copy", file: "aadhaar_card_verified.pdf", verified: true }
    ],
    adminNotes: "Outstanding STEM aptitude and Olympiad accolades. Recommended for Honors section.",
    generatedStudentId: null,
    generatedParentId: null
  },
  {
    id: "ADM-2026-8812",
    trackingId: "APP-5120",
    submittedAt: "2026-10-29T16:40:00.000Z",
    studentName: "Meera Nambiar",
    dob: "2009-08-19",
    gender: "Female",
    gradeApplied: "Class XI-Science",
    parentName: "Gopinath Nambiar",
    parentEmail: "g.nambiar@example.in",
    parentPhone: "+91 98200 87654",
    previousSchool: "Kendriya Vidyalaya IIT Powai",
    previousGpa: "96.2% (CBSE)",
    address: "Tower 3, Silicon Oasis, Gurugram - 122002",
    status: "Pending",
    verifiedDocuments: [
      { name: "Digital Birth Certificate", file: "meera_birthcert.pdf", verified: true },
      { name: "CBSE Class X Board Results", file: "cbse_grade10_provisional.pdf", verified: false }
    ],
    adminNotes: "Awaiting physical verification of board migration certificate.",
    generatedStudentId: null,
    generatedParentId: null
  },
  {
    id: "ADM-2026-6410",
    trackingId: "APP-2290",
    submittedAt: "2026-10-26T09:12:00.000Z",
    studentName: "Kabir Mehta",
    dob: "2010-02-15",
    gender: "Male",
    gradeApplied: "Class X-A",
    parentName: "Dr. Alok Mehta",
    parentEmail: "alok.mehta@example.in",
    parentPhone: "+91 97110 99882",
    previousSchool: "The Mother's International School",
    previousGpa: "98.0% (CBSE)",
    address: "88 Gulmohar Enclave, New Delhi",
    status: "Approved",
    verifiedDocuments: [
      { name: "Digital Birth Certificate", file: "kabir_birthcert.pdf", verified: true },
      { name: "Transfer Certificate (TC)", file: "tc_mothers_intl.pdf", verified: true }
    ],
    adminNotes: "Approved by Principal Verma. Full merit scholarship recipient.",
    generatedStudentId: "USR-STU-099",
    generatedParentId: "USR-PAR-099"
  }
];

const INITIAL_ATTENDANCE = [
  // 2026-10-31 (Today)
  { id: "ATT-101", date: "2026-10-31", classId: "Class X-A", studentId: "USR-STU-001", studentName: "Aarav Sharma", status: "Present", markedBy: "Dr. Priya Nair", time: "08:15 AM" },
  { id: "ATT-102", date: "2026-10-31", classId: "Class X-A", studentId: "USR-STU-002", studentName: "Ananya Patel", status: "Present", markedBy: "Dr. Priya Nair", time: "08:18 AM" },
  { id: "ATT-103", date: "2026-10-31", classId: "Class X-A", studentId: "USR-STU-003", studentName: "Rohan Malhotra", status: "Late", markedBy: "Dr. Priya Nair", time: "08:35 AM" },
  { id: "ATT-104", date: "2026-10-31", classId: "Class X-A", studentId: "USR-STU-004", studentName: "Diya Sengupta", status: "Present", markedBy: "Dr. Priya Nair", time: "08:10 AM" },
  { id: "ATT-105-B", date: "2026-10-31", classId: "Class X-B", studentId: "USR-STU-005", studentName: "Kabir Mehta", status: "Present", markedBy: "Prof. Kenneth Cole", time: "08:20 AM" },
  { id: "ATT-106-S", date: "2026-10-31", classId: "Class XI-Science", studentId: "USR-STU-006", studentName: "Tanvi Deshmukh", status: "Present", markedBy: "Dr. Priya Nair", time: "08:05 AM" },
  { id: "ATT-107-S", date: "2026-10-31", classId: "Class XII-Science", studentId: "USR-STU-007", studentName: "Siddharth Rao", status: "Present", markedBy: "Dr. Priya Nair", time: "08:12 AM" },
  { id: "ATT-108-S", date: "2026-10-31", classId: "Class XII-Science", studentId: "USR-STU-008", studentName: "Isha Gupta", status: "Late", markedBy: "Dr. Priya Nair", time: "08:28 AM" },
  // 2026-10-30
  { id: "ATT-105", date: "2026-10-30", classId: "Class X-A", studentId: "USR-STU-001", studentName: "Aarav Sharma", status: "Present", markedBy: "Dr. Priya Nair", time: "08:12 AM" },
  { id: "ATT-106", date: "2026-10-30", classId: "Class X-A", studentId: "USR-STU-002", studentName: "Ananya Patel", status: "Present", markedBy: "Dr. Priya Nair", time: "08:14 AM" },
  { id: "ATT-107", date: "2026-10-30", classId: "Class X-A", studentId: "USR-STU-003", studentName: "Rohan Malhotra", status: "Present", markedBy: "Dr. Priya Nair", time: "08:20 AM" },
  { id: "ATT-108", date: "2026-10-30", classId: "Class X-A", studentId: "USR-STU-004", studentName: "Diya Sengupta", status: "Absent", markedBy: "Dr. Priya Nair", time: "N/A" },
  // 2026-10-29
  { id: "ATT-109", date: "2026-10-29", classId: "Class X-A", studentId: "USR-STU-001", studentName: "Aarav Sharma", status: "Present", markedBy: "Dr. Priya Nair", time: "08:10 AM" },
  { id: "ATT-110", date: "2026-10-29", classId: "Class X-A", studentId: "USR-STU-002", studentName: "Ananya Patel", status: "Present", markedBy: "Dr. Priya Nair", time: "08:12 AM" },
  { id: "ATT-111", date: "2026-10-29", classId: "Class X-A", studentId: "USR-STU-003", studentName: "Rohan Malhotra", status: "Present", markedBy: "Dr. Priya Nair", time: "08:15 AM" },
  { id: "ATT-112", date: "2026-10-29", classId: "Class X-A", studentId: "USR-STU-004", studentName: "Diya Sengupta", status: "Present", markedBy: "Dr. Priya Nair", time: "08:22 AM" }
];

const INITIAL_ASSIGNMENTS = [
  {
    id: "ASG-101",
    title: "Electromagnetic Induction & Faraday Laws Analysis",
    subject: "Physics",
    classId: "Class X-A",
    teacherId: "USR-TCH-001",
    teacherName: "Dr. Priya Nair",
    createdAt: "2026-10-25T09:00:00.000Z",
    dueDate: "2026-11-04",
    maxScore: 50,
    description: "Analyze the magnetic flux variations in a circular solenoid. Calculate the induced electromotive force (EMF) and plot Lenz Law vectors with complete derivations.",
    attachmentUrl: "electromagnetic_induction_spec.pdf",
    submissions: [
      {
        studentId: "USR-STU-001",
        studentName: "Aarav Sharma",
        submittedAt: "2026-10-28T14:22:00.000Z",
        content: "Attached my computational derivation in Python and graphical analysis of flux change over time.",
        fileUrl: "aarav_faraday_law_derivation.pdf",
        status: "Graded",
        score: 48,
        feedback: "Magnificent derivation of Lenz Law and clean graphical visualization! Flawless conceptual clarity."
      },
      {
        studentId: "USR-STU-002",
        studentName: "Ananya Patel",
        submittedAt: "2026-10-29T18:05:00.000Z",
        content: "Completed solenoid field derivations with neat diagrams.",
        fileUrl: "ananya_solenoid_flux.pdf",
        status: "Submitted",
        score: null,
        feedback: ""
      }
    ]
  },
  {
    id: "ASG-102",
    title: "Quadratic Equations & Optimization Problems",
    subject: "Mathematics",
    classId: "Class X-A",
    teacherId: "USR-TCH-001",
    teacherName: "Dr. Priya Nair",
    createdAt: "2026-10-28T11:00:00.000Z",
    dueDate: "2026-11-02",
    maxScore: 40,
    description: "Solve problems 1-10 on quadratic models in projectile motion and maximum area optimization. Show discriminant tests and vertex solutions.",
    attachmentUrl: "cbse_quadratics_worksheet.pdf",
    submissions: []
  },
  {
    id: "ASG-103",
    title: "Python Data Structures: Stacks & Queues Lab",
    subject: "Computer Science",
    classId: "Class X-A",
    teacherId: "USR-TCH-001",
    teacherName: "Dr. Priya Nair",
    createdAt: "2026-10-20T10:00:00.000Z",
    dueDate: "2026-10-27",
    maxScore: 100,
    description: "Implement Stack and Linear Queue using Python lists. Create an interactive test bench demonstrating push, pop, enqueue, and dequeue operations.",
    attachmentUrl: "python_stack_queue_spec.pdf",
    submissions: [
      {
        studentId: "USR-STU-001",
        studentName: "Aarav Sharma",
        submittedAt: "2026-10-26T20:10:00.000Z",
        content: "All unit tests passing. Implemented dynamic exception handling for underflow and overflow conditions.",
        fileUrl: "aarav_python_ds_submission.zip",
        status: "Graded",
        score: 98,
        feedback: "Exceptional efficiency! Code is clean, modular, and extensively documented with PEP-8 guidelines."
      }
    ]
  }
];

const INITIAL_TESTS = [
  {
    id: "TEST-201",
    title: "Current Electricity & Ohm's Law Speed Test",
    subject: "Physics",
    classId: "Class X-A",
    teacherId: "USR-TCH-001",
    teacherName: "Dr. Priya Nair",
    durationMinutes: 10,
    totalMarks: 30,
    dueDate: "2026-11-05",
    status: "Active",
    instructions: "Answer all 3 conceptual and computational questions. You have 10 minutes from clicking Start.",
    questions: [
      {
        id: "Q1",
        question: "What is the equivalent resistance of two 6-ohm resistors connected in parallel?",
        options: ["3 ohms", "12 ohms", "6 ohms", "1.5 ohms"],
        correctOptionIndex: 0,
        marks: 10
      },
      {
        id: "Q2",
        question: "A current of 2 Amperes flows through a 10-ohm conductor for 5 seconds. What is the heat energy produced (H = I²Rt)?",
        options: ["200 Joules", "100 Joules", "50 Joules", "400 Joules"],
        correctOptionIndex: 0,
        marks: 10
      },
      {
        id: "Q3",
        question: "Which physical quantity has the SI unit Volt-Ampere?",
        options: ["Electrical Power (Watt)", "Electrical Energy (Joule)", "Resistance (Ohm)", "Electric Potential"],
        correctOptionIndex: 0,
        marks: 10
      }
    ],
    attempts: [
      {
        studentId: "USR-STU-001",
        studentName: "Aarav Sharma",
        score: 30,
        totalMarks: 30,
        percentage: 100,
        attemptedAt: "2026-10-30T11:45:00.000Z",
        answers: { "Q1": 0, "Q2": 0, "Q3": 0 }
      }
    ]
  },
  {
    id: "TEST-202",
    title: "Arithmetic Progressions (AP) Quick Evaluation",
    subject: "Mathematics",
    classId: "Class X-A",
    teacherId: "USR-TCH-001",
    teacherName: "Dr. Priya Nair",
    durationMinutes: 15,
    totalMarks: 30,
    dueDate: "2026-11-07",
    status: "Active",
    instructions: "Find nth terms, common differences, and sum of series. Calculators not permitted.",
    questions: [
      {
        id: "Q1",
        question: "What is the 10th term of the AP: 2, 7, 12, 17...?",
        options: ["47", "52", "42", "37"],
        correctOptionIndex: 0,
        marks: 10
      },
      {
        id: "Q2",
        question: "If the first term a = 5 and common difference d = 3, what is the sum of the first 10 terms?",
        options: ["185", "175", "195", "165"],
        correctOptionIndex: 0,
        marks: 10
      },
      {
        id: "Q3",
        question: "For an AP where Sn = 3n² + 5n, what is the first term a1?",
        options: ["8", "3", "5", "11"],
        correctOptionIndex: 0,
        marks: 10
      }
    ],
    attempts: []
  }
];

const INITIAL_RESULTS = [
  {
    id: "REP-2026-STU-001",
    studentId: "USR-STU-001",
    studentName: "Aarav Sharma",
    classId: "Class X-A",
    rollNumber: "X-101",
    term: "Term-1 Mid-Year Board Preparatory Evaluation 2026",
    publishedDate: "2026-10-25",
    subjects: [
      { name: "Science (Physics, Chem, Bio)", maxMarks: 100, obtainedMarks: 96, grade: "A1" },
      { name: "Mathematics Standard", maxMarks: 100, obtainedMarks: 98, grade: "A1" },
      { name: "Information Technology & AI", maxMarks: 100, obtainedMarks: 95, grade: "A1" },
      { name: "English Language & Literature", maxMarks: 100, obtainedMarks: 88, grade: "A2" },
      { name: "Social Science", maxMarks: 100, obtainedMarks: 94, grade: "A1" }
    ],
    totalMarks: 500,
    obtainedMarks: 471,
    percentage: 94.2,
    overallGrade: "A1",
    rank: "1st in Section",
    attendancePercentage: 96.5,
    teacherRemarks: "Aarav exhibits outstanding analytical acumen and problem-solving velocity in science and mathematics. Exemplary discipline and peer leadership.",
    principalSignature: "Dr. R.K. Verma (CBSE Affiliated Digital Sign)"
  },
  {
    id: "REP-2026-STU-002",
    studentId: "USR-STU-002",
    studentName: "Ananya Patel",
    classId: "Class X-A",
    rollNumber: "X-102",
    term: "Term-1 Mid-Year Board Preparatory Evaluation 2026",
    publishedDate: "2026-10-25",
    subjects: [
      { name: "Science (Physics, Chem, Bio)", maxMarks: 100, obtainedMarks: 91, grade: "A1" },
      { name: "Mathematics Standard", maxMarks: 100, obtainedMarks: 93, grade: "A1" },
      { name: "Information Technology & AI", maxMarks: 100, obtainedMarks: 90, grade: "A1" },
      { name: "English Language & Literature", maxMarks: 100, obtainedMarks: 92, grade: "A1" },
      { name: "Social Science", maxMarks: 100, obtainedMarks: 86, grade: "A2" }
    ],
    totalMarks: 500,
    obtainedMarks: 452,
    percentage: 90.4,
    overallGrade: "A1",
    rank: "2nd in Section",
    attendancePercentage: 98.0,
    teacherRemarks: "Ananya is consistently diligent, articulate, and performs brilliantly in scientific laboratory experiments.",
    principalSignature: "Dr. R.K. Verma (CBSE Affiliated Digital Sign)"
  }
];

const INITIAL_NOTICES = [
  {
    id: "NOT-501",
    title: "100% Paperless Clean-Campus & CBSE Digital Examination Protocol",
    content: "All administrative clearances, term examinations, and report cards are now completely digitized. Students, teachers, and parents can access, sign, and verify documents via their respective authenticated digital portals without physical stationery.",
    category: "Administrative",
    targetAudience: "All",
    author: "Dr. R.K. Verma (Principal)",
    date: "2026-10-30",
    priority: "urgent"
  },
  {
    id: "NOT-502",
    title: "CBSE National Science & Robotics Exhibition 2026 Registrations Open",
    content: "Students from Class IX to XII are invited to register project models for the CBSE Regional Science Exhibition. Digital project abstracts must be submitted to Dr. Priya Nair through the LMS portal by Nov 10.",
    category: "Academic",
    targetAudience: "Students",
    author: "Dr. Priya Nair (Head of Sciences)",
    date: "2026-10-29",
    priority: "high"
  },
  {
    id: "NOT-503",
    title: "Term-1 Parent-Teacher Digital Assessment Symposium",
    content: "One-on-one digital parent conferences will occur this upcoming Saturday from 9:00 AM to 1:00 PM. Parents can review the published term report card and attendance trends on their Parent Portal prior to the meeting.",
    category: "Parent Advisory",
    targetAudience: "Parents",
    author: "Office of Academic Dean",
    date: "2026-10-28",
    priority: "high"
  },
  {
    id: "NOT-504",
    title: "Faculty Seminar: NEP 2020 Competency-Based Learning Assessments",
    content: "Mandatory faculty development symposium on using modern LMS rubrics, auto-grading pipelines, and digital attendance tracking systems this Wednesday in Conference Hall A.",
    category: "Faculty",
    targetAudience: "Teachers",
    author: "Dr. R.K. Verma (Principal)",
    date: "2026-10-27",
    priority: "normal"
  }
];

const INITIAL_FEES = [
  {
    id: "FEE-8891",
    invoiceNumber: "INV-2026-089",
    studentId: "USR-STU-001",
    studentName: "Aarav Sharma",
    classId: "Class X-A",
    term: "Quarter 1 Tuition & Paperless Campus Smart-Lab Fee",
    amount: 24500,
    dueDate: "2026-07-15",
    status: "Paid",
    paidDate: "2026-07-10",
    paymentMethod: "Instant UPI (Google Pay / PhonePe)",
    receiptId: "REC-AETH-9011"
  },
  {
    id: "FEE-8892",
    invoiceNumber: "INV-2026-142",
    studentId: "USR-STU-001",
    studentName: "Aarav Sharma",
    classId: "Class X-A",
    term: "Quarter 2 Tuition & STEM Robotics Lab Component",
    amount: 24500,
    dueDate: "2026-10-15",
    status: "Paid",
    paidDate: "2026-10-12",
    paymentMethod: "Aether UPI Payment Portal",
    receiptId: "REC-AETH-9442"
  },
  {
    id: "FEE-8893",
    invoiceNumber: "INV-2026-218",
    studentId: "USR-STU-001",
    studentName: "Aarav Sharma",
    classId: "Class X-A",
    term: "Quarter 3 Tuition & Annual CBSE Board Examination Fee",
    amount: 18500,
    dueDate: "2026-11-15",
    status: "Pending",
    paidDate: null,
    paymentMethod: null,
    receiptId: null
  },
  {
    id: "FEE-8894",
    invoiceNumber: "INV-2026-219",
    studentId: "USR-STU-002",
    studentName: "Ananya Patel",
    classId: "Class X-A",
    term: "Quarter 2 Tuition Fee",
    amount: 24500,
    dueDate: "2026-10-15",
    status: "Paid",
    paidDate: "2026-10-08",
    paymentMethod: "HDFC NetBanking",
    receiptId: "REC-AETH-9331"
  }
];

const INITIAL_LEAVES = [
  {
    id: "LEV-2026-001",
    studentId: "USR-STU-001",
    studentName: "Aarav Sharma",
    classId: "Class X-A",
    requestedBy: "Rajesh Sharma (Guardian)",
    startDate: "2026-11-02",
    endDate: "2026-11-03",
    type: "Medical",
    reason: "Viral recuperation and preventive rest as advised by Apollo Medical Clinic.",
    attachmentUrl: "apollo_clinic_prescription.pdf",
    status: "Approved",
    submittedAt: "2026-10-29T10:00:00.000Z",
    reviewedBy: "Dr. Priya Nair",
    reviewedAt: "2026-10-29T14:30:00.000Z",
    reviewerNotes: "Approved. Take rest and catch up on lecture recordings and notes in the Student Portal."
  },
  {
    id: "LEV-2026-002",
    studentId: "USR-STU-002",
    studentName: "Ananya Patel",
    classId: "Class X-A",
    requestedBy: "Meenakshi Patel (Guardian)",
    startDate: "2026-11-05",
    endDate: "2026-11-06",
    type: "Academic Event",
    reason: "Representing school at the Inter-School CBSE Mathematics Conclave.",
    attachmentUrl: "cbse_math_conclave_invite.pdf",
    status: "Pending",
    submittedAt: "2026-10-31T08:00:00.000Z",
    reviewedBy: null,
    reviewedAt: null,
    reviewerNotes: ""
  }
];

export const SchoolDataProvider = ({ children }) => {
  // White-Label School Config
  const [schoolConfig, setSchoolConfig] = useState(() => {
    const saved = localStorage.getItem('aether_school_config');
    return saved ? JSON.parse(saved) : INITIAL_SCHOOL_CONFIG;
  });

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aether_theme') || 'dark';
  });

  // Current Logged In User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aether_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Active View / Route: 'public' | 'login' | 'admission-form' | 'application-tracker' | 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('aether_active_tab') || 'public';
  });

  // Persistent Collections
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('aether_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('aether_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [admissions, setAdmissions] = useState(() => {
    const saved = localStorage.getItem('aether_admissions');
    return saved ? JSON.parse(saved) : INITIAL_ADMISSIONS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('aether_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('aether_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [tests, setTests] = useState(() => {
    const saved = localStorage.getItem('aether_tests');
    return saved ? JSON.parse(saved) : INITIAL_TESTS;
  });

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('aether_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('aether_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem('aether_fees');
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('aether_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  // Notification Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Cross-Tab Live Synchronization via window 'storage' listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      // If a full reset occurred
      if (e.key === 'aether_reset_trigger' || e.key === null) {
        setSchoolConfig(INITIAL_SCHOOL_CONFIG);
        setUsers(INITIAL_USERS);
        setClasses(INITIAL_CLASSES);
        setAdmissions(INITIAL_ADMISSIONS);
        setAttendance(INITIAL_ATTENDANCE);
        setAssignments(INITIAL_ASSIGNMENTS);
        setTests(INITIAL_TESTS);
        setResults(INITIAL_RESULTS);
        setNotices(INITIAL_NOTICES);
        setFees(INITIAL_FEES);
        setLeaves(INITIAL_LEAVES);
        showToast('Cross-tab sync: Demo state reset across all windows', 'info');
        return;
      }

      if (!e.newValue) return;

      try {
        const parsed = JSON.parse(e.newValue);
        switch (e.key) {
          case 'aether_school_config':
            setSchoolConfig(parsed);
            break;
          case 'aether_attendance':
            setAttendance(parsed);
            break;
          case 'aether_assignments':
            setAssignments(parsed);
            break;
          case 'aether_tests':
            setTests(parsed);
            break;
          case 'aether_results':
            setResults(parsed);
            break;
          case 'aether_leaves':
            setLeaves(parsed);
            break;
          case 'aether_admissions':
            setAdmissions(parsed);
            break;
          case 'aether_notices':
            setNotices(parsed);
            break;
          case 'aether_fees':
            setFees(parsed);
            break;
          case 'aether_users':
            setUsers(parsed);
            break;
          case 'aether_classes':
            setClasses(parsed);
            break;
          case 'aether_theme':
            setTheme(e.newValue);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Storage sync parse error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aether_school_config', JSON.stringify(schoolConfig));
  }, [schoolConfig]);

  useEffect(() => {
    localStorage.setItem('aether_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aether_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aether_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aether_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => { localStorage.setItem('aether_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('aether_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('aether_admissions', JSON.stringify(admissions)); }, [admissions]);
  useEffect(() => { localStorage.setItem('aether_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('aether_assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('aether_tests', JSON.stringify(tests)); }, [tests]);
  useEffect(() => { localStorage.setItem('aether_results', JSON.stringify(results)); }, [results]);
  useEffect(() => { localStorage.setItem('aether_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('aether_fees', JSON.stringify(fees)); }, [fees]);
  useEffect(() => { localStorage.setItem('aether_leaves', JSON.stringify(leaves)); }, [leaves]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Update School Configuration (White-Label)
  const updateSchoolConfig = (newConfig) => {
    setSchoolConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('aether_school_config', JSON.stringify(updated));
      return updated;
    });
    showToast('School branding and configuration updated successfully!');
  };

  // 1-Click Fast Login / Demo Switcher
  const loginAsRole = (role) => {
    const roleMap = {
      admin: users.find(u => u.role === 'admin') || INITIAL_USERS[0],
      teacher: users.find(u => u.role === 'teacher') || INITIAL_USERS[1],
      student: users.find(u => u.role === 'student') || INITIAL_USERS[2],
      parent: users.find(u => u.role === 'parent') || INITIAL_USERS[6]
    };

    const targetUser = roleMap[role];
    if (targetUser) {
      setCurrentUser(targetUser);
      setActiveTab('dashboard');
      showToast(`Authenticated as ${targetUser.name} (${targetUser.role.toUpperCase()})`);
    }
  };

  const loginWithCredentials = (email, password) => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setActiveTab('dashboard');
      showToast(`Welcome back, ${foundUser.name}!`);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use demo logins or registered emails.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('public');
    showToast('Logged out securely');
  };

  // Public Admission Submission
  const submitAdmissionApplication = (formData) => {
    const trackingId = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAdmission = {
      id: `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingId,
      submittedAt: new Date().toISOString(),
      ...formData,
      status: 'Pending',
      verifiedDocuments: (formData.documents || []).map(doc => ({
        name: doc.name || 'Digital Document',
        file: doc.file || 'document.pdf',
        verified: true
      })),
      adminNotes: 'Application received via paperless portal. Pending review.',
      generatedStudentId: null,
      generatedParentId: null
    };

    setAdmissions(prev => [newAdmission, ...prev]);
    showToast(`Application submitted! Tracking ID: ${trackingId}`, 'success');
    return trackingId;
  };

  // Admin Document Verification
  const verifyAdmissionDocument = (admissionId, docName) => {
    setAdmissions(prev => prev.map(adm => {
      if (adm.id === admissionId) {
        return {
          ...adm,
          verifiedDocuments: adm.verifiedDocuments.map(d => 
            d.name === docName ? { ...d, verified: !d.verified } : d
          )
        };
      }
      return adm;
    }));
    showToast('Document verification status updated');
  };

  // Admin Approve Admission (creates student and parent accounts)
  const approveAdmission = (admissionId) => {
    const adm = admissions.find(a => a.id === admissionId);
    if (!adm) return;

    const studentId = `USR-STU-${Math.floor(100 + Math.random() * 900)}`;
    const parentId = `USR-PAR-${Math.floor(100 + Math.random() * 900)}`;
    const rollNo = `X-${Math.floor(200 + Math.random() * 100)}`;

    const newStudent = {
      id: studentId,
      name: adm.studentName,
      email: `${adm.studentName.toLowerCase().replace(/\s+/g, '.')}@aether.edu`,
      role: 'student',
      rollNumber: rollNo,
      classId: adm.gradeApplied || 'Class X-A',
      class: adm.gradeApplied || 'Class X-A',
      grade: adm.gradeApplied || 'Class X-A',
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 500000)}?w=150`,
      phone: adm.parentPhone,
      parentId: parentId,
      parentName: adm.parentName,
      dob: adm.dob || '2010-01-01',
      bloodGroup: 'B+',
      address: adm.address || 'New Delhi, India'
    };

    const newParent = {
      id: parentId,
      name: adm.parentName,
      email: adm.parentEmail || `${adm.parentName.toLowerCase().replace(/\s+/g, '.')}@example.in`,
      role: 'parent',
      designation: 'Guardian',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?w=150`,
      phone: adm.parentPhone,
      childStudentId: studentId,
      childName: adm.studentName,
      childClass: adm.gradeApplied || 'Class X-A',
      bloodGroup: 'O+',
      emergencyContact: adm.parentPhone
    };

    // Auto-create initial admission fee invoice in INR
    const newFee = {
      id: `FEE-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceNumber: `INV-2026-${Math.floor(300 + Math.random() * 200)}`,
      studentId: studentId,
      studentName: adm.studentName,
      classId: adm.gradeApplied || 'Class X-A',
      term: 'Annual Admission & Digital Smart-Campus Kit Fee',
      amount: 28500,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'Pending',
      paidDate: null,
      paymentMethod: null,
      receiptId: null
    };

    setUsers(prev => [newStudent, newParent, ...prev]);
    setFees(prev => [newFee, ...prev]);

    setAdmissions(prev => prev.map(a => {
      if (a.id === admissionId) {
        return {
          ...a,
          status: 'Approved',
          generatedStudentId: studentId,
          generatedParentId: parentId,
          adminNotes: `Approved and enrolled into ${adm.gradeApplied}. Credentials generated.`
        };
      }
      return a;
    }));

    showToast(`Admitted ${adm.studentName}! Generated Student ID: ${studentId}`, 'success');
  };

  const rejectAdmission = (admissionId, reason = 'Application does not satisfy eligibility criteria.') => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === admissionId) {
        return {
          ...a,
          status: 'Rejected',
          adminNotes: reason
        };
      }
      return a;
    }));
    showToast('Application marked as rejected', 'info');
  };

  // User Management
  const addUser = (userData) => {
    const newUser = {
      id: `USR-${userData.role.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      avatar: `https://images.unsplash.com/photo-${1510000000000 + Math.floor(Math.random() * 500000)}?w=150`,
      ...userData
    };
    setUsers(prev => [newUser, ...prev]);
    showToast(`Added ${newUser.name} as ${newUser.role}`);
    return newUser;
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast('User record permanently removed');
  };

  // Leave Management (Student/Parent -> Teacher/Admin)
  const submitLeaveRequest = (leaveData) => {
    const newLeave = {
      id: `LEV-${Date.now().toString().slice(-4)}`,
      studentId: currentUser?.role === 'student' ? currentUser.id : (currentUser?.childStudentId || 'USR-STU-001'),
      studentName: currentUser?.role === 'student' ? currentUser.name : (currentUser?.childName || 'Aarav Sharma'),
      classId: currentUser?.role === 'student' ? currentUser.classId : (currentUser?.childClass || 'Class X-A'),
      requestedBy: currentUser?.role === 'parent' ? `${currentUser.name} (Guardian)` : `${currentUser.name} (Student)`,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      type: leaveData.type || 'Medical',
      reason: leaveData.reason,
      attachmentUrl: leaveData.attachmentUrl || 'medical_clearance_upload.pdf',
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      reviewedBy: null,
      reviewedAt: null,
      reviewerNotes: ''
    };

    setLeaves(prev => [newLeave, ...prev]);
    showToast('Digital Leave Application submitted for faculty review');
    return newLeave;
  };

  const approveLeaveRequest = (leaveId, reviewerNotes = 'Approved. Take rest and maintain academic sync.') => {
    let affectedLeave = null;

    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        affectedLeave = {
          ...l,
          status: 'Approved',
          reviewedBy: currentUser?.name || 'Academic Dean',
          reviewedAt: new Date().toISOString(),
          reviewerNotes
        };
        return affectedLeave;
      }
      return l;
    }));

    if (affectedLeave) {
      const today = new Date().toISOString().split('T')[0];
      setAttendance(prev => {
        const existingToday = prev.find(a => a.studentId === affectedLeave.studentId && a.date === today);
        if (existingToday) {
          return prev.map(a => a.id === existingToday.id ? { ...a, status: 'On Leave' } : a);
        } else {
          return [
            {
              id: `ATT-${Date.now().toString().slice(-4)}`,
              date: today,
              classId: affectedLeave.classId,
              studentId: affectedLeave.studentId,
              studentName: affectedLeave.studentName,
              status: 'On Leave',
              markedBy: `${currentUser?.name || 'Dean'} (Digital Leave Clearance)`,
              time: '08:00 AM'
            },
            ...prev
          ];
        }
      });
    }

    showToast('Leave request Approved and recorded in attendance log');
  };

  const rejectLeaveRequest = (leaveId, reviewerNotes = 'Attendance required for ongoing academic cycle.') => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return {
          ...l,
          status: 'Rejected',
          reviewedBy: currentUser?.name || 'Academic Dean',
          reviewedAt: new Date().toISOString(),
          reviewerNotes
        };
      }
      return l;
    }));
    showToast('Leave request rejected', 'info');
  };

  // Attendance Actions
  const markBulkAttendance = (classId, date, records) => {
    const studentIds = new Set(records.map(r => r.studentId));
    setAttendance(prev => {
      const filtered = prev.filter(a => !(a.date === date && (studentIds.has(a.studentId) || (classId !== 'ALL' && a.classId === classId))));
      const newEntries = records.map(r => ({
        id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        date,
        classId: r.classId || classId,
        studentId: r.studentId,
        studentName: r.studentName,
        status: r.status,
        markedBy: currentUser?.name || 'Dr. Priya Nair',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      return [...newEntries, ...filtered];
    });
    showToast(`Attendance synchronized for ${records.length} students on ${date}!`);
  };

  // Homework & Assignments
  const createAssignment = (asgData) => {
    const newAsg = {
      id: `ASG-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      teacherId: currentUser?.id || 'USR-TCH-001',
      teacherName: currentUser?.name || 'Faculty',
      submissions: [],
      ...asgData
    };
    setAssignments(prev => [newAsg, ...prev]);
    showToast(`Assignment "${newAsg.title}" published!`);
    return newAsg;
  };

  const submitAssignment = (assignmentId, content, fileUrl) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        const existingSubIndex = asg.submissions.findIndex(s => s.studentId === currentUser?.id);
        const subRecord = {
          studentId: currentUser?.id || 'USR-STU-001',
          studentName: currentUser?.name || 'Aarav Sharma',
          submittedAt: new Date().toISOString(),
          content,
          fileUrl: fileUrl || 'assignment_submission.pdf',
          status: 'Submitted',
          score: null,
          feedback: ''
        };

        let updatedSubs = [...asg.submissions];
        if (existingSubIndex >= 0) {
          updatedSubs[existingSubIndex] = subRecord;
        } else {
          updatedSubs.push(subRecord);
        }

        return { ...asg, submissions: updatedSubs };
      }
      return asg;
    }));
    showToast('Homework assignment submitted successfully!');
  };

  const gradeAssignmentSubmission = (assignmentId, studentId, score, feedback) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          submissions: asg.submissions.map(sub => {
            if (sub.studentId === studentId) {
              return {
                ...sub,
                score: Number(score),
                feedback,
                status: 'Graded'
              };
            }
            return sub;
          })
        };
      }
      return asg;
    }));
    showToast('Assignment graded and published to student');
  };

  // Tests & Quizzes
  const createTest = (testData) => {
    const newTest = {
      id: `TEST-${Math.floor(300 + Math.random() * 200)}`,
      teacherId: currentUser?.id || 'USR-TCH-001',
      teacherName: currentUser?.name || 'Faculty',
      status: 'Active',
      attempts: [],
      ...testData
    };
    setTests(prev => [newTest, ...prev]);
    showToast(`Online Test "${newTest.title}" published to Class!`);
    return newTest;
  };

  const submitTestAttempt = (testId, answers, score, totalMarks) => {
    setTests(prev => prev.map(t => {
      if (t.id === testId) {
        const attempt = {
          studentId: currentUser?.id || 'USR-STU-001',
          studentName: currentUser?.name || 'Aarav Sharma',
          score,
          totalMarks,
          percentage: Math.round((score / totalMarks) * 100),
          attemptedAt: new Date().toISOString(),
          answers
        };
        return {
          ...t,
          attempts: [...t.attempts.filter(a => a.studentId !== currentUser?.id), attempt]
        };
      }
      return t;
    }));
    showToast(`Test submitted! Scored ${score}/${totalMarks}`, 'success');
  };

  // Results & Report Cards
  const publishResult = (resultData) => {
    const newResult = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      publishedDate: new Date().toISOString().split('T')[0],
      principalSignature: `${schoolConfig.principalName} (CBSE Affiliated Digital Sign)`,
      ...resultData
    };
    setResults(prev => [newResult, ...prev]);
    showToast(`Report card published for ${resultData.studentName}`);
    return newResult;
  };

  // Notice Actions
  const createNotice = (noticeData) => {
    const newNotice = {
      id: `NOT-${Math.floor(600 + Math.random() * 400)}`,
      date: new Date().toISOString().split('T')[0],
      author: currentUser?.name || `${schoolConfig.name} Administration`,
      ...noticeData
    };
    setNotices(prev => [newNotice, ...prev]);
    showToast(`Notice "${newNotice.title}" broadcasted!`);
    return newNotice;
  };

  const deleteNotice = (noticeId) => {
    setNotices(prev => prev.filter(n => n.id !== noticeId));
    showToast('Notice removed');
  };

  // Fee Actions (Instant Payment & Receipt Generation)
  const payFee = (feeId, paymentMethod = 'Instant UPI (BHIM / Google Pay)') => {
    const receiptId = `REC-AETH-${Math.floor(10000 + Math.random() * 90000)}`;
    setFees(prev => prev.map(f => {
      if (f.id === feeId) {
        return {
          ...f,
          status: 'Paid',
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod,
          receiptId
        };
      }
      return f;
    }));
    showToast(`Fee payment verified! Receipt: ${receiptId}`);
    return receiptId;
  };

  // Complete Reset of Demo State with Cross-Tab Broadcast
  const resetAllDataToDefault = () => {
    setSchoolConfig(INITIAL_SCHOOL_CONFIG);
    setUsers(INITIAL_USERS);
    setClasses(INITIAL_CLASSES);
    setAdmissions(INITIAL_ADMISSIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setTests(INITIAL_TESTS);
    setResults(INITIAL_RESULTS);
    setNotices(INITIAL_NOTICES);
    setFees(INITIAL_FEES);
    setLeaves(INITIAL_LEAVES);

    localStorage.setItem('aether_school_config', JSON.stringify(INITIAL_SCHOOL_CONFIG));
    localStorage.setItem('aether_users', JSON.stringify(INITIAL_USERS));
    localStorage.setItem('aether_classes', JSON.stringify(INITIAL_CLASSES));
    localStorage.setItem('aether_admissions', JSON.stringify(INITIAL_ADMISSIONS));
    localStorage.setItem('aether_attendance', JSON.stringify(INITIAL_ATTENDANCE));
    localStorage.setItem('aether_assignments', JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem('aether_tests', JSON.stringify(INITIAL_TESTS));
    localStorage.setItem('aether_results', JSON.stringify(INITIAL_RESULTS));
    localStorage.setItem('aether_notices', JSON.stringify(INITIAL_NOTICES));
    localStorage.setItem('aether_fees', JSON.stringify(INITIAL_FEES));
    localStorage.setItem('aether_leaves', JSON.stringify(INITIAL_LEAVES));
    localStorage.setItem('aether_reset_trigger', Date.now().toString());

    showToast('All system data restored to factory pristine state!');
  };

  return (
    <SchoolDataContext.Provider value={{
      schoolConfig,
      updateSchoolConfig,
      theme,
      toggleTheme,
      currentUser,
      activeTab,
      setActiveTab,
      loginAsRole,
      loginWithCredentials,
      logout,
      toast,
      showToast,
      // Data collections
      users,
      classes,
      admissions,
      attendance,
      assignments,
      tests,
      results,
      notices,
      fees,
      leaves,
      // Methods
      submitAdmissionApplication,
      verifyAdmissionDocument,
      approveAdmission,
      rejectAdmission,
      addUser,
      deleteUser,
      markBulkAttendance,
      createAssignment,
      submitAssignment,
      gradeAssignmentSubmission,
      createTest,
      submitTestAttempt,
      publishResult,
      createNotice,
      deleteNotice,
      payFee,
      submitLeaveRequest,
      approveLeaveRequest,
      rejectLeaveRequest,
      resetAllDataToDefault
    }}>
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within a SchoolDataProvider');
  }
  return context;
};