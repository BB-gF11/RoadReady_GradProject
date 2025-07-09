import { UsersThree, Student, User, Exam, TelegramLogo, Buildings, ChartBar, Notepad, ListChecks, CircleNotch } from "phosphor-react";

export const sidebarConfig = {
  STUDENT: [
    { index: 0, icon: <TelegramLogo />, path: '/app' },
    { index: 1, icon: <CircleNotch />, path: '/StudentProgressPage' },
    { index: 2, icon: <Buildings />, path: 'display/AllSchoolsStudent' },
    { index: 3, icon: <Exam />, path: '/exam' },
  ],
  INSTRUCTOR: [
    { index: 0, icon: <TelegramLogo />, path: '/app' },
    { index: 1, icon: <Notepad />, path: '/instructors/profil' },
    { index: 2, icon: <Student />, path: '/instructors/student' },
  ],
  SCHOOL: [
    { index: 0, icon: <TelegramLogo />, path: '/app' },
    { index: 1, icon: <ChartBar />, path: '/admin/AdminProfile' },
    { index: 2, icon: <User />, path: '/admin/instructors' },
  ]
};
