package com.backend3.project3.RoadReady3.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public class InstructorDTO {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
        private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;
    public InstructorDTO() {}

    public InstructorDTO(String email, String password, String fullName) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

}
