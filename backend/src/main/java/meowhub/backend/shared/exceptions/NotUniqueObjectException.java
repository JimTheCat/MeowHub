package meowhub.backend.shared.exceptions;

public class NotUniqueObjectException extends RuntimeException {
    public NotUniqueObjectException(String message) {
        super(message);
    }
}
