package com.backend3.project3.RoadReady3.model;

public class Instructor {
    private String instructorId;
    private String bio;
    private String name;
    private String phone;
    private String schoolId;

    public Instructor() {
    }

    public Instructor(String instructorId, String bio, String name, String phone, String schoolId) {
        this.instructorId = instructorId;
        this.bio = bio;
        this.name = name;
        this.phone = phone;
        this.schoolId = schoolId;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }
}
