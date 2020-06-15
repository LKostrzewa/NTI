package pl.lodz.p.it.insta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;
import pl.lodz.p.it.insta.repositories.AccountRepository;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account addAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "username", username));
    }

    public Boolean existsByUsername(String login) {
        return accountRepository.existsByUsername(login);
    }

    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    public void editUser(String firstName, String lastName, String email) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account editedAccount = accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "username", username));

        editedAccount.setFirstName(firstName);
        editedAccount.setLastName(lastName);
        editedAccount.setEmail(email);

        accountRepository.save(editedAccount);
    }
}