package pl.lodz.p.it.insta.repositories;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AccountRepositoryTest {

    @Autowired
    private AccountRepository accountRepository;

    @Test
    public void findByTest() {
        Assert.assertTrue(accountRepository.findByUsername("ObiKenobi14").isPresent());
        Assert.assertTrue(accountRepository.findByUsername("NieMaGo").isEmpty());
    }

    @Test
    public void existsTests() {
        Assert.assertTrue(accountRepository.existsByEmail("duch@o2.pl"));
        Assert.assertFalse(accountRepository.existsByEmail("duch12@o2.pl"));

        Assert.assertFalse(accountRepository.existsByUsername("NieMaGo"));
        Assert.assertTrue(accountRepository.existsByUsername("ObiKenobi14"));
    }
}