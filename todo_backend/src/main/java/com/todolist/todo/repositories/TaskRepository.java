package com.todolist.todo.repositories;

import com.todolist.todo.model.dto.TaskDTO;
import com.todolist.todo.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> getTasksByWorkspaceId(Long workSpaceID);
}
