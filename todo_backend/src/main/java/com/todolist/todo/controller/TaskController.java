package com.todolist.todo.controller;

import com.todolist.todo.model.dto.CreateTaskRequest;
import com.todolist.todo.model.dto.TaskDTO;
import com.todolist.todo.model.dto.UpdateTaskRequest;
import com.todolist.todo.services.TaskService;
import com.todolist.todo.utils.State;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.createTask(createTaskRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> list = taskService.getAllTasks();
        System.out.println(list.getFirst().getCreatedDate());
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest updateTaskRequest) {
        return new ResponseEntity<>(taskService.updateTask(id, updateTaskRequest), HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskDTO> updateTaskStatus(
            @PathVariable Long id,
            @RequestParam State state) {
        return new ResponseEntity<>(taskService.updateTaskStatus(id, state), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
