package meowhub.backend.matching.services;

import meowhub.backend.matching.constants.Pets;
import meowhub.backend.matching.models.Education;
import meowhub.backend.matching.models.HowOften;
import meowhub.backend.matching.models.LookingFor;
import meowhub.backend.matching.models.Pet;
import meowhub.backend.matching.models.Sexuality;

public interface MatchingDictionaryQueryService {
    HowOften getHowOftenByEnumOrThrow(meowhub.backend.matching.constants.HowOften howOften);
    Sexuality getSexualityByEnumOrThrow(meowhub.backend.matching.constants.Sexuality sexuality);
    LookingFor getLookingForByEnumOrThrow(meowhub.backend.matching.constants.LookingFor lookingFor);
    Pet getPetByEnumOrThrow(Pets pet);
    Education getEducationByEnumOrThrow(meowhub.backend.matching.constants.Education education);
}
