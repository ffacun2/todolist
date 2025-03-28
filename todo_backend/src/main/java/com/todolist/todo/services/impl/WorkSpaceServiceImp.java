package com.todolist.todo.services.impl;

import com.todolist.todo.exception.ResourceNotFoundException;
import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.UpdateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import com.todolist.todo.model.entity.WorkSpace;
import com.todolist.todo.model.mapper.WorkSpaceMapper;
import com.todolist.todo.repositories.WorkSpaceRepository;
import com.todolist.todo.services.WorkSpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkSpaceServiceImp implements WorkSpaceService {

    private final WorkSpaceRepository workSpaceRepository;
    private final WorkSpaceMapper workSpaceMapper;

    @Override
    public WorkSpaceDTO createWorkSpace(CreateWorkSpaceRequest createWorkSpaceRequest) {
        WorkSpace workspace = workSpaceMapper.toEntity(createWorkSpaceRequest);
        workspace.setCreatedDate(LocalDateTime.now());
        workspace.setModifiedDate(LocalDateTime.now());
        WorkSpace savedWorkSpace = workSpaceRepository.save(workspace);

        return workSpaceMapper.toDTO(savedWorkSpace);
    }

    @Override
    public List<WorkSpaceDTO> getAllWorkspaces() {
        List<WorkSpace> listWorkSpace = workSpaceRepository.findAll();
        return workSpaceMapper.toDtoList(listWorkSpace);
    }

    @Override
    public WorkSpaceDTO updateWorkSpace(Long id, UpdateWorkSpaceRequest updateWorkSpaceRequest) {
        WorkSpace workspace = workSpaceRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("WorkSpace not found"));
        workSpaceMapper.updateWorkspaceFromDto(updateWorkSpaceRequest,workspace);

        workspace.setModifiedDate(LocalDateTime.now());
        WorkSpace savedWorkSpace = workSpaceRepository.save(workspace);
        return workSpaceMapper.toDTO(savedWorkSpace);
    }

    @Override
    public void deleteWorkSpace(Long id) {
        WorkSpace workSpace = workSpaceRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("WorkSpace not found"));
        workSpaceRepository.delete(workSpace);
    }
}
