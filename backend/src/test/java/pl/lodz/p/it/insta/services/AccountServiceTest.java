package pl.lodz.p.it.insta.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.insta.entities.Account;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @Test(expected = ResourceNotFoundException.class)
    public void findByUsernameExceptionTest() {
        accountService.findByUsername("NieMa");
    }


    @Test
    public void editUserTest() {
        accountService.editUser("Jan", "Pawlak", "JPawlak88@wp.pl");
        Assert.assertTrue(accountService.existsByEmail("JPawlak88@wp.pl"));
        Assert.assertFalse(accountService.existsByEmail("obibobi@o2.pl"));

        Account account = accountService.findByUsername("ObiKenobi14");
        Assert.assertEquals(account.getFirstName(), "Jan");
        Assert.assertEquals(account.getLastName(), "Pawlak");
        Assert.assertEquals(account.getEmail(), "JPawlak88@wp.pl");
    }
}