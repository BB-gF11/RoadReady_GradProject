package com.backend3.project3.RoadReady3.dto;

import com.backend3.project3.RoadReady3.model.User;

import java.util.List;

public class SchoolHierarchyResponse {

    public static class SchoolWithInstructors {
        private User school;
        private List<InstructorWithStudents> instructors;

        public SchoolWithInstructors() {}

        public SchoolWithInstructors(User school, List<InstructorWithStudents> instructors) {
            this.school = school;
            this.instructors = instructors;
        }

        public User getSchool() {
            return school;
        }

        public void setSchool(User school) {
            this.school = school;
        }

        public List<InstructorWithStudents> getInstructors() {
            return instructors;
        }

        public void setInstructors(List<InstructorWithStudents> instructors) {
            this.instructors = instructors;
        }
    }

    public static class InstructorWithStudents {
        private User instructor;
        private List<User> students;

        public InstructorWithStudents() {}

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
}
