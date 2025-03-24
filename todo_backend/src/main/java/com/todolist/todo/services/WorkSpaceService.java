package com.todolist.todo.services;


import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface WorkSpaceService {
    WorkSpaceDTO createWorkSpace(@Valid CreateWorkSpaceRequest createWorkSpaceRequest);

    List<WorkSpaceDTO> getAllWorkspaces();

    WorkSpaceDTO updateWorkSpace(Long id, @Valid CreateWorkSpaceRequest updateWorkSpaceRequest);

    void deleteWorkSpace(Long id);
}
