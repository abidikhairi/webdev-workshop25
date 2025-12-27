package com.phreaks.workshop.web.server.repositories;

import com.phreaks.workshop.web.server.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByProjectId(Long projectId);

}
