package pl.lodz.p.it.insta.repositories;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Test
    public void getAllTest() {
        Assert.assertEquals(postRepository.findAll().size(), 9);
    }

    @Test
    public void getCommentsTest() {
        Assert.assertEquals(postRepository.getOne(2L).getComments().size(), 3);
    }

    @Test
    public void deletePostTest() {
        int size = commentRepository.findAll().size();
        postRepository.delete(postRepository.getOne(2L));
        Assert.assertEquals(commentRepository.findAll().size(), size - 3);
    }
}
