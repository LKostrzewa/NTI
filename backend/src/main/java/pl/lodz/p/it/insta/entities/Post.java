package pl.lodz.p.it.insta.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
public class Post implements Comparable<Post> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] lob;
    @NotNull
    @Size(min = 1, max = 250)
    private String description;
    @NotNull
    private LocalDateTime addDate;
    @NotNull
    @ManyToOne
    private Account account;
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    @Lazy(false)
    private Collection<Comment> comments = new ArrayList<>();

    @Override
    public int compareTo(Post post) {
        return post.addDate.compareTo(this.addDate);
    }
}