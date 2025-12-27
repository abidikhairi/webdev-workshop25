package com.phreaks.workshop.web.server.repositories;

import com.phreaks.workshop.web.server.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
