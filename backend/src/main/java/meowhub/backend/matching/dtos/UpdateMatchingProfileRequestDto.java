package meowhub.backend.matching.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    @Min(120)
    @Max(300)
    @Nullable
    private Short height;

    private Sexuality sexuality;
    private Education education;
    private HowOften drinker;
    private HowOften smoker;
    private HowOften exercises;
    private LookingFor lookingFor;
    private Pets pet;
}
