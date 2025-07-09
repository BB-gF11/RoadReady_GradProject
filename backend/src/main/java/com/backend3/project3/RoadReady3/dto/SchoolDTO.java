package com.backend3.project3.RoadReady3.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public class SchoolDTO {


    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
        private String email;
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "School name is required")
    private String schoolName;
    @NotBlank(message = "Location is required")
    private String location;

    public SchoolDTO() {}

    public SchoolDTO(String email, String password, String schoolName, String location) {
        this.email = email;
        this.password = password;
        this.schoolName = schoolName;
        this.location = location;
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

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
