package com.todolist.todo.controller;

import com.todolist.todo.model.dto.CreateWorkSpaceRequest;
import com.todolist.todo.model.dto.WorkSpaceDTO;
import com.todolist.todo.services.WorkSpaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workspaces")
@RequiredArgsConstructor
public class WorkSpaceController {

    private final WorkSpaceService workSpaceService;

    @PostMapping
    public ResponseEntity<WorkSpaceDTO> createWorkSpace (
            @Valid @RequestBody CreateWorkSpaceRequest createWorkSpaceRequest) {
        return new ResponseEntity<>(workSpaceService.createWorkSpace(createWorkSpaceRequest)
                , HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WorkSpaceDTO>> getAllWorkspaces() {
        return new ResponseEntity<>(workSpaceService.getAllWorkspaces(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkSpaceDTO> updateWorkSpace (
            @PathVariable Long id,
            @Valid @RequestBody CreateWorkSpaceRequest updateWorkSpaceRequest) {
        return new ResponseEntity<>(workSpaceService.updateWorkSpace(id, updateWorkSpaceRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkSpace(@PathVariable Long id) {
        workSpaceService.deleteWorkSpace(id);
        return ResponseEntity.noContent().build();
    }
}
