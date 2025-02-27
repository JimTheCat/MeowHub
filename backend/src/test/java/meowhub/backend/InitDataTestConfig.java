package meowhub.backend;

import jakarta.annotation.PostConstruct;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.constants.Roles;
import meowhub.backend.posts.models.Comment;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.models.PostPicture;
import meowhub.backend.profiles.models.Profile;
import meowhub.backend.profiles.models.ProfilePicture;
import meowhub.backend.user_relations.models.RelationType;
import meowhub.backend.user_relations.models.UserRelation;
import meowhub.backend.posts.repositories.CommentRepository;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.profiles.repositories.ProfilePictureRepository;
import meowhub.backend.profiles.repositories.ProfileRepository;
import meowhub.backend.user_relations.repositories.RelationTypeRepository;
import meowhub.backend.user_relations.repositories.UserRelationRepository;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.GenderRepository;
import meowhub.backend.posts.repositories.PostPictureRepository;
import meowhub.backend.users.repositories.OnlineStatusDictionaryRepository;
import meowhub.backend.users.repositories.PrivacySettingRepository;
import meowhub.backend.users.repositories.RoleRepository;
import meowhub.backend.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@TestConfiguration
public class InitDataTestConfig {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PrivacySettingRepository privacySettingRepository;
    @Autowired
    private GenderRepository genderRepository;
    @Autowired
    private OnlineStatusDictionaryRepository onlineStatusDictionaryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostPictureRepository postPictureRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ProfilePictureRepository profilePictureRepository;
    @Autowired
    private RelationTypeRepository relationTypeRepository;
    @Autowired
    private UserRelationRepository userRelationRepository;
    @Autowired
    private CommentRepository commentRepository;

    private User user1;
    private User user2;
    private User user3;

    @PostConstruct
    public void initAll() {
        initUser();
        initPosts();
        initProfiles();
        initUserRelations();
    }

    private void initUser() {
        Role role = roleRepository.save(new Role(Roles.ROLE_USER));
        PrivacySetting publicSetting = privacySettingRepository.save(new PrivacySetting(PrivacySettings.PUBLIC));
        PrivacySetting friendsOnlySetting = privacySettingRepository.save(new PrivacySetting(PrivacySettings.FRIENDS_ONLY));
        Gender gender = genderRepository.save(new Gender(Genders.FEMALE));
        OnlineStatusDictionary onlineStatusDictionary = onlineStatusDictionaryRepository.save(new OnlineStatusDictionary(OnlineStatus.OFFLINE));

        user1 = new User();
        user1.setLogin("admin");
        user1.setPassword("password1");
        user1.setEmail("admin1@example.com");
        user1.setName("Jan");
        user1.setSurname("Kos");
        user1.setAccountNonLocked(false);
        user1.setBirthdate(LocalDate.of(1990, 1, 1));
        user1.setStatus(onlineStatusDictionary);
        user1.setCredentialsNonExpired(true);
        user1.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
        user1.setRole(role);
        user1.setPostsPrivacy(publicSetting);
        user1.setFriendsPrivacy(friendsOnlySetting);
        user1.setProfilePrivacy(publicSetting);
        user1.setGender(gender);
        user1 = userRepository.save(user1);

        user2 = new User();
        user2.setLogin("user");
        user2.setPassword("password2");
        user2.setEmail("user1@example.com");
        user2.setName("Gustaw");
        user2.setSurname("Jeleń");
        user2.setStatus(onlineStatusDictionary);
        user2.setAccountNonLocked(false);
        user2.setBirthdate(LocalDate.of(1991, 11, 11));
        user2.setCredentialsNonExpired(true);
        user2.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
        user2.setRole(role);
        user2.setPostsPrivacy(friendsOnlySetting);
        user2.setFriendsPrivacy(publicSetting);
        user2.setProfilePrivacy(publicSetting);
        user2.setGender(gender);
        user2 = userRepository.save(user2);

        user3 = new User();
        user3.setLogin("grześ");
        user3.setPassword("password2");
        user3.setEmail("grzegorz@example.com");
        user3.setName("Grzegorz");
        user3.setSurname("Saakaszwili");
        user3.setStatus(onlineStatusDictionary);
        user3.setAccountNonLocked(false);
        user3.setBirthdate(LocalDate.of(1991, 11, 11));
        user3.setCredentialsNonExpired(true);
        user3.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
        user3.setRole(role);
        user3.setPostsPrivacy(publicSetting);
        user3.setFriendsPrivacy(publicSetting);
        user3.setProfilePrivacy(publicSetting);
        user3.setGender(gender);
        user3 = userRepository.save(user3);
    }

    private void initPosts() {
        Post post1 = new Post();
        post1.setUser(user1);
        post1.setContentHtml("Hello world 1");
        postRepository.save(post1);

        Post post2 = new Post();
        post2.setUser(user2);
        post2.setContentHtml("Hello world 2");
        postRepository.save(post2);

        Post post3 = new Post();
        post3.setUser(user3);
        post3.setContentHtml("Hello world 3");
        post3 = postRepository.save(post3);

        PostPicture postPicture = new PostPicture();
        postPicture.setPost(post3);
        postPicture.setOciName("test.jpg");
        postPicture.setOciUrl("https://example.com/test.jpg");
        postPicture.setIndex(0L);
        postPictureRepository.save(postPicture);

        Comment comment1 = new Comment();
        comment1.setPost(post3);
        comment1.setUser(user2);
        comment1.setContent("Nice post");
        commentRepository.save(comment1);

        Comment comment2 = new Comment();
        comment2.setPost(post3);
        comment2.setUser(user1);
        comment2.setAnsweredComment(comment1);
        comment2.setContent("Yeah, I agree");
        commentRepository.save(comment2);
    }

    private void initProfiles() {
        Profile profile = new Profile();
        profile.setUser(user1);
        profile.setProfileDetailsHtml("Hello this is my profile");
        profileRepository.save(profile);

        ProfilePicture profilePicture = new ProfilePicture();
        profilePicture.setProfile(profile);
        profilePicture.setOciName("test.jpg");
        profilePicture.setOciUrl("https://example.com/test.jpg");
        profilePicture.setIsCurrentProfilePicture(Boolean.TRUE);
        profilePictureRepository.save(profilePicture);
    }

    private void initUserRelations() {
        RelationType friends = new RelationType();
        friends.setCode("FRIENDS");
        friends = relationTypeRepository.save(friends);

        RelationType sentInvitation = new RelationType();
        sentInvitation.setCode("SENT_INVITATION");
        sentInvitation = relationTypeRepository.save(sentInvitation);

        RelationType rejected = new RelationType();
        rejected.setCode("REJECTED");
        rejected = relationTypeRepository.save(rejected);

        UserRelation user1ToUser2SentInvitation = new UserRelation();
        user1ToUser2SentInvitation.setSender(user1);
        user1ToUser2SentInvitation.setReceiver(user2);
        user1ToUser2SentInvitation.setRelationType(sentInvitation);
        user1ToUser2SentInvitation.setSendDate(LocalDateTime.now());
        userRelationRepository.save(user1ToUser2SentInvitation);

        UserRelation user1ToUser3Rejected = new UserRelation();
        user1ToUser3Rejected.setSender(user1);
        user1ToUser3Rejected.setReceiver(user2);
        user1ToUser3Rejected.setRelationType(rejected);
        user1ToUser3Rejected.setSendDate(LocalDateTime.now());
        userRelationRepository.save(user1ToUser3Rejected);

        UserRelation user3ToUser2Friends = new UserRelation();
        user3ToUser2Friends.setSender(user3);
        user3ToUser2Friends.setReceiver(user2);
        user3ToUser2Friends.setRelationType(friends);
        user3ToUser2Friends.setSendDate(LocalDateTime.now());
        userRelationRepository.save(user3ToUser2Friends);
    }
}