package meowhub.backend.shared.utils;

import lombok.NoArgsConstructor;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.constants.AlertLevel;
import meowhub.backend.shared.dtos.AlertDto;

import java.time.LocalDateTime;

@NoArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class AlertUtils {

    public static AlertDto userNotFoundException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.USER_WITH_LOGIN_NOT_FOUND_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto relationNotFoundException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.RELATION_FOR_USERS_NOT_FOUND_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto relationAlreadyExists(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.RELATION_ALREADY_EXISTS_TITLE);
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

    public static AlertDto valueRequired(String msg){
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.VALUE_REQUIRED_TITLE);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto mailSendException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.MAIL_SEND_ERROR);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }

    public static AlertDto methodArgumentNotValidException(String msg) {
        AlertDto alertDto = new AlertDto();
        alertDto.setTitle(AlertConstants.METHOD_ARGUMENT_NOT_VALID);
        alertDto.setMessage(msg);
        alertDto.setLevel(AlertLevel.ERROR);
        alertDto.setTimestamp(LocalDateTime.now());

        return alertDto;
    }
}
