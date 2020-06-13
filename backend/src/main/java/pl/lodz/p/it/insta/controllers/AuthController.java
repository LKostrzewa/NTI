package pl.lodz.p.it.insta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.security.JwtTokenProvider;
import pl.lodz.p.it.insta.dtos.ApiResponse;
import pl.lodz.p.it.insta.dtos.JwtAuthenticationResponse;
import pl.lodz.p.it.insta.dtos.LoginRequestDto;
import pl.lodz.p.it.insta.dtos.SignUpRequestDto;
import pl.lodz.p.it.insta.services.AccountService;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private AccountService accountService;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider tokenProvider;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setAccountService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setTokenProvider(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getUsername(),
                        loginRequestDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        if (accountService.existsByUsername(signUpRequestDto.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken"),
                    HttpStatus.BAD_REQUEST);
        }

        if (accountService.existsByEmail(signUpRequestDto.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email address already in use"),
                    HttpStatus.BAD_REQUEST);
        }

        Account account = new Account(signUpRequestDto.getUsername(), signUpRequestDto.getFirstName(),
                signUpRequestDto.getLastName(), signUpRequestDto.getPassword(), signUpRequestDto.getEmail(),
                true);

        account.setPassword(passwordEncoder.encode(account.getPassword()));

        Account result = accountService.addAccount(account);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}

