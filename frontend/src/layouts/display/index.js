import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from '@mui/material';

const DisplayLayout = () => {

  return (
    <>
      <Stack direction='row'>
        <Outlet />
      </Stack>
    </>
  );
};

export default DisplayLayout;