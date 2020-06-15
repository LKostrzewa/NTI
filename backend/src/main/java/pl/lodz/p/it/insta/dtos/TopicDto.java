package pl.lodz.p.it.insta.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
public class TopicDto {

    private Long id;
    private String title;
    private LocalDateTime addDate;
    private AccountSummaryDto account;
    private Collection<ForumPostDto> forumPosts = new ArrayList<>();

    public TopicDto(Long id, String title, LocalDateTime addDate, AccountSummaryDto account, Collection<ForumPostDto> forumPosts) {
        this.id = id;
        this.title = title;
        this.addDate = addDate;
        this.account = account;
        this.forumPosts = forumPosts;
    }

    public TopicDto() {
    }
}