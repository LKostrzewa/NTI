package pl.lodz.p.it.insta.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountSummaryDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;

    public AccountSummaryDto(Long id, String username, String firstName, String lastName, String email) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public AccountSummaryDto() {
    }
}