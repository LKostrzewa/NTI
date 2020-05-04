package pl.lodz.p.it.insta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.insta.entities.Comment;
import pl.lodz.p.it.insta.entities.Post;
import pl.lodz.p.it.insta.repositories.AccountRepository;
import pl.lodz.p.it.insta.repositories.CommentRepository;
import pl.lodz.p.it.insta.repositories.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository, AccountRepository accountRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.accountRepository = accountRepository;
    }

    public List<Post> getAll() {
        List<Post> posts = postRepository.findAll().stream().sorted().collect(Collectors.toList());
        posts.stream().forEach(n -> n.setComments(n.getComments().stream().sorted().collect(Collectors.toList())));
        return posts;
    }

    public void addCommentToPost(String postId, String content) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAddDate(LocalDateTime.now());
        // TODO zmienic na pobieranie usera
        comment.setAccount(accountRepository.findByUsername("JonBekart12").get());
        comment.setPost(postRepository.getOne(Long.decode(postId)));
        commentRepository.save(comment);
    }
}
