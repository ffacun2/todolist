package com.todolist.todo.services;


import com.todolist.todo.model.dto.CreateTaskRequest;
import com.todolist.todo.model.dto.TaskDTO;
import com.todolist.todo.model.dto.UpdateTaskRequest;
import com.todolist.todo.utils.State;

import java.util.List;

public interface TaskService {

    TaskDTO createTask(CreateTaskRequest createTaskRequest);

    TaskDTO updateTask(Long id,UpdateTaskRequest updateTaskRequest);

    TaskDTO updateTaskStatus(Long id, State state);

    void deleteTask(Long id);

    List<TaskDTO> getAllTasks();
}
