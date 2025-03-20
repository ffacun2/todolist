package com.todolist.todo.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.todolist.todo.utils.State;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTaskRequest {

    @NotBlank
    @Size(min = 3, max = 40, message = "Title must be between 3 and 200 characters")
    private String title;

    @Size(max = 200, message = "Description cannot exceed 200 characters")
    private String description;

}
