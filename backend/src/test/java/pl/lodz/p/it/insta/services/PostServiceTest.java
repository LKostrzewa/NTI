package pl.lodz.p.it.insta.services;

import com.google.common.collect.Ordering;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.insta.entities.Comment;
import pl.lodz.p.it.insta.entities.Post;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class PostServiceTest {

    @Autowired
    private PostService postService;

    @Test
    public void getAllTest() {
        Assert.assertEquals(postService.getAll().size(), 9);
        Assert.assertTrue(Ordering.natural().isOrdered(postService.getAll()));
    }

    @Test
    public void getCommentsTest() {
        Post post = postService.getAll().get(0);
        Assert.assertEquals(post.getComments().size(), 3);
        Assert.assertTrue(Ordering.natural().isOrdered(post.getComments()));
    }

    @Test
    public void addCommentTest() {
        postService.addCommentToPost(2, "Komentarz testowy");

        Post post = postService.getAll().get(0);
        List<Comment> comments = (List<Comment>) post.getComments();
        Comment comment = comments.get(comments.size() - 1);
        Assert.assertEquals(comment.getContent(), "Komentarz testowy");
        Assert.assertEquals(comments.size(), 4);
        Assert.assertEquals(comment.getAccount().getUsername(), "ObiKenobi14");
        Assert.assertTrue(comment.getAddDate().isBefore(LocalDateTime.now().plusMinutes(1))
                && comment.getAddDate().isAfter(LocalDateTime.now().minusMinutes(1)));
        Assert.assertEquals(comment.getPost().getDescription(), "Złapałem jakąś dzikuske, mówi że nazywa się Ygritte");
    }

    @Test(expected = ResourceNotFoundException.class)
    public void addCommentExceptionTest() {
        postService.addCommentToPost(72, "Komentarz testowy 2");
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteExceptionTest() {
        postService.deletePost(72);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteCommentExceptionTest() {
        postService.deletePostComment(72);
    }

    @Test
    public void addPost() throws IOException {
        InputStream is = getClass().getResourceAsStream("/test.jpg");
        byte[] bytes = is.readAllBytes();

        postService.addPost("Testowy post", bytes);
        Post post = postService.getAll().get(0);

        Assert.assertEquals(postService.getAll().size(), 10);
        Assert.assertEquals(post.getAccount().getUsername(), "ObiKenobi14");
        Assert.assertEquals(post.getDescription(), "Testowy post");
        Assert.assertEquals(post.getLob(), bytes);
        Assert.assertTrue(post.getAddDate().isBefore(LocalDateTime.now().plusMinutes(1))
                && post.getAddDate().isAfter(LocalDateTime.now().minusMinutes(1)));
        Assert.assertTrue(post.getComments().isEmpty());

        postService.deletePost(post.getId());
        Assert.assertEquals(postService.getAll().size(), 9);
    }
}