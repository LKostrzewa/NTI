package pl.lodz.p.it.insta.security.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountSummary {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;

    public AccountSummary(Long id, String username, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}