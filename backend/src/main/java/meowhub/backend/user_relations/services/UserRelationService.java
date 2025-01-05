package meowhub.backend.user_relations.services;

public interface UserRelationService {
    void acceptFriendRequestFrom(String login, String accepterLogin);

    void sendFriendRequestTo (String login, String senderLogin);

    void rejectFriendRequestFrom(String login, String rejecterLogin);

    void deleteFriend(String login, String requesterLogin);
}
