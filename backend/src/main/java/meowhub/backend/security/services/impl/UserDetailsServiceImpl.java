package meowhub.backend.security.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.users.models.User;
import meowhub.backend.users.services.UserQueryService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserQueryService userQueryService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userQueryService.findUserByLogin(username);

        return UserDetailsImpl.build(user);
    }
}
