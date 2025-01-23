package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.constants.LikeTypes;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.models.LikeType;
import meowhub.backend.matching.models.Liked;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.LikeTypeRepository;
import meowhub.backend.matching.repositories.LikedRepository;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.services.MatchingRelationService;
import meowhub.backend.shared.constants.AlertConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchingRelationServiceImpl implements MatchingRelationService {
    private final LikedRepository likedRepository;
    private final LikeTypeRepository likeTypeRepository;
    private final MatchingProfileRepository matchingProfileRepository;

    @Override
    public void likeUser(String matchingProfileId, String login) {
        MatchingProfile sender = matchingProfileRepository.findByUserLogin(login).orElseThrow();
        MatchingProfile receiver = matchingProfileRepository.findById(matchingProfileId).orElseThrow();

        //check if the sender and receiver are the same
        if (sender.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException(String.format(AlertConstants.ILLEGAL_ARGUMENT, "sender", "receiver"));
        }

        //check if they already don't have a relation between them -> if so -> update the existing one; else -> create a new one
        Optional<Liked> likedOptional = likedRepository.findBySenderAndReceiver(sender, receiver);
        LikeType likeType = likeTypeRepository.findByCode(LikeTypes.LIKE.name());
        if (likedOptional.isPresent()) {
            Liked liked = likedOptional.get();
            if (liked.getLikeType().getCode().equals(LikeTypes.LIKE.name())) {
                throw new IllegalArgumentException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, LikeTypes.LIKE.name(), sender.getName(), receiver.getName()));
            } else if (liked.getLikeType().getCode().equals(LikeTypes.MATCH.name())) {
                throw new IllegalArgumentException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, LikeTypes.MATCH.name() , sender.getName(), receiver.getName()));
            } else if (liked.getLikeType().getCode().equals(LikeTypes.DISLIKE.name())) {
                liked.setLikeType(likeType);
                likedRepository.save(liked);
            }
        } else {
            Liked liked = new Liked();
            liked.setLikeType(likeType);
            liked.setSender(sender);
            liked.setReceiver(receiver);
            liked.setCreatedAt(LocalDateTime.now());
            liked.setCreatedBy(sender.getUser().getLogin());
            likedRepository.save(liked);
        }

        //check if the other user didn't already like the sender -> if so -> it's a match!
        Optional<Liked> twoWayLiked = likedRepository.findBySenderAndReceiver(receiver, sender);
        if(twoWayLiked.isPresent()){
            Liked likedByReceiver = twoWayLiked.get();
            if(likedByReceiver.getLikeType().getCode().equals(LikeTypes.LIKE.name())){

                likedByReceiver.setLikeType(likeTypeRepository.findByCode(LikeTypes.MATCH.name()));
                likedRepository.save(likedByReceiver);

                Liked likedBySender = likedRepository.findBySenderAndReceiver(sender, receiver).orElseThrow();
                likedBySender.setLikeType(likeTypeRepository.findByCode(LikeTypes.MATCH.name()));
                likedRepository.save(likedBySender);
            }
        }
    }

    @Override
    public void dislikeUser(String matchingProfileId, String login) {
        MatchingProfile sender = matchingProfileRepository.findByUserLogin(login).orElseThrow(()-> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "login", login)));
        MatchingProfile receiver = matchingProfileRepository.findById(matchingProfileId).orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "matchingProfileId", matchingProfileId)));

        //check if the sender and receiver are the same
        if (sender.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException(String.format(AlertConstants.ILLEGAL_ARGUMENT, "sender", "receiver"));
        }

        //check if they already don't have a relation -> if it's dislike, just update the modified date; else -> create a new one
        Optional<Liked> likedOptional = likedRepository.findBySenderAndReceiver(sender, receiver);
        LikeType likeType = likeTypeRepository.findByCode(LikeTypes.DISLIKE.name());
        if (likedOptional.isPresent()) {
            Liked liked = likedOptional.get();
            if (liked.getLikeType().getCode().equals(LikeTypes.LIKE.name())) {
                throw new IllegalArgumentException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, LikeTypes.LIKE.name(), sender.getName(), receiver.getName()));
            } else if (liked.getLikeType().getCode().equals(LikeTypes.MATCH.name())) {
                throw new IllegalArgumentException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, LikeTypes.MATCH.name(), sender.getName(), receiver.getName()));
            } else if (liked.getLikeType().getCode().equals(LikeTypes.DISLIKE.name())) {
                liked.setModifiedAt(LocalDateTime.now());
                likedRepository.save(liked);
            }
        } else {
            Liked liked = new Liked();
            liked.setLikeType(likeType);
            liked.setSender(sender);
            liked.setReceiver(receiver);
            likedRepository.save(liked);
        }
    }

    @Override
    public Page<BasicMatchingProfileInfoDto> getLikedUsers(String login, int page, int size) {
        if(!matchingProfileRepository.existsByUserLogin(login)){
            throw new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "login", login));
        }

        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return likedRepository.getLikedUsers(login, LikeTypes.LIKE.name(), pageable);
    }

    @Override
    public Page<BasicMatchingProfileInfoDto> getDislikedUsers(String login, int page, int size) {
        if(!matchingProfileRepository.existsByUserLogin(login)){
            throw new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "login", login));
        }

        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return likedRepository.getLikedUsers(login, LikeTypes.DISLIKE.name(), pageable);
    }

    @Override
    public Page<BasicMatchingProfileInfoDto> getMatchedUsers(String login, int page, int size) {
        if(!matchingProfileRepository.existsByUserLogin(login)){
            throw new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "login", login));
        }

        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return likedRepository.getLikedUsers(login, LikeTypes.MATCH.name(), pageable);
    }

    @Override
    public void deleteMatch(String matchingProfileId, String login) {
        MatchingProfile sender = matchingProfileRepository.findByUserLogin(login).orElseThrow(()-> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "login", login)));
        MatchingProfile receiver = matchingProfileRepository.findById(matchingProfileId).orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "matching profile", "matchingProfileId", matchingProfileId)));

        Optional<Liked> likedOptional = likedRepository.findBySenderAndReceiver(sender, receiver);
        if(likedOptional.isPresent()){
            Liked liked = likedOptional.get();
            if(liked.getLikeType().getCode().equals(LikeTypes.MATCH.name())){
                likedRepository.delete(liked);
                likedRepository.delete(likedRepository.findBySenderAndReceiver(receiver, sender).orElseThrow());
            } else {
                throw new IllegalArgumentException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, "match", sender.getName(), receiver.getName()));
            }
        } else {
            throw new IllegalArgumentException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, "'any relation'", sender.getName(), receiver.getName()));
        }
    }
}
