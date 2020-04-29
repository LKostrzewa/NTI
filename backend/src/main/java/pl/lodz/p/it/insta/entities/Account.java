package pl.lodz.p.it.insta.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@Table(name = "account",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private boolean isActive;
    // wywalalo mi tutaj cykliczna zaleznosc ....
//    @OneToMany(mappedBy = "account")
//    private Collection<Post> posts = new ArrayList<>();

    public Account() {
    }

    public Account(String username, String firstName, String lastName, String password, String email, boolean isActive) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.isActive = isActive;
    }
}
