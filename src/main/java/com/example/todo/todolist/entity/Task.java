package com.example.todo.todolist.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    private Long id;

    private String description;

    private boolean completed;
}