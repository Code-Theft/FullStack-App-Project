package com.example.SpringMongoProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="students")
public class Student {

    @Id
    private String _id;

//    private String rid;
    private String studentName;
    private String studentClass;
    private String studentDiv;
    private String studentDOB;
    private String studentGender;

    public Student(String _id, String studentName, String studentClass, String studentDiv, String studentDOB, String studentGender) {
        this._id = CustomIdGenerator.generateId();
//        this.rid=CustomIdGenerator.generateId();
        this.studentName = studentName;
        this.studentClass = studentClass;
        this.studentDiv = studentDiv;
        this.studentDOB = studentDOB;
        this.studentGender = studentGender;
    }



    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public String getStudentDiv() {
        return studentDiv;
    }

    public void setStudentDiv(String studentDiv) {
        this.studentDiv = studentDiv;
    }

    public String getStudentDOB() {
        return studentDOB;
    }

    public void setStudentDOB(String studentDOB) {
        this.studentDOB = studentDOB;
    }

    public String getStudentGender() {
        return studentGender;
    }

    public void setStudentGender(String studentGender) {
        this.studentGender = studentGender;
    }


    @Override
    public String toString() {
        return "Student{" +
                "_id='" + _id + '\'' +
                ", studentName='" + studentName + '\'' +
                ", studentClass='" + studentClass + '\'' +
                ", studentDiv='" + studentDiv + '\'' +
                ", studentDOB='" + studentDOB + '\'' +
                ", studentGender='" + studentGender + '\'' +
                '}';
    }
}