package com.phreaks.webworkshop.server.services.project;

public interface ProjectService {

    void findAllProjects();

    void deleteProjectByName(String name);
}
