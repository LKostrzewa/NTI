package pl.lodz.p.it.insta.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.insta.entities.ForumPost;
import pl.lodz.p.it.insta.entities.Topic;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class ForumPostServiceTest {

    @Autowired
    private ForumPostService forumPostService;

    @Autowired
    private TopicService topicService;

    @Test
    public void addTest() {
        forumPostService.addForumPost("Testowy post", 1);

        Topic topic = topicService.getTopic(1);
        List<ForumPost> forumPosts = (List<ForumPost>) topic.getForumPosts();

        ForumPost post = forumPosts.get(forumPosts.size() - 1);
        Assert.assertEquals(forumPosts.size(), 5);
        Assert.assertEquals(post.getContent(), "Testowy post");
        Assert.assertEquals(post.getAccount().getUsername(), "ObiKenobi14");
        Assert.assertTrue(post.getAddDate().isBefore(LocalDateTime.now().plusMinutes(1))
                && post.getAddDate().isAfter(LocalDateTime.now().minusMinutes(1)));
    }

    @Test(expected = ResourceNotFoundException.class)
    public void addExceptionTest() {
        forumPostService.addForumPost("Testowy post", 10);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteExceptionTest() {
        forumPostService.deleteForumPost(10);
    }

    @Test
    public void updateTest() {
        Topic topic = topicService.getTopic(1);
        List<ForumPost> forumPosts = (List<ForumPost>) topic.getForumPosts();
        String oldContent = forumPosts.get(0).getContent();
        forumPostService.updateForumPost(1, "Testowa zmiana");

        Topic topic2 = topicService.getTopic(1);
        List<ForumPost> forumPosts2 = (List<ForumPost>) topic2.getForumPosts();
        ForumPost forumPostAfterChange = forumPosts2.get(0);
        Assert.assertEquals(forumPostAfterChange.getContent(), "Testowa zmiana");
        Assert.assertNotEquals(forumPostAfterChange.getContent(), oldContent);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void updateExceptionTest() {
        forumPostService.updateForumPost(10, "Testowy post");
    }
}