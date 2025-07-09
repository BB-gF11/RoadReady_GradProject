import React from 'react';
import { Avatar, Box, Typography, IconButton, Divider, Stack } from '@mui/material';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../../redux/slices/app';
import useHeaderData from '../../hooks/useHeaderData';

const Header = ({ receiverName, messages_data, chat }) => {

    const { userData, loading, error } = useHeaderData();
    const { avatar, online } = messages_data || {};
    const onlineStatus = online === 'online';
    const dispatch = useDispatch();
    const theme = useTheme();

    if (loading) return <Typography variant="body2" color="textSecondary">Loading...</Typography>;
    if (error) return <Typography variant="body2" color="error">{error}</Typography>;


    return (
        <Box p={2} sx={{
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
            boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
        }}>
            <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
                sx={{ width: '100%', height: '100%' }}>
                <Stack onClick={() => { dispatch(ToggleSidebar()); }} direction={'row'} spacing={2}>
                    <Box>
                        <Avatar alt={receiverName} src={avatar} />
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>{receiverName}</Typography>
                        <Typography variant='caption'>{online ? 'Online' : 'Offline'}</Typography>
                    </Stack>
                </Stack>

                <Stack direction='row' alignItems='center' spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Header;
