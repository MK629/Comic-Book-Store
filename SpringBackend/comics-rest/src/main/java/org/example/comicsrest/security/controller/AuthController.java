package org.example.comicsrest.security.controller;

import org.example.comicsrest.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/test")
    public String test(){
        return "auth test";
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthService.RegisterForm registerForm) {
        return authService.register(registerForm);
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthService.LoginForm loginForm) {
        return authService.login(loginForm);
    }

    @PostMapping("/adminLogin")
    public String adminLogin(@RequestBody AuthService.LoginForm loginForm){
        return authService.adminLogin(loginForm);
    }

    @GetMapping("/getUsername/{usernameOrEmail}")
    public String getUsername(@PathVariable("usernameOrEmail") String usernameOrEmail) {
        return authService.returnUsername(usernameOrEmail);
    }
}
