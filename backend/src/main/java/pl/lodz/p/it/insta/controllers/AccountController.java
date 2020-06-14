package pl.lodz.p.it.insta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;
import pl.lodz.p.it.insta.security.UserDetailsImpl;
import pl.lodz.p.it.insta.dtos.AccountDetailsDto;
import pl.lodz.p.it.insta.dtos.AccountSummaryDto;
import pl.lodz.p.it.insta.dtos.UserIdentityAvailability;
import pl.lodz.p.it.insta.services.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/me")
    public AccountSummaryDto getCurrentUser(Authentication authentication) {
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
        return new AccountSummaryDto(currentUser.getId(), currentUser.getUsername(),
                currentUser.getFirstName(), currentUser.getLastName());
    }

    @GetMapping("/{username}")
    public AccountDetailsDto getUserProfile(@PathVariable(value = "username") String username) {
        Account account = accountService.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "username", username));

        return new AccountDetailsDto(account.getFirstName(), account.getLastName(),
                account.getUsername(), account.getEmail());
    }

    @GetMapping("/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        return new UserIdentityAvailability(!accountService.existsByUsername(username));
    }

    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        return new UserIdentityAvailability(!accountService.existsByEmail(email));
    }
}
