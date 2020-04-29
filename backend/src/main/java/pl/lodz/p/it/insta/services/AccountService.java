package pl.lodz.p.it.insta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.repositories.AccountRepository;

import java.util.Optional;

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

    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    public Boolean existsByUsername(String login) {
        return accountRepository.existsByUsername(login);
    }

    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }
}
