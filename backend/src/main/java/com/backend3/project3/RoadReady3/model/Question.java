package com.backend3.project3.RoadReady3.model;

import java.util.List;

public class Question {
    private String id;
    private String question;
    private String description;
    private List<String> options;
    private int correctAnswer;
    private String examId;

    public Question() {
    }

    public Question(String id, String question, String description, List<String> options, int correctAnswer, String examId) {
        this.id = id;
        this.question = question;
        this.description = description;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.examId = examId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(int correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }
}
