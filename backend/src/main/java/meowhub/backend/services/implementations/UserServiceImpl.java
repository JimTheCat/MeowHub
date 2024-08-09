package meowhub.backend.services.implementations;

import meowhub.backend.dtos.LoginDto;
import meowhub.backend.dtos.RegisterDto;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.models.User;
import meowhub.backend.models.UserRole;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.repositories.UserRoleRepository;
import meowhub.backend.services.UserRoleService;
import meowhub.backend.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.RejectedExecutionException;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRoleService userRoleService;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);


    public UserServiceImpl(UserRepository userRepository, UserRoleService userRoleService) {
        this.userRepository = userRepository;
        this.userRoleService = userRoleService;
    }

    @Override
    public UserDto getUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()) throw new NullPointerException("User with id = " + id + " does not exist");
        logger.info(user.get().toString());
        UserDto userDto = new UserDto(user.get());

        return userDto;
    }

    @Override
    public Boolean userExists(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public Boolean login(LoginDto loginDto) {
        Optional<User> user = userRepository.findUserByLoginOrEmail(loginDto.getLogin(), loginDto.getEmail());

        if(user.isEmpty()) throw new IllegalArgumentException("Fatal error, user with given login/mail does not exist");

        return user.get().getPassword().equals(loginDto.getPassword());
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users =userRepository.findAll();

        List<UserDto> userDtoList = users.stream()
                .filter(Objects::nonNull)
                .map(UserDto::new)
                .toList();
        logger.info(users.toString());

        return userDtoList;
    }

    @Override
    public UserDto register(RegisterDto registerDto) {
        if(registerDto == null) throw new IllegalArgumentException("Cannot register a null user");

        //sprawdzenie, czy wszystkie wymagane pola w formularzu zostały wypełnione
        if(!registerDto.checkIfValid()) throw new RuntimeException("RegisterDto was not correct");

        //sprawdzenie, czy już nie istnieje użytkownik o takim emailu/loginie już nie istnieje
        Optional<User> userByEmailOrLogin = userRepository.findUserByLoginOrEmail(registerDto.getLogin(), registerDto.getEmail());
        if(userByEmailOrLogin.isPresent()) throw new RejectedExecutionException("Cannot create a user because already exists a user with this login or email");

        //todo - lepiej obsługiwać sypiąc wyjątkami, booleanami, czy może jeszcze inaczej? podejrzeć, jak to robią w biznesowych aplikacjach

        //stworzenie użytkownika
        User newUser = registerDto.mapToUser();

        UserRole userRole = userRoleService.getUserRole();
        newUser.setUserRole(userRole); //domyślnie tworzy się użytkownik o standardowych uprawnieniach

        userRepository.save(newUser);

        return new UserDto(newUser);
    }
}
