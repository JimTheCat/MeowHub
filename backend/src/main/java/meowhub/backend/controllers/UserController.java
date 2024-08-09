package meowhub.backend.controllers;

import meowhub.backend.dtos.LoginDto;
import meowhub.backend.dtos.RegisterDto;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<UserDto>> getUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id){
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<Boolean> login(@RequestBody LoginDto loginDto){
        return new ResponseEntity<>(userService.login(loginDto), HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterDto registerDto){
        return new ResponseEntity<>(userService.register(registerDto), HttpStatus.OK);
    }
}
