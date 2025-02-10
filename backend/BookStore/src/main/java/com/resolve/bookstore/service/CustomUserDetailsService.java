package com.resolve.bookstore.service;

import com.resolve.bookstore.respository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    // In a real-world scenario, inject a repository to get user data from the database.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.resolve.bookstore.model.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword()) // Make sure password is encoded
//                .roles(user.getRoles().toArray(new String[0])) // Convert roles to array
                .build();
    }
}

