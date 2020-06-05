package pl.lodz.p.it.insta.security.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDetails {
    private String firstName;
    private String lastName;
    private String username;
    private String email;

    public AccountDetails(String firstName, String lastName, String username, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
    }
}