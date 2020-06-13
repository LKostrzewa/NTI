package pl.lodz.p.it.insta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment implements Comparable<Comment> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 1)
    private String content;
    private LocalDateTime addDate;
    @ManyToOne
    private Account account;
    @ManyToOne
    @JsonIgnore
    private Post post;

    @Override
    public int compareTo(Comment comment) {
        return this.addDate.compareTo(comment.addDate);
    }
}
