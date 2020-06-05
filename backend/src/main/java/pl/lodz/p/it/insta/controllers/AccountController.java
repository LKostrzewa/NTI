package pl.lodz.p.it.insta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;
import pl.lodz.p.it.insta.security.UserDetailsImpl;
import pl.lodz.p.it.insta.security.payloads.AccountDetails;
import pl.lodz.p.it.insta.security.payloads.AccountSummary;
import pl.lodz.p.it.insta.security.payloads.UserIdentityAvailability;
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
    public AccountSummary getCurrentUser(Authentication authentication) {
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
        return new AccountSummary(currentUser.getId(), currentUser.getUsername(),
                currentUser.getFirstName(), currentUser.getLastName());
    }

    @GetMapping("/{username}")
    public AccountDetails getUserProfile(@PathVariable(value = "username") String username) {
        Account account = accountService.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "username", username));

        return new AccountDetails(account.getFirstName(), account.getLastName(),
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
