package com.backend3.project3.RoadReady3.model;


public class Request {

    private String requestId;
    private String studentId;
    private String instructorId;
    private String status;

    public Request() {
    }

    public Request(String requestId, String studentId, String instructorId, String status) {
        this.requestId = requestId;
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.status = status;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
