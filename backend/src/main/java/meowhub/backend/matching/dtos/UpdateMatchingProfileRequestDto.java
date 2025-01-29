package meowhub.backend.matching.dtos;

import lombok.Getter;
import lombok.Setter;
import meowhub.backend.matching.constants.Education;
import meowhub.backend.matching.constants.HowOften;
import meowhub.backend.matching.constants.LookingFor;
import meowhub.backend.matching.constants.Pets;
import meowhub.backend.matching.constants.Sexuality;

@Getter
@Setter
public class UpdateMatchingProfileRequestDto {
    private String aboutMe;
    private short height;
    private Sexuality sexuality;
    private Education education;
    private HowOften drinker;
    private HowOften smoker;
    private HowOften exercises;
    private LookingFor lookingFor;
    private Pets pet;
}
