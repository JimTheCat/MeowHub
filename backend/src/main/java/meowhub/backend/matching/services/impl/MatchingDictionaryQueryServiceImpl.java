package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.constants.Pets;
import meowhub.backend.matching.models.Education;
import meowhub.backend.matching.models.HowOften;
import meowhub.backend.matching.models.LookingFor;
import meowhub.backend.matching.models.Pet;
import meowhub.backend.matching.models.Sexuality;
import meowhub.backend.matching.repositories.EducationRepository;
import meowhub.backend.matching.repositories.HowOftenRepository;
import meowhub.backend.matching.repositories.LookingForRepository;
import meowhub.backend.matching.repositories.PetRepository;
import meowhub.backend.matching.repositories.SexualityRepository;
import meowhub.backend.matching.services.MatchingDictionaryQueryService;
import meowhub.backend.shared.constants.AlertConstants;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MatchingDictionaryQueryServiceImpl implements MatchingDictionaryQueryService {
    private final PetRepository petRepository;
    private final SexualityRepository sexualityRepository;
    private final LookingForRepository lookingForRepository;
    private final HowOftenRepository howOftenRepository;
    private final EducationRepository educationRepository;

    @Override
    public HowOften getHowOftenByEnumOrThrow(meowhub.backend.matching.constants.HowOften howOften) {
        return howOftenRepository.findByCode(howOften.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "HowOften", "code", howOften)));
    }

    @Override
    public Sexuality getSexualityByEnumOrThrow(meowhub.backend.matching.constants.Sexuality sexuality) {
        return sexualityRepository.findByCode(sexuality.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Sexuality", "code", sexuality)));
    }

    @Override
    public LookingFor getLookingForByEnumOrThrow(meowhub.backend.matching.constants.LookingFor lookingFor) {
        return lookingForRepository.findByCode(lookingFor.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "LookingFor", "code", lookingFor)));
    }

    @Override
    public Pet getPetByEnumOrThrow(Pets pet) {
        return petRepository.findByCode(pet.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Pet", "code", pet)));
    }

    @Override
    public Education getEducationByEnumOrThrow(meowhub.backend.matching.constants.Education education) {
        return educationRepository.findByCode(education.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Education", "code", education)));
    }
}
