import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from '@mui/material';


const ProfileLayout = () => {

  return (
    <>
      <Stack >
        <Outlet />
      </Stack>
    </>
  );
};

export default ProfileLayout;