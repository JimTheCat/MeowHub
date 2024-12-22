package meowhub.backend.shared.utils;

import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.constants.AlertLevel;
import meowhub.backend.shared.dtos.AlertDto;

import java.time.LocalDateTime;

public class AlertUtils {

    public static AlertDto userNotFoundException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.USER_WITH_LOGIN_NOT_FOUND_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto unknownException() {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.UNKNOWN_ERROR);
        alertDto.setMessage(AlertConstants.UNKNOWN_ERROR);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto resourceNotFoundException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.RESOURCE_NOT_FOUND_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto notUniqueObjectException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.NOT_UNIQUE_OBJECT_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto badCredentialsException() {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.BAD_CREDENTIALS);
        alertDto.setMessage(AlertConstants.BAD_CREDENTIALS);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto illegalArgumentException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.ILLEGAL_ARGUMENT_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    private AlertUtils() {
    }
}
