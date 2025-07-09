import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Stack } from '@mui/material';
import SideBar from "./SideBar";

const DashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
  const roleFromStorage = localStorage.getItem('role');

  if (!isLoggedIn && !currentPath.startsWith('/auth')) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <Stack direction='row'>
      <SideBar role={roleFromStorage} />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;




