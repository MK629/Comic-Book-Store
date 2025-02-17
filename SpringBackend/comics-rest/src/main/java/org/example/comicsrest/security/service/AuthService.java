package org.example.comicsrest.security.service;

import org.example.comicsrest.security.entity.User;
import org.example.comicsrest.security.enums.RoleType;
import org.example.comicsrest.security.pojo.Role;
import org.example.comicsrest.security.repository.UserRepository;
import org.example.comicsrest.security.userSecurity.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public record RegisterForm(
            String username,
            String email,
            String password
    ){}

    public record LoginForm(
            String usernameOrEmail,
            String password
    ){}

    public String register(RegisterForm form) {
        if(form.username.isBlank() || form.email.isBlank() || form.password.isBlank() ||
           form.username.isEmpty() || form.email.isEmpty() || form.password.isEmpty() ||
           form.username == null || form.email == null || form.password == null) {
            return "there are fields missing. try again!";
        }

        User checkDuplicateUsername = userRepository.findByUsername(form.username).orElse(null);
        User checkDuplicateEmail = userRepository.findByEmail(form.email).orElse(null);

        if(checkDuplicateUsername != null || checkDuplicateEmail != null) {
            return "username or email already exists. try again!";
        }

        User user = new User(form.username, form.email, passwordEncoder.encode(form.password));
        user.addRole(new Role(RoleType.User));
        userRepository.save(user);
        System.out.println(form);
        return "success";
    }

    public String login(LoginForm form) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.usernameOrEmail, form.password));
        if(authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ROLE_USER")) || authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ROLE_DEV"))) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println(form);
            return "success";
        }
        else{
            return "fail";
        }
    }

    public String adminLogin(LoginForm form) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.usernameOrEmail, form.password));
        if(authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ROLE_ADMIN")) || authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ROLE_DEV"))) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println(form);
            return "success";
        }
        else{
            return "fail";
        }
    }

    public String returnUsername(String usernameOrEmail){
        return userRepository.simpleFindByUsernameOrEmail(usernameOrEmail).getUsername();
    }
}
