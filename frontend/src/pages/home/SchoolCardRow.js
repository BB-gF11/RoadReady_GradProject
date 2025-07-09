import { Avatar, Box, Stack, Typography, Rating } from '@mui/material';
import React from 'react';

const SchoolCardRow = ({ school }) => {
  return (
    <Box
      sx={{
        minWidth: 200,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar src={school.img} alt={school.firstName} />
        <Stack spacing={0.5}>
          <Typography variant='subtitle2' fontWeight={600}>
            {school.firstName} {school.lastName}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {school.location}
          </Typography>
          <Rating
            value={parseFloat(school.rating)}
            precision={0.1}
            readOnly
            size='small'
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SchoolCardRow;
