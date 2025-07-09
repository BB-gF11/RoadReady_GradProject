package com.backend3.project3.RoadReady3.dto;

public class RegistrationDTO {
    private String studentId;
    private String instructorLicenseId;

    public RegistrationDTO() {}

    public RegistrationDTO(String studentId, String instructorLicenseId) {
        this.studentId = studentId;
        this.instructorLicenseId = instructorLicenseId;
    }

    //  Getters
    public String getStudentId() {
        return studentId;
    }

    public String getInstructorLicenseId() {
        return instructorLicenseId;
    }

    //  Setters
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setInstructorLicenseId(String instructorLicenseId) {
        this.instructorLicenseId = instructorLicenseId;
    }
}
