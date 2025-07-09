package com.backend3.project3.RoadReady3.dto;

import com.backend3.project3.RoadReady3.model.User;
import java.util.List;

public class InstructorWithStudents {
    private User instructor;
    private List<User> students;

    public InstructorWithStudents(User instructor, List<User> students) {
        this.instructor = instructor;
        this.students = students;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }
}
