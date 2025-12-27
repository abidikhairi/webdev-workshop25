package com.phreaks.workshop.web.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
@RequestMapping("/api/hello")
public class HomeController {

    @RequestMapping(method = RequestMethod.GET, path = "")
    public Properties index() {
        Properties response = new Properties();

        response.put("message", "Welcome to ToDo Application Backend");
        response.put("time", System.currentTimeMillis());

        return response;
    }
}
