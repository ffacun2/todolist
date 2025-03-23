package com.todolist.todo.model.dto;

import com.todolist.todo.utils.State;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTaskRequest {

    @NotBlank
    @Size(min = 3, max = 40, message = "title must be between 1 and 40 characters")
    private String title;
    @Size(max = 200, message = "title cannot exceed 200 characters")
    private String description;

    private State stateTask;

    private String priority;

    private LocalDateTime modifiedDate;
}
