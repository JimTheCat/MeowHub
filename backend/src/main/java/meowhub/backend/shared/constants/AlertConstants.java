package meowhub.backend.shared.constants;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AlertConstants {
    //title
    public static final String USER_WITH_LOGIN_NOT_FOUND_TITLE = "User not found";
    public static final String RESOURCE_NOT_FOUND_TITLE = "Resource not found";
    public static final String NOT_UNIQUE_OBJECT_TITLE = "Not unique object";
    public static final String ILLEGAL_ARGUMENT_TITLE = "Illegal argument";

    //message
    public static final String USER_WITH_LOGIN_NOT_FOUND = "User with login '%s' not found";
    public static final String RESOURCE_NOT_FOUND = "%s not found for %s = '%s'";
    public static final String UNKNOWN_ERROR = "Unknown error";
    public static final String BAD_CREDENTIALS = "Bad credentials";
    public static final String NOT_UNIQUE_OBJECT = "%s:'%s' is not unique";
    public static final String ILLEGAL_ARGUMENT = "%s cannot be equal %s";
}
