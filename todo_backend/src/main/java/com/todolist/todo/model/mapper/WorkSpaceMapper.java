package com.todolist.todo.model.mapper;

import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.UpdateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import com.todolist.todo.model.entity.WorkSpace;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface WorkSpaceMapper {

    WorkSpaceDTO toDto(WorkSpace workspace);

    List<WorkSpaceDTO> toDtoList(List<WorkSpace> workspaces);

    WorkSpace toEntity(CreateWorkSpaceRequest createWorkspaceRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateWorkspaceFromDto(UpdateWorkSpaceRequest updateWorkspaceRequest, @MappingTarget WorkSpace workspace);
}
