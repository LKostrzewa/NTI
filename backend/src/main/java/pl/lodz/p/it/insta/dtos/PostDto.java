package pl.lodz.p.it.insta.dtos;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostDto {

    private Long id;
    private byte[] lob;
    private String description;
    private LocalDateTime addDate;
    private AccountSummaryDto account;
    private List<CommentDto> comments = new ArrayList<>();

    public PostDto(Long id, byte[] lob, String description, LocalDateTime addDate, AccountSummaryDto account, List<CommentDto> comments) {
        this.id = id;
        this.lob = lob;
        this.description = description;
        this.addDate = addDate;
        this.account = account;
        this.comments = comments;
    }

    public PostDto() {
    }
}