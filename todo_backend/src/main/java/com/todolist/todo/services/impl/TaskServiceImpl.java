package com.todolist.todo.services.impl;

import com.todolist.todo.exception.ResourceNotFoundException;
import com.todolist.todo.model.dto.CreateTaskRequest;
import com.todolist.todo.model.dto.TaskDTO;
import com.todolist.todo.model.dto.UpdateTaskRequest;
import com.todolist.todo.model.entity.Task;
import com.todolist.todo.model.entity.WorkSpace;
import com.todolist.todo.model.mapper.TaskMapper;
import com.todolist.todo.repositories.TaskRepository;
import com.todolist.todo.repositories.WorkSpaceRepository;
import com.todolist.todo.services.TaskService;
import com.todolist.todo.utils.State;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final WorkSpaceRepository workSpaceRepository;
    private final TaskMapper taskMapper;


    @Override
    public TaskDTO createTask(CreateTaskRequest createTaskRequest) {

        WorkSpace workSpace = workSpaceRepository.findById(createTaskRequest.getWorkSpaceID())
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro el espacio de trabajo"));

        Task task = taskMapper.toEntity(createTaskRequest);
        task.setCreatedDate(LocalDateTime.now());
        task.setModifiedDate(LocalDateTime.now());
        task.setWorkspace(workSpace);

        Task saveTask = taskRepository.save(task);

        return taskMapper.toDTO(saveTask);
    }

    @Override
    public TaskDTO updateTask(Long id, UpdateTaskRequest updateTaskRequest) {
        Task existingTask = taskRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        taskMapper.updateTaskFromDTO(updateTaskRequest, existingTask);
        existingTask.setModifiedDate(LocalDateTime.now());

        Task updatedTask = taskRepository.save(existingTask);

        return taskMapper.toDTO(updatedTask);
    }

    @Override
    public TaskDTO updateTaskStatus(Long id, State state) {
        Task existingTask = taskRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        existingTask.setTaskState(state);
        existingTask.setModifiedDate(LocalDateTime.now());

        Task updatedTask = taskRepository.save(existingTask);

        return taskMapper.toDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        taskRepository.delete(existingTask);
    }

    public List<TaskDTO> getTasksByWorkspaceId (Long workSpaceID) {
        if (!workSpaceRepository.existsById(workSpaceID)) {
            throw new ResourceNotFoundException("No se encontro el espacio de trabajo "+workSpaceID);
        }
        return taskMapper.toDTOList(taskRepository.getTasksByWorkspaceId(workSpaceID));
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskMapper.toDTOList(taskRepository.findAll());
    }

}
