package pl.lodz.p.it.insta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.insta.entities.Comment;
import pl.lodz.p.it.insta.entities.Post;
import pl.lodz.p.it.insta.repositories.CommentRepository;
import pl.lodz.p.it.insta.repositories.PostRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public List<Post> getAll() {
        return postRepository.findAll().stream().sorted().collect(Collectors.toList());
    }

    public void addCommentToPost(Comment comment) {
        commentRepository.save(comment);
    }
}
