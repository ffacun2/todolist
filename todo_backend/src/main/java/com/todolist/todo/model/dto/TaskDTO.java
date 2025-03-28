package com.todolist.todo.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.todolist.todo.utils.Priority;
import com.todolist.todo.utils.State;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private State taskState;

    private Long workSpaceID;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedDate;
}
