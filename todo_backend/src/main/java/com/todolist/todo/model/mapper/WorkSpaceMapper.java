package com.todolist.todo.model.mapper;

import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.UpdateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import com.todolist.todo.model.entity.WorkSpace;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface WorkSpaceMapper {

    WorkSpaceDTO toDTO(WorkSpace workspace);

    List<WorkSpaceDTO> toDtoList(List<WorkSpace> workspaces);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    WorkSpace toEntity(CreateWorkSpaceRequest createWorkspaceRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    void updateWorkspaceFromDto(UpdateWorkSpaceRequest updateWorkspaceRequest, @MappingTarget WorkSpace workspace);
}
