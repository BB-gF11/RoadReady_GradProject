package com.backend3.project3.RoadReady3.model;

public class School {
    private String schoolId;
    private String name;
    private String location;
    private String email;
    private String phone;
    private String enrollAt;
    private String taxNumber;
    private String commercialNumber;

    public School() {
    }

    public School(String schoolId, String name, String location, String email, String phone, String enrollAt, String taxNumber, String commercialNumber) {
        this.schoolId = schoolId;
        this.name = name;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.enrollAt = enrollAt;
        this.taxNumber = taxNumber;
        this.commercialNumber = commercialNumber;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEnrollAt() {
        return enrollAt;
    }

    public void setEnrollAt(String enrollAt) {
        this.enrollAt = enrollAt;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getCommercialNumber() {
        return commercialNumber;
    }

    public void setCommercialNumber(String commercialNumber) {
        this.commercialNumber = commercialNumber;
    }
}
