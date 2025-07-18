package com.backend3.project3.RoadReady3.model;

public class Student {
    private String studentId;
    private String name;
    private String email;
    private String password;
    private String phone;

    public Student() {
    }

    public Student(String studentId, String name, String email, String password, String phone) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
