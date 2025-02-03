package meowhub.backend.matching.dtos;

import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.constants.Genders;

import java.time.LocalDate;

@Getter
@Setter
public class CreateMatchingProfileRequestDto {
    private String name;
    private LocalDate birthdate;
    private Genders gender;
}
