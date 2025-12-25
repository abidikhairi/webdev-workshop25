package com.phreaks.webworkshop.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "t_projects", indexes = {
        @Index(name = "idx_project_name_unq", columnList = "name", unique = true)
})
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    @CreationTimestamp
    private Timestamp createdAt;
}
