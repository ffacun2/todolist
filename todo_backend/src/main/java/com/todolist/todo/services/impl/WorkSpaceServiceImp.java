package com.todolist.todo.services.impl;

import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import com.todolist.todo.repositories.WorkSpaceRepository;
import com.todolist.todo.services.WorkSpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkSpaceServiceImp implements WorkSpaceService {

    private final WorkSpaceRepository workSpaceRepository;

    @Override
    public WorkSpaceDTO createWorkSpace(CreateWorkSpaceRequest createWorkSpaceRequest) {
        return null;
    }

    @Override
    public List<WorkSpaceDTO> getAllWorkspaces() {
        return List.of();
    }

    @Override
    public WorkSpaceDTO updateWorkSpace(Long id, CreateWorkSpaceRequest updateWorkSpaceRequest) {
        return null;
    }

    @Override
    public void deleteWorkSpace(Long id) {

    }
}
