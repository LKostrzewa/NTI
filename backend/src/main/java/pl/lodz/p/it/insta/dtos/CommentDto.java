package pl.lodz.p.it.insta.dtos;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private Long id;

    private String content;

    private LocalDateTime addDate;

    private AccountSummaryDto account;

    public CommentDto(Long id, String content, LocalDateTime addDate, AccountSummaryDto account) {
        this.id = id;
        this.content = content;
        this.addDate = addDate;
        this.account = account;
    }

    public CommentDto() {
    }
}