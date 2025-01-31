package meowhub.backend.shared.constants;

import lombok.NoArgsConstructor;

@NoArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class AlertConstants {
    //title
    public static final String USER_WITH_LOGIN_NOT_FOUND_TITLE = "User not found";

    public static final String RELATION_FOR_USERS_NOT_FOUND_TITLE = "Relation not found";
    public static final String RELATION_ALREADY_EXISTS_TITLE = "Relation already exists";

    public static final String RESOURCE_NOT_FOUND_TITLE = "Resource not found";
    public static final String NOT_UNIQUE_OBJECT_TITLE = "Not unique object";
    public static final String ILLEGAL_ARGUMENT_TITLE = "Illegal argument";
    public static final String METHOD_ARGUMENT_NOT_VALID = "Method argument not valid";

    public static final String VALUE_REQUIRED_TITLE = "Value required";

    //message
    public static final String USER_WITH_LOGIN_NOT_FOUND = "User with login '%s' not found";

    public static final String RELATION_FOR_USERS_NOT_FOUND = "Relation %s not found for users %s and %s";
    public static final String RELATION_ALREADY_EXISTS = "Relation %s already exists for users %s and %s";

    public static final String RESOURCE_NOT_FOUND = "%s not found for %s = '%s'";
    public static final String UNKNOWN_ERROR = "Unknown error";
    public static final String BAD_CREDENTIALS = "Bad credentials";
    public static final String NOT_UNIQUE_OBJECT = "%s:'%s' is not unique";
    public static final String ILLEGAL_ARGUMENT = "%s cannot be equal %s";
    public static final String ALREADY_EXISTS = "%s already exists for %s";
    public static final String HEIGHT_TOO_LOW = "Height is too low. Required at least 140";
    public static final String TOO_MANY_PICTURES = "Too many pictures. Maximum is %d. With added pictures will be %d";
    public static final String VALUE_REQUIRED = "Value %s required";
    public static final String MAIL_SEND_ERROR = "Error while sending email";


    public static final String POST_CONTENT_OR_PICTURE_REQUIRED = "Post content or picture is required";
}
