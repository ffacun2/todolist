package com.todolist.todo.model.dto;

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
@Data
public class CreateTaskRequest {

    @NotBlank
    @Size(min = 1, max = 40, message = "Title must be between 1 and 200 characters")
    private String title;

    @Size(max = 200, message = "Description cannot exceed 200 characters")
    private String description;

    @Size(min =3, max = 20, message = "Priority must be between 3 and 20 characters")
    private String priority;

    private State taskState;

    private Long workSpaceID;

}
