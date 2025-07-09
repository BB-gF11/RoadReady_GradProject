package com.backend3.project3.RoadReady3.model;

public class Answer {
    private String questionId;
    private int selectedOption;
    private int correctAnswer;
    private boolean isCorrect;

    public Answer() {
    }

    public Answer(String questionId, int selectedOption, int correctAnswer, boolean isCorrect) {
        this.questionId = questionId;
        this.selectedOption = selectedOption;
        this.correctAnswer = correctAnswer;
        this.isCorrect = isCorrect;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public int getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(int selectedOption) {
        this.selectedOption = selectedOption;
    }

    public int getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(int correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
