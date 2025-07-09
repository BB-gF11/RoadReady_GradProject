package com.backend3.project3.RoadReady3.dto;

public class DashboardOverviewDTO {
    private long totalInstructors;
    private long totalStudents;
    private long totalCourses;
    private long systemLogs;

// Getters and Setters

    public long getTotalInstructors() {
        return totalInstructors;
    }

    public void setTotalInstructors(long totalInstructors) {
        this.totalInstructors = totalInstructors;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getSystemLogs() {
        return systemLogs;
    }

    public void setSystemLogs(long systemLogs) {
        this.systemLogs = systemLogs;
    }


}
