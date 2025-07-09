package com.backend3.project3.RoadReady3.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private String licenseeName;

    @NotBlank(message = "Role is required")
    private String role;

    public UserDTO() {}

    public UserDTO(String email, String password, String firstName, String lastName, String licenseeName, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.licenseeName = licenseeName;
        this.role = role;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getLicenseeName() { return licenseeName; }
    public void setLicenseeName(String licenseeName) { this.licenseeName = licenseeName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
