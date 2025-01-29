package meowhub.backend.shared;

import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.dtos.AlertDto;
import meowhub.backend.shared.exceptions.NotUniqueObjectException;
import meowhub.backend.shared.handlers.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void testHandleUsernameNotFoundException() {
        UsernameNotFoundException exception = new UsernameNotFoundException("Message");

        ResponseEntity<AlertDto> response = globalExceptionHandler.handleUsernameNotFoundException(exception);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(AlertConstants.USER_WITH_LOGIN_NOT_FOUND_TITLE, response.getBody().getTitle());
        assertEquals("Message", response.getBody().getMessage());
    }

    @Test
    void testHandleNotUniqueObjectException() {
        NotUniqueObjectException exception = new NotUniqueObjectException("Duplicate entry");

        ResponseEntity<Object> response = globalExceptionHandler.handleNotUniqueObjectException(exception);

        assertEquals(HttpStatus.NOT_ACCEPTABLE, response.getStatusCode());
        AlertDto alert = (AlertDto) response.getBody();
        assertEquals(AlertConstants.NOT_UNIQUE_OBJECT_TITLE, alert.getTitle());
        assertEquals("Duplicate entry", alert.getMessage());
    }
}