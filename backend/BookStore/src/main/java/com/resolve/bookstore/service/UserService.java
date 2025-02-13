package com.resolve.bookstore.service;

import com.resolve.bookstore.component.JwtTokenUtil;
import com.resolve.bookstore.model.User;
import com.resolve.bookstore.respository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostConstruct
    public void init() {
        if (userRepository.findAll().isEmpty()) {
            logger.info("Populating database with initial user data");
            User user = new User();
            user.setUsername("default_admin");
            user.setPassword("admin_password");
            register(user);
        }
    }

    public void register(@Valid User user) {
        userRepository.findByUsername(user.getUsername())
                .ifPresent(dbUser -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, user.getUsername() + " already exists. Please try different username");
                });
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String login(User user) {
        // Logic for authenticating the user (you may use JWT)
        // Example: Verify user credentials and return a JWT token

        Optional<User> dbUser = userRepository.findByUsername(user.getUsername());
        Predicate<User> passwordMatch = usr -> passwordEncoder.matches(user.getPassword(), usr.getPassword());
        Function<User, String> generateToken = usr -> jwtTokenUtil.generateJwtToken(usr.getUsername());

        return dbUser.stream()
                .filter(passwordMatch)
                .map(generateToken)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}

