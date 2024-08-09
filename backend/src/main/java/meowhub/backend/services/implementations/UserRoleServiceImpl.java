package meowhub.backend.services.implementations;

import meowhub.backend.models.UserRole;
import meowhub.backend.repositories.UserRoleRepository;
import meowhub.backend.services.UserRoleService;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    private final UserRoleRepository userRoleRepository;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public UserRole getUserRole() {
        //todo - paskudnie brzydkie
        return userRoleRepository.findAll().stream().filter(role -> role.getName().equals("USER")).findFirst().get();
    }
}
