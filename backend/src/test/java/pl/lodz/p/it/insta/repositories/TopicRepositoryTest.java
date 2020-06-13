package pl.lodz.p.it.insta.repositories;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TopicRepositoryTest {

    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private ForumPostRepository forumPostRepository;

    @Test
    public void getAllTest() {
        Assert.assertEquals(topicRepository.findAll().size(), 2);
    }

    @Test
    public void getPostsTest() {
        Assert.assertEquals(topicRepository.getOne(1L).getForumPosts().size(), 4);
    }

    @Test
    public void deletePostTest() {
        int size = forumPostRepository.findAll().size();
        topicRepository.delete(topicRepository.getOne(1L));
        Assert.assertEquals(forumPostRepository.findAll().size(), size - 4);
    }
}