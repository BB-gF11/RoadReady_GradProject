package com.backend3.project3.RoadReady3.model;


import java.util.Date;


public class Feedback {


    private String feedbackId;
    private String studentId;
    private String instructorId;
    private String comment;
    private int rating;
    private Date submitDate;

    public Feedback() {
    }

    public Feedback(String feedbackId, String studentId, String instructorId, String comment, int rating, Date submitDate) {
        this.feedbackId = feedbackId;
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.comment = comment;
        this.rating = rating;
        this.submitDate = submitDate;
    }

    public String getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(String feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(Date submitDate) {
        this.submitDate = submitDate;
    }
}
