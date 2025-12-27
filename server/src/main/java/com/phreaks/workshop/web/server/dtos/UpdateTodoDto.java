package com.phreaks.workshop.web.server.dtos;

import com.phreaks.workshop.web.server.models.ETodoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateTodoDto {

    private Long id;

    private ETodoStatus status;
}
