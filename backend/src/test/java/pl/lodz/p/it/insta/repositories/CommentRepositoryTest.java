package pl.lodz.p.it.insta.repositories;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Example;
import org.springframework.test.context.junit4.SpringRunner;
import pl.lodz.p.it.insta.entities.Comment;

import javax.validation.ConstraintViolationException;


@RunWith(SpringRunner.class)
@DataJpaTest
public class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;


    @Test(expected = ConstraintViolationException.class)
    public void addCommentToPost() {
        Comment comment = new Comment();
        comment.setContent("content");
        commentRepository.save(comment);
        Assert.assertTrue(commentRepository.exists(Example.of(comment)));
        commentRepository.delete(comment);
        Assert.assertFalse(commentRepository.exists(Example.of(comment)));
    }

    @Test(expected = ConstraintViolationException.class)
    public void addEmptyCommentToPost() {
        Comment comment = new Comment();
        comment.setContent("");
        commentRepository.save(comment);
        Assert.assertFalse(commentRepository.exists(Example.of(comment)));
    }
}