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
public class Topic implements Comparable<Topic> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 512)
    private String title;
    private LocalDateTime addDate;
    @ManyToOne
    private Account account;
    @OneToMany(mappedBy = "topic", cascade = CascadeType.REMOVE)
    private Collection<ForumPost> forumPosts = new ArrayList<>();

    @Override
    public int compareTo(Topic o) {
        return o.addDate.compareTo(this.addDate);
    }
}