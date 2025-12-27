package com.phreaks.workshop.web.server.controllers;

import com.phreaks.workshop.web.server.dtos.TodoDto;
import com.phreaks.workshop.web.server.dtos.UpdateTodoDto;
import com.phreaks.workshop.web.server.models.ETodoStatus;
import com.phreaks.workshop.web.server.models.Project;
import com.phreaks.workshop.web.server.models.Todo;
import com.phreaks.workshop.web.server.repositories.ProjectRepository;
import com.phreaks.workshop.web.server.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Properties;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TodoRepository todoRepository;

    @RequestMapping(method = RequestMethod.POST, path = "")
    public Properties save(@RequestBody TodoDto todoDto) {
        Properties response = new Properties();
        if (todoDto.getName().equals("")) {
            response.put("error", "todo name/title should not be null/empty");
            return response;
        }
        if (todoDto.getProjectId() == null) {
            response.put("error", "projectId should not be null");
            return response;
        }
        if (todoDto.getStatus() == null) {
            response.put("error", "todo status should not be null");
            return response;
        }
        Optional<Project> project = projectRepository.findById(todoDto.getProjectId());

        if (project.isEmpty()) {
            response.put("error", "project with id=" + todoDto.getProjectId() + " is not found");
            return response;
        }

        Todo todo = new Todo();
        todo.setName(todoDto.getName());
        todo.setStatus(todoDto.getStatus());
        todo.setProject(project.get());

        Todo saved = todoRepository.save(todo);
        response.put("message", "Todo created successfully!!");
        response.put("todo", saved);

        return response;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/update")
    public Properties updateTodoStatus(@RequestBody UpdateTodoDto updateTodoDto) {
        Properties response = new Properties();
        if (!todoRepository.existsById(updateTodoDto.getId())) {
            response.put("error", "Todo with id=" + updateTodoDto.getId() + " not found");
            return response;
        }

        Todo todo = todoRepository.findById(updateTodoDto.getId()).get();
        ETodoStatus oldStatus = todo.getStatus();
        todo.setStatus(updateTodoDto.getStatus());
        // mise a jour
        Todo saved = todoRepository.save(todo);

        response.put("message", String.format("Todo '%s' status updated from '%s' to '%s'", todo.getName(), oldStatus, saved.getStatus()));
        response.put("todo", saved);

        return response;
    }

}
