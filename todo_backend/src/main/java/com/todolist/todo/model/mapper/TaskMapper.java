package com.todolist.todo.model.mapper;

import com.todolist.todo.model.dto.CreateTaskRequest;
import com.todolist.todo.model.dto.TaskDTO;
import com.todolist.todo.model.dto.UpdateTaskRequest;
import com.todolist.todo.model.entity.Task;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface TaskMapper {

    TaskDTO toDTO(Task task);

    List<TaskDTO> toDTOList(List<Task> tasks);

    Task toEntity(CreateTaskRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTaskFromDTO(UpdateTaskRequest request, @MappingTarget Task task);
}
