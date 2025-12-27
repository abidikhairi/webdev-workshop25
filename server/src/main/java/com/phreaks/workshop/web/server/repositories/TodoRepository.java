package com.phreaks.workshop.web.server.repositories;

import com.phreaks.workshop.web.server.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
