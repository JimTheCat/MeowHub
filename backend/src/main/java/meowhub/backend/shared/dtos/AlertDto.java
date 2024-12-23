package meowhub.backend.shared.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.shared.constants.AlertLevel;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlertDto {
    private String title;
    private String message;
    private AlertLevel level;
    private LocalDateTime timestamp;
}
