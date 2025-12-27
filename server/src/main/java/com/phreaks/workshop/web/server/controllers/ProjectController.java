package com.phreaks.workshop.web.server.controllers;

import com.phreaks.workshop.web.server.dtos.ProjectDto;
import com.phreaks.workshop.web.server.models.Project;
import com.phreaks.workshop.web.server.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Properties;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @RequestMapping(method = RequestMethod.POST, path = "")
    public Properties save(@RequestBody ProjectDto projectDto) {
        Properties response = new Properties();
        if (projectDto.getName().equals("")) {
            response.put("error", "Project name cannot be empty");

            return response;
        }
        Project project = new Project();
        project.setName(projectDto.getName());

        Project saved = projectRepository.save(project);

        response.put("message", "Project saved successfully !!");
        response.put("project", saved);
        return response;
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    public Properties index() {
        Properties response = new Properties();

        // select * from t_projects;
        List<Project> projectList = projectRepository.findAll();

        response.put("projects", projectList);
        response.put("message", "All projects fetched successfully!!");

        return response;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{projectId}")
    // DELETE +> /api/project/1 +> delete where project_id = 1
    public Properties delete(@PathVariable("projectId") Long projectId) {
        Properties response = new Properties();
        if (!projectRepository.existsById(projectId)) {
            response.put("error", "Project with id=" + projectId + " not found");
            return response;
        }
        projectRepository.deleteById(projectId);
        response.put("message", "project with id=" + projectId + " deleted successfully!!");

        return response;
    }

}
