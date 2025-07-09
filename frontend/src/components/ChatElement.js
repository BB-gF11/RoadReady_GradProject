import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StyledBadge from './StyledBadge';

const ChatElement = ({ id, receiverName, img, lastMessage, time, online, unread, onClick, chat }) => {
  const name = receiverName;
  const theme = useTheme();

  const lastMsg =
    lastMessage ||
    (Array.isArray(chat?.messages) && chat.messages.length > 0
      ? chat.messages[chat.messages.length - 1].message
      : "");

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        }
      }}
      p={2}
      onClick={handleClick}
    >
      <Stack direction="row" alignItems='center' justifyContent='space-between'>
        <Stack direction='row' spacing={2}>
          {online ? (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>
              {name}
            </Typography>
            <Typography variant='caption' noWrap>
              {lastMsg}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} alignItems='center'>
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {time?.match(/\d{2}:\d{2}/)?.[0] || " "}
          </Typography>
          <Badge color='primary' badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
