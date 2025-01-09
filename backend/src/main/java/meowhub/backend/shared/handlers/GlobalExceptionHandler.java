package meowhub.backend.shared.handlers;

import meowhub.backend.shared.dtos.AlertDto;
import meowhub.backend.shared.exceptions.NotUniqueObjectException;
import meowhub.backend.shared.exceptions.RelationException;
import meowhub.backend.shared.utils.AlertUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.webjars.NotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<AlertDto> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return new ResponseEntity<>(AlertUtils.userNotFoundException(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotUniqueObjectException.class)
    public ResponseEntity<Object> handleNotUniqueObjectException(NotUniqueObjectException ex) {
        return new ResponseEntity<>(AlertUtils.notUniqueObjectException(ex.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<AlertDto> handleNotFoundException(NotFoundException ex) {
        return new ResponseEntity<>(AlertUtils.resourceNotFoundException(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RelationException.class)
    public ResponseEntity<AlertDto> handleNotFoundException(RelationException ex) {
        if(ex.getMessage().contains("exists")) {
            return new ResponseEntity<>(AlertUtils.relationAlreadyExists(ex.getMessage()), HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(AlertUtils.relationNotFoundException(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AlertDto> handleUnknownException(Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(AlertUtils.unknownException(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AlertDto> handleBadCredentialsException() {
        return new ResponseEntity<>(AlertUtils.badCredentialsException(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AlertDto> handleIllegalArgumentException(IllegalArgumentException ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(AlertUtils.illegalArgumentException(ex.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<AlertDto> handleIllegalStateException(NullPointerException ex) {
        return new ResponseEntity<>(AlertUtils.valueRequired(ex.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }
}
