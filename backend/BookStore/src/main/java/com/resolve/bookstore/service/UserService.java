package com.resolve.bookstore.service;

import com.resolve.bookstore.component.JwtTokenUtil;
import com.resolve.bookstore.model.User;
import com.resolve.bookstore.respository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public void register(@Valid User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String login(User user) {
        // Logic for authenticating the user (you may use JWT)
        // Example: Verify user credentials and return a JWT token

        Optional<User> dbUser = userRepository.findByUsername(user.getUsername());
        if (dbUser.isPresent() && passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword())) {
            // Generate JWT token here
            return jwtTokenUtil.generateJwtToken(user.getUsername());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}

