package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
