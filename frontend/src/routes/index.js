import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
import HomeLayout from "../layouts/home";
import DisplayLayout from "../layouts/display";
import ProfileLayout from "../layouts/profile";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout />,
      children: [
        { element: <LoginPage />, path: 'login' },
        { element: <RegisterPage />, path: 'register' },
        { element: <ResetPasswordPage />, path: 'reset-password' },
        { element: <NewPasswordPage />, path: 'new-password' },
      ]
    },
    {
      path: "/",
      element: <ProfileLayout />,
      children: [
        { element: <SchoolProfilePage />, path: 'schoolProfile' },
      ]
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { element: <HomeLayout />, index: true },
      ]
    },
    {
      path: "/",
      element: <DisplayLayout />,
      children: [
        { path: "AllSchool", element: <AllSchoolPage /> },
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "exam", element: <ExamPage /> },
        { path: "admin/instructors", element: <InstructorsPage /> },
        { path: "admin/instructor/:instructorId/students", element: <InstructorStudents /> },
        { path: "admin/AdminProfile", element: <AdminStatasPage /> },
        { path: "display/AllSchoolsStudent", element: <SchoolStudentPage /> },
        { path: "display/SchoolProfileStudent", element: <SchoolProfileStudentPage /> },
        { path: "instructors/student", element: <StudentPage /> },
        { path: "instructors/profil", element: <StudentFeadbackPage /> },
        { path: "StudentProgressPage", element: <StudentProgressPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);

const ExamPage = Loadable(
  lazy(() => import("../pages/dashboard/Exam")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const AllSchoolPage = Loadable(
  lazy(() => import("../pages/display/AllSchool")),
);

const SchoolStudentPage = Loadable(
  lazy(() => import("../pages/dashboard/display/AllSchoolsStudent")),
);

const InstructorsPage = Loadable(
  lazy(() => import("../pages/dashboard/admin/instructors")),
);

const StudentPage = Loadable(
  lazy(() => import("../pages/dashboard/instructors/student")),
);

const InstructorStudents = Loadable(
  lazy(() => import("../pages/dashboard/admin/InstructorStudents")),
);

const SchoolProfilePage = Loadable(
  lazy(() => import("../pages/display/schoolProfile")),
);

const SchoolProfileStudentPage = Loadable(
  lazy(() => import("../pages/dashboard/display/SchoolProfileStudent")),
);

const AdminStatasPage = Loadable(
  lazy(() => import("../pages/dashboard/admin/AdminProfile")),
);

const StudentFeadbackPage = Loadable(
  lazy(() => import("../pages/dashboard/instructors/profil")),
);

const StudentProgressPage = Loadable(
  lazy(() => import("../pages/dashboard/StudentProgressPage")),
);


const Page404 = Loadable(lazy(() => import("../pages/Page404")));