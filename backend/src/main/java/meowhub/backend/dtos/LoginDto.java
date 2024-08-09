package meowhub.backend.dtos;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    private String email;
    private String login;
    private String password;


}
