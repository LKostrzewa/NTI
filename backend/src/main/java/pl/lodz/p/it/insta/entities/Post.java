package pl.lodz.p.it.insta.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] lob;
    private String description;
    private LocalDateTime date;
    @ManyToOne
    private Account account;
    //location to potem bajerka

    //sugestia
    @OneToMany (mappedBy = "post")
    private Collection<Comment> comments = new ArrayList<>();
}
