import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Coffee,
  Radio
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const SCHEDULE_DATA = {
  Monday: [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Advanced Physics', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Pure Mathematics', teacher: 'Prof. Kenneth Cole', room: 'Hall 301', code: 'MAT-201', color: 'blue' },
    { period: 3, time: '10:20 - 11:10 AM', subject: 'Computer Science & AI', teacher: 'Dr. Priya Nair', room: 'Turing Computer Lab', code: 'CS-301', color: 'indigo' },
    { period: 'BREAK', time: '11:10 - 11:40 AM', subject: 'Recess & Organic Nutrition Break', teacher: 'Campus Cafeteria', room: 'Green Courtyard', isBreak: true },
    { period: 4, time: '11:40 - 12:30 PM', subject: 'Chemistry & Nanomaterials', teacher: 'Dr. Meera Sen', room: 'Curie Lab 2', code: 'CHM-102', color: 'emerald' },
    { period: 5, time: '12:35 - 01:25 PM', subject: 'English Communicative', teacher: 'Mrs. Anupama Sharma', room: 'Room 302', code: 'ENG-101', color: 'amber' },
    { period: 6, time: '01:30 - 02:20 PM', subject: 'Social Science & Civics', teacher: 'Mr. R.K. Swaminathan', room: 'Room 304', code: 'SOC-101', color: 'purple' },
    { period: 7, time: '02:25 - 03:15 PM', subject: 'Autonomous Robotics Workshop', teacher: 'Dr. Priya Nair', room: 'FabLab MakerSpace', code: 'ROB-401', color: 'rose' }
  ],
  Tuesday: [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Pure Mathematics', teacher: 'Prof. Kenneth Cole', room: 'Hall 301', code: 'MAT-201', color: 'blue' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Advanced Physics (Lab)', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 3, time: '10:20 - 11:10 AM', subject: 'Advanced Physics (Lab)', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 'BREAK', time: '11:10 - 11:40 AM', subject: 'Recess & Student Lounge', teacher: 'Campus Cafeteria', room: 'Green Courtyard', isBreak: true },
    { period: 4, time: '11:40 - 12:30 PM', subject: 'Biology & Genetics', teacher: 'Dr. V. Raman', room: 'Bio Discovery Lab', code: 'BIO-101', color: 'emerald' },
    { period: 5, time: '12:35 - 01:25 PM', subject: 'Social Science & Civics', teacher: 'Mr. R.K. Swaminathan', room: 'Room 304', code: 'SOC-101', color: 'purple' },
    { period: 6, time: '01:30 - 02:20 PM', subject: 'English Communicative', teacher: 'Mrs. Anupama Sharma', room: 'Room 302', code: 'ENG-101', color: 'amber' },
    { period: 7, time: '02:25 - 03:15 PM', subject: 'Physical Education & Athletics', teacher: 'Coach Sandhu', room: 'Sports Arena', code: 'PHE-101', color: 'teal' }
  ],
  Wednesday: [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Computer Science & AI', teacher: 'Dr. Priya Nair', room: 'Turing Computer Lab', code: 'CS-301', color: 'indigo' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Pure Mathematics', teacher: 'Prof. Kenneth Cole', room: 'Hall 301', code: 'MAT-201', color: 'blue' },
    { period: 3, time: '10:20 - 11:10 AM', subject: 'Advanced Physics', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 'BREAK', time: '11:10 - 11:40 AM', subject: 'Recess & Library Reading', teacher: 'Campus Cafeteria', room: 'Green Courtyard', isBreak: true },
    { period: 4, time: '11:40 - 12:30 PM', subject: 'Chemistry (Organic Analysis)', teacher: 'Dr. Meera Sen', room: 'Curie Lab 2', code: 'CHM-102', color: 'emerald' },
    { period: 5, time: '12:35 - 01:25 PM', subject: 'English Creative Writing', teacher: 'Mrs. Anupama Sharma', room: 'Room 302', code: 'ENG-101', color: 'amber' },
    { period: 6, time: '01:30 - 02:20 PM', subject: 'CBSE Board Prep Seminar', teacher: 'Dr. Priya Nair', room: 'Hall 301', code: 'SEM-101', color: 'cyan' },
    { period: 7, time: '02:25 - 03:15 PM', subject: 'Club Activity & Debate', teacher: 'Faculty Council', room: 'Open Amphitheatre', code: 'ACT-101', color: 'rose' }
  ],
  Thursday: [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Advanced Physics', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Chemistry & Nanomaterials', teacher: 'Dr. Meera Sen', room: 'Curie Lab 2', code: 'CHM-102', color: 'emerald' },
    { period: 3, time: '10:20 - 11:10 AM', subject: 'Pure Mathematics', teacher: 'Prof. Kenneth Cole', room: 'Hall 301', code: 'MAT-201', color: 'blue' },
    { period: 'BREAK', time: '11:10 - 11:40 AM', subject: 'Recess & Fruit Stall', teacher: 'Campus Cafeteria', room: 'Green Courtyard', isBreak: true },
    { period: 4, time: '11:40 - 12:30 PM', subject: 'Computer Science (Python Lab)', teacher: 'Dr. Priya Nair', room: 'Turing Computer Lab', code: 'CS-301', color: 'indigo' },
    { period: 5, time: '12:35 - 01:25 PM', subject: 'Social Science & Economics', teacher: 'Mr. R.K. Swaminathan', room: 'Room 304', code: 'SOC-101', color: 'purple' },
    { period: 6, time: '01:30 - 02:20 PM', subject: 'English Communicative', teacher: 'Mrs. Anupama Sharma', room: 'Room 302', code: 'ENG-101', color: 'amber' },
    { period: 7, time: '02:25 - 03:15 PM', subject: 'Autonomous Drone Pilot Lab', teacher: 'Dr. Priya Nair', room: 'FabLab MakerSpace', code: 'ROB-401', color: 'rose' }
  ],
  Friday: [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Pure Mathematics (Problem Solving)', teacher: 'Prof. Kenneth Cole', room: 'Hall 301', code: 'MAT-201', color: 'blue' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Advanced Physics (Problem Solving)', teacher: 'Dr. Priya Nair', room: 'Aryabhata Lab 301', code: 'PHY-101', color: 'cyan' },
    { period: 3, time: '10:20 - 11:10 AM', subject: 'Computer Science & AI', teacher: 'Dr. Priya Nair', room: 'Turing Computer Lab', code: 'CS-301', color: 'indigo' },
    { period: 'BREAK', time: '11:10 - 11:40 AM', subject: 'Recess & Campus Assembly', teacher: 'Campus Cafeteria', room: 'Green Courtyard', isBreak: true },
    { period: 4, time: '11:40 - 12:30 PM', subject: 'Biology & Genetics', teacher: 'Dr. V. Raman', room: 'Bio Discovery Lab', code: 'BIO-101', color: 'emerald' },
    { period: 5, time: '12:35 - 01:25 PM', subject: 'Chemistry Lab Practical', teacher: 'Dr. Meera Sen', room: 'Curie Lab 2', code: 'CHM-102', color: 'emerald' },
    { period: 6, time: '01:30 - 02:20 PM', subject: 'Chemistry Lab Practical', teacher: 'Dr. Meera Sen', room: 'Curie Lab 2', code: 'CHM-102', color: 'emerald' },
    { period: 7, time: '02:25 - 03:15 PM', subject: 'Weekly Academic Evaluation Recap', teacher: 'Faculty Council', room: 'Hall 301', code: 'REV-101', color: 'cyan' }
  ]
};

export const TimetableWidget = ({ defaultClass = 'Class X-A' }) => {
  const { classes } = useSchoolData();

  // Determine current day of week (or fallback to Monday)
  const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
  const initialDay = DAYS.includes(currentDayName) ? currentDayName : 'Monday';

  const [activeDay, setActiveDay] = useState(initialDay);
  const [selectedClass, setSelectedClass] = useState(defaultClass);

  // Ongoing period check (we simulate period 1 or 2 as active if within school hours, or fix to Period 1 for demo prominence)
  const isToday = activeDay === currentDayName;
  const currentOngoingPeriod = isToday ? 2 : 1; // Highlight period 2 for live demo feel

  const daySchedule = SCHEDULE_DATA[activeDay] || SCHEDULE_DATA.Monday;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white">
              Interactive Class Routine & Timetable
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time schedule matrix with subject faculties, room allocations, and live active session tracker.
          </p>
        </div>

        {/* Class Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Routine For:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
        {DAYS.map(day => {
          const isSelected = activeDay === day;
          const isDayToday = currentDayName === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              <span>{day}</span>
              {isDayToday && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  TODAY
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {daySchedule.map((slot, idx) => {
          if (slot.isBreak) {
            return (
              <div 
                key={`break-${idx}`} 
                className="col-span-1 md:col-span-2 lg:col-span-4 p-3 rounded-xl bg-slate-950/40 border border-dashed border-white/10 flex items-center justify-between text-xs text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-300">{slot.subject}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>{slot.time}</span>
                  <span className="text-slate-400">{slot.room}</span>
                </div>
              </div>
            );
          }

          const isOngoing = slot.period === currentOngoingPeriod;

          return (
            <motion.div
              key={`${activeDay}-${slot.period}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`relative rounded-xl p-4 border transition-all ${
                isOngoing 
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10' 
                  : 'bg-slate-950/60 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Ongoing Pill */}
              {isOngoing && (
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-mono font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-cyan-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  <span>LIVE NOW</span>
                </div>
              )}

              {/* Top metadata */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span className="font-bold text-cyan-400">Period {slot.period}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {slot.time}
                </span>
              </div>

              {/* Subject */}
              <div className="font-heading font-bold text-sm text-white mb-2 leading-tight">
                {slot.subject}
              </div>

              {/* Faculty & Room */}
              <div className="space-y-1 text-xs border-t border-white/5 pt-2.5">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{slot.teacher}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate font-mono text-[11px]">{slot.room}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};