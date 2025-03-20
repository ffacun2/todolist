package com.todolist.todo.model.entity;

import com.todolist.todo.utils.State;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String title;

    @Column(length = 200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private State taskState;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    @PrePersist
    public void prePersist() {
        if (taskState == null)
            taskState = State.PENDING;
    }

}
