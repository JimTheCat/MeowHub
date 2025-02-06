package meowhub.backend.matching.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "MATCHING_CHAT_MESSAGES", schema = "mh_matching")
public class MatchingChatMessage {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "MATCH_CHAT_ID", nullable = false)
    private MatchingChat matchChat;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "MATCHING_PROFILE_ID", nullable = false)
    private MatchingProfile author;

    @Size(max = 2000)
    @NotNull
    @Column(name = "MESSAGE", nullable = false, length = 2000)
    private String message;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Size(max = 36)
    @Column(name = "CREATED_BY", length = 36)
    private String createdBy;

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Size(max = 36)
    @Column(name = "MODIFIED_BY", length = 36)
    private String modifiedBy;

}