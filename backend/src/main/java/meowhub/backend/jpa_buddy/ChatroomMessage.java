package meowhub.backend.jpa_buddy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.models.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "CHATROOM_MESSAGES", schema = "mh_chats")
public class ChatroomMessage {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CHATROOM_ID", nullable = false)
    private Chatroom chatroom;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private User author;

    @Size(max = 2000)
    @NotNull
    @Column(name = "MESSAGE", nullable = false, length = 2000)
    private String message;

    @NotNull
    @Column(name = "MSG_DATE", nullable = false)
    private LocalDate msgDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ANSWERED_MESSAGE_ID")
    private ChatroomMessage answeredMessage;

    @Column(name = "CREATED_AT")
    private LocalDate createdAt;

    @Size(max = 36)
    @Column(name = "CREATED_BY", length = 36)
    private String createdBy;

    @Column(name = "MODIFIED_AT")
    private LocalDate modifiedAt;

    @Size(max = 36)
    @Column(name = "MODIFIED_BY", length = 36)
    private String modifiedBy;

    @OneToMany(mappedBy = "answeredMessage")
    private Set<ChatroomMessage> chatroomMessages = new LinkedHashSet<>();

}