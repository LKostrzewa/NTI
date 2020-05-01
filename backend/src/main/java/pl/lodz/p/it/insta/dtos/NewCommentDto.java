package pl.lodz.p.it.insta.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewCommentDto {
    String postId;
    String content;
}
