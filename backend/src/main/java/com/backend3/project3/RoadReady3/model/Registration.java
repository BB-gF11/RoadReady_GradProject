package com.backend3.project3.RoadReady3.model;

public class Registration {
    private String registrationId;
    private String studentId;
    private String instructorLicenseId;
    private String registrationDate;
    private boolean isFinish;
    private String endDate;

    public Registration() {
    }

    public Registration(String studentId, String instructorLicenseId) {
        this.studentId = studentId;
        this.instructorLicenseId = instructorLicenseId;
    }

    public Registration(String registrationId, String studentId, String instructorLicenseId, String registrationDate, boolean isFinish, String endDate) {
        this.registrationId = registrationId;
        this.studentId = studentId;
        this.instructorLicenseId = instructorLicenseId;
        this.registrationDate = registrationDate;
        this.isFinish = isFinish;
        this.endDate = endDate;
    }

    public String getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getInstructorLicenseId() {
        return instructorLicenseId;
    }

    public void setInstructorLicenseId(String instructorLicenseId) {
        this.instructorLicenseId = instructorLicenseId;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public boolean isFinish() {
        return isFinish;
    }

    public void setFinish(boolean finish) {
        this.isFinish = finish;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
