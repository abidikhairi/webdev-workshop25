package com.phreaks.webworkshop.server.repositories;

import com.phreaks.webworkshop.server.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    public Optional<Project> findByName(String name);

}