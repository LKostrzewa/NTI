package pl.lodz.p.it.insta.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pl.lodz.p.it.insta.entities.Account;

import java.util.Collection;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String email;
    private boolean isActive;

    public UserDetailsImpl(Long id, String username, String firstName, String lastName, String password, String email, boolean isActive) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.isActive = isActive;
    }

    public static UserDetailsImpl create(Account account) {
        return new UserDetailsImpl(
                account.getId(),
                account.getUsername(),
                account.getFirstName(),
                account.getLastName(),
                account.getPassword(),
                account.getEmail(),
                account.isActive());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
