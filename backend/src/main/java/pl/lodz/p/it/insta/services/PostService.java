package pl.lodz.p.it.insta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.insta.entities.Comment;
import pl.lodz.p.it.insta.entities.Post;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;
import pl.lodz.p.it.insta.repositories.AccountRepository;
import pl.lodz.p.it.insta.repositories.CommentRepository;
import pl.lodz.p.it.insta.repositories.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
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
        posts.forEach(n -> n.setComments(n.getComments().stream().sorted().collect(Collectors.toList())));
        return posts;
    }

    public void addCommentToPost(long postId, String content) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAddDate(LocalDateTime.now());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        comment.setAccount(accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "username", username)));
        comment.setPost(postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId)));
        commentRepository.save(comment);
    }

    public void addPost(String description, byte[] lob) {
        Post post = new Post();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        post.setDescription(description);
        post.setAccount(accountRepository.findByUsername(username).orElseThrow(NoSuchElementException::new));
        post.setAddDate(LocalDateTime.now());
        post.setLob(lob);
        postRepository.save(post);
    }

    public void deletePost(long id) {
        postRepository.delete(postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id)));
    }

    public void deletePostComment(long id) {
        commentRepository.delete(commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id)));
    }
}

