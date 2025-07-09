import React, { useEffect, useState } from 'react';
import {
  Box, Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  CheckCircle,
  XCircle,
  WarningCircle,
  Alarm
} from 'phosphor-react';

const Exam = () => {
  const theme = useTheme();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [result, setResult] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isExamClosed, setIsExamClosed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token missing. Please login first.");
      setLoading(false);
      return;
    }

    fetch('http://localhost:8080/exams/101/questions', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const questionsArray = Object.values(data);
        setQuestions(questionsArray);
        setAnswers(Array(questionsArray.length).fill(null));
        setAnswered(Array(questionsArray.length).fill(false));
        setResult(Array(questionsArray.length).fill(null));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
        setError("Failed to fetch questions. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isExamFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsExamClosed(true);
    }
  }, [timeLeft, isExamFinished]);

  const formatTime = time => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const getQuestionColor = i => {
    if (answered[i]) return result[i] === 'correct' ? theme.palette.success.main : theme.palette.error.main;
    if (answers[i] !== null) return theme.palette.warning.main;
    return theme.palette.grey[400];
  };

  const correctCount = result.filter(r => r === 'correct').length;
  const incorrectCount = result.filter(r => r === 'incorrect').length;
  const unansweredCount = answered.filter(a => !a).length;

  const calculateScore = () => {
    return Math.round((correctCount / questions.length) * 100);
  };


  const handleFinishExam = () => {
    const score = calculateScore();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('userId');

    if (!token) {
      setError("Authorization token missing. Please login first.");
      return;
    }

    const payload = {
      userId: userId,
      examId: questions[0]?.examId,
      responses: answers.map((ans, i) => ({
        questionId: questions[i].id,
        selectedOption: ans === null ? -1 : ans,
        correctAnswer: questions[i].correctAnswer,
        isCorrect: ans === questions[i].correctAnswer,
      })),
      score,
    };
    console.log("Submitting payload:", payload);

    fetch('http://localhost:8080/responses/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => setIsExamFinished(true))
      .catch(() => setIsExamFinished(true));
  };

  if (loading) return <div>Loading exam questions...</div>;

  if (error) return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" color="error" gutterBottom>{error}</Typography>
      <Typography variant="body1">Please login and reload the page.</Typography>
    </Box>
  );

  if (!questions.length) return <div>No questions available</div>;

  return (
    <Stack direction="column" sx={{ width: '100%', height: '100vh' }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          py: 2,
          borderBottom: '1px solid #ccc',
          background: '#fff',
        }}
      >
        <SummaryCircle
          color={theme.palette.success.main}
          value={correctCount}
          label="Correct"
          icon={<CheckCircle weight="fill" size={60} />}
        />
        <SummaryCircle
          color={theme.palette.error.main}
          icon={<XCircle weight="fill" size={60} />}
          value={incorrectCount}
          label="Incorrect"
        />
        <SummaryCircle
          color={theme.palette.info.main}
          icon={<WarningCircle weight="fill" size={60} />}
          value={questions.length}
          label="Total"
        />
        <SummaryCircle
          color={theme.palette.warning.main}
          icon={<Alarm weight="fill" size={60} />}
          value={unansweredCount}
          label="Unanswered"
        />
      </Box>

      <Stack direction="row" sx={{ flex: 1 }}>
        <Box sx={{ width: '25%', background: '#F8FAFF', p: 4 }}>
          <Typography variant="h5" mb={2}>Theory Exam</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1 }}>
            {questions.map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  backgroundColor: getQuestionColor(i),
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
              >
                {i + 1}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: '50%', p: 4 }}>
          <Typography variant="h4" fontWeight={600}>{questions[currentQuestion]?.question}</Typography>
          <Typography variant="body1" mt={2}>{questions[currentQuestion]?.description}</Typography>

          <Stack spacing={2} mt={4}>
            {questions[currentQuestion]?.options.map((opt, idx) => (
              <Button
                key={idx}
                variant="outlined"
                disabled={isExamClosed || answered[currentQuestion]}
                onClick={() => {
                  const newAnswers = [...answers];
                  const newAnswered = [...answered];
                  const newResult = [...result];

                  newAnswers[currentQuestion] = idx;
                  newAnswered[currentQuestion] = true;
                  newResult[currentQuestion] = idx === questions[currentQuestion].correctAnswer ? 'correct' : 'incorrect';

                  setAnswers(newAnswers);
                  setAnswered(newAnswered);
                  setResult(newResult);
                }}
                sx={{
                  backgroundColor: answered[currentQuestion]
                    ? (idx === questions[currentQuestion].correctAnswer
                      ? theme.palette.success.main
                      : answers[currentQuestion] === idx
                        ? theme.palette.error.main
                        : 'white')
                    : answers[currentQuestion] === idx
                      ? theme.palette.warning.light
                      : 'white',
                  border: answers[currentQuestion] === idx
                    ? `2px solid ${theme.palette.warning.main}`
                    : '1px solid #ddd',
                  color: answered[currentQuestion] && idx === questions[currentQuestion].correctAnswer ? '#fff' : '#000',
                  textTransform: 'none'
                }}
              >
                {opt}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="outlined"
              onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
              disabled={currentQuestion === 0 || isExamClosed}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1))}
              disabled={currentQuestion === questions.length - 1 || isExamClosed}
            >
              Next
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 'auto' }}
              onClick={handleFinishExam}
              disabled={isExamClosed}
            >
              Finish Exam
            </Button>
          </Stack>
        </Box>

        <Box sx={{ width: '25%', background: '#F8FAFF', p: 4 }}>
          <Typography variant="h6" mb={1}>Time Left</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Alarm size={28} />
            <Typography variant="h4" color={timeLeft < 90 ? 'error' : 'text.primary'}>
              {formatTime(timeLeft)}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Dialog
        open={isExamFinished || isExamClosed}
        onClose={() => { }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { zIndex: 1300, borderRadius: 3, p: 3 } }}
      >
        <DialogTitle>Exam Results</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} alignItems="center">
            <SummaryCircle
              color={theme.palette.success.main}
              icon={<CheckCircle weight="fill" size={24} />}
              value={correctCount}
              label="Correct"
            />
            <SummaryCircle
              color={theme.palette.error.main}
              icon={<XCircle weight="fill" size={24} />}
              value={incorrectCount}
              label="Incorrect"
            />
            <SummaryCircle
              color={theme.palette.info.main}
              icon={<WarningCircle weight="fill" size={24} />}
              value={questions.length}
              label="Total"
            />
            <SummaryCircle
              color={theme.palette.warning.main}
              icon={<Alarm weight="fill" size={24} />}
              value={unansweredCount}
              label="Unanswered"
            />
            <Typography variant="h5">Score: {calculateScore()}%</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.reload()}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

const SummaryCircle = ({ icon, label, value, color }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        minWidth: 120,
        justifyContent: 'center',
      }}
    >
      {icon}
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" color={color}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Exam;