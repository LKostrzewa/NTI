package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);

    Boolean existsByUsername(String login);

    Boolean existsByEmail(String email);
}
