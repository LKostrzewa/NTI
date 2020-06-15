package pl.lodz.p.it.insta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ForumPost implements Comparable<ForumPost> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime addDate;
    @ManyToOne
    private Account account;
    @ManyToOne
    @JsonIgnore
    private Topic topic;

    @Override
    public int compareTo(ForumPost o) {
        return o.addDate.compareTo(this.addDate);
    }
}