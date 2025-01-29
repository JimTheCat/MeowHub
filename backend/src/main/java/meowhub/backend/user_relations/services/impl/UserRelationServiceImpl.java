package meowhub.backend.user_relations.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.dtos.RelationType;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.exceptions.RelationException;
import meowhub.backend.user_relations.models.UserRelation;
import meowhub.backend.user_relations.repositories.RelationTypeRepository;
import meowhub.backend.user_relations.repositories.UserRelationRepository;
import meowhub.backend.user_relations.services.UserRelationService;
import meowhub.backend.users.facades.UserRelationServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class UserRelationServiceImpl implements UserRelationService {
    private final UserRelationRepository userRelationRepository;
    private final RelationTypeRepository relationTypeRepository;
    private final UserRelationServiceFacade userRelationFacade;

    @Override
    public void acceptFriendRequestFrom (String login, String accepterLogin) {
        validateSenderAndReceiverExist(login, accepterLogin);

        if(twoWayRelationExists(login, accepterLogin, RelationType.FRIENDS)) {
            throw new RelationException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, RelationType.FRIENDS, login, accepterLogin));
        } else if (!oneWayRelationExists(login, accepterLogin, RelationType.SENT_INVITATION)) {
            throw new RelationException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, RelationType.SENT_INVITATION, login, accepterLogin));
        }

        userRelationRepository.updateRelationType(RelationType.FRIENDS.name(), login, accepterLogin);
    }

    @Override
    public void sendFriendRequestTo(String login, String senderLogin) {
        User sender = userRelationFacade.findUserByLogin(senderLogin);
        User receiver = userRelationFacade.findUserByLogin(login);

        //validate if relation already exists
        if(twoWayRelationExists(senderLogin, login, RelationType.FRIENDS)) {
            throw new RelationException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, RelationType.FRIENDS, senderLogin, login));
        } else if (twoWayRelationExists(senderLogin, login, RelationType.SENT_INVITATION)) {
            throw new RelationException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, RelationType.SENT_INVITATION, senderLogin, login));
        }

        UserRelation userRelation = new UserRelation();
        userRelation.setRelationType(relationTypeRepository.findByCode(RelationType.SENT_INVITATION.name()).orElseThrow());
        userRelation.setSender(sender);
        userRelation.setReceiver(receiver);
        userRelation.setSendDate(LocalDateTime.now());
        userRelationRepository.save(userRelation);
    }

    @Override
    public void rejectFriendRequestFrom (String login, String rejecterLogin) {
        validateSenderAndReceiverExist(login, rejecterLogin);

        //validate if relation already exists
        if(twoWayRelationExists(login, rejecterLogin, RelationType.FRIENDS)) {
            throw new RelationException(String.format(AlertConstants.RELATION_ALREADY_EXISTS, RelationType.FRIENDS, login, rejecterLogin));
        } else if (!oneWayRelationExists(login, rejecterLogin, RelationType.SENT_INVITATION)) {
            throw new RelationException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, RelationType.SENT_INVITATION, login, rejecterLogin));
        }

        userRelationRepository.updateRelationType(RelationType.REJECTED.name(), login, rejecterLogin);
    }

    @Override
    public void deleteFriend(String login, String requesterLogin) {
        validateSenderAndReceiverExist(login, requesterLogin);

        //validate if relation friends exists
        if(!twoWayRelationExists(login, requesterLogin, RelationType.FRIENDS)) {
            throw new RelationException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, RelationType.FRIENDS, login, requesterLogin));
        }

        userRelationRepository.deleteFriend(login, requesterLogin);
    }

    @Override
    public void deleteInvite(String login, String requesterLogin) {
        validateSenderAndReceiverExist(requesterLogin, login);

        //validate if relation sent invitation exists
        if(!oneWayRelationExists(requesterLogin, login, RelationType.SENT_INVITATION)) {
            throw new RelationException(String.format(AlertConstants.RELATION_FOR_USERS_NOT_FOUND, RelationType.SENT_INVITATION, login, requesterLogin));
        }

        userRelationRepository.deleteBySenderLoginAndReceiverLogin(requesterLogin, login);
    }

    private void validateSenderAndReceiverExist(String senderLogin, String receiverLogin) {
        userRelationFacade.validateIfUserExists(senderLogin);
        userRelationFacade.validateIfUserExists(receiverLogin);
        if(senderLogin.equals(receiverLogin)) {
            throw new RelationException(String.format(AlertConstants.ILLEGAL_ARGUMENT, "Sender", "Receiver"));
        }
    }

    private boolean twoWayRelationExists(String senderLogin, String receiverLogin, RelationType relationType) {
        return oneWayRelationExists(senderLogin, receiverLogin, relationType) || oneWayRelationExists(receiverLogin, senderLogin, relationType);
    }

    private boolean oneWayRelationExists (String senderLogin, String receiverLogin, RelationType relationType) {
        return userRelationRepository.existsUserRelationBySenderLoginAndReceiverLoginAndRelationTypeCode(senderLogin, receiverLogin, relationType.name());
    }
}
