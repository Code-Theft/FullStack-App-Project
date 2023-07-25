package com.example.SpringMongoProject.Repo;

import com.example.SpringMongoProject.Entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends MongoRepository<Student, String> {
    Student findByStudentNameAndStudentClassAndStudentDiv(String studentName, String studentClass, String studentDiv);
}