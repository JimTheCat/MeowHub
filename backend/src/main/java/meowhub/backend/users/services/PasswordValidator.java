package meowhub.backend.users.services;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class PasswordValidator {
    public void validatePassword(String password){
        String regex = "^(?=.*\\p{Digit})(?=.*\\p{Lower})(?=.*\\p{Upper})(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";
        Pattern pattern = Pattern.compile(regex, Pattern.UNICODE_CHARACTER_CLASS);

        if (!pattern.matcher(password).matches()){
            throw new IllegalArgumentException(String.format("Password %s does not meet the requirements: needs to be at least 8 characters long, contain at least one digit and one special character and have at least one uppercase letter and one lowercase letter", password));
        }
    }
}
