package pl.lodz.p.it.insta.services;

import com.google.common.collect.Ordering;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import pl.lodz.p.it.insta.entities.Topic;
import pl.lodz.p.it.insta.exceptions.ResourceNotFoundException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class TopicServiceTest {

    @Autowired
    private TopicService topicService;

    @Test
    public void getAllTest() {
        Assert.assertEquals(topicService.getAll().size(), 2);
        Assert.assertTrue(Ordering.natural().isOrdered(topicService.getAll()));
    }

    @Test
    public void getTopicTest() {
        Topic topic = topicService.getTopic(1);
        Assert.assertTrue(Ordering.natural().reverse().isOrdered(topic.getForumPosts()));
        Assert.assertEquals(topic.getForumPosts().size(), 4);
        Assert.assertEquals(topic.getTitle(), "Proponuję żeby każdy coś tu napisał o sobie :)");
    }

    @Test(expected = ResourceNotFoundException.class)
    public void getTopicExceptionTest() {
        topicService.getTopic(10);
    }

    @Test
    public void addTopicTest() {
        topicService.addTopic("Testowy temat");

        Topic topic = topicService.getAll().get(0);

        Assert.assertEquals(topicService.getAll().size(), 3);
        Assert.assertEquals(topic.getTitle(), "Testowy temat");
        Assert.assertEquals(topic.getAccount().getUsername(), "ObiKenobi14");
        Assert.assertEquals(topic.getAddDate().getMinute(), LocalDateTime.now().getMinute());
        Assert.assertTrue(topic.getForumPosts().isEmpty());

        topicService.deleteTopic(topic.getId());
        Assert.assertEquals(topicService.getAll().size(), 2);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteExceptionTest() {
        topicService.deleteTopic(10);
    }

    @Test
    public void updateTest() {
        String oldTitle = topicService.getTopic(1).getTitle();

        topicService.updateTopic(1, "Testowa zmiana");

        Topic topicAfterChange = topicService.getTopic(1);
        Assert.assertNotEquals(oldTitle, topicAfterChange.getTitle());
        Assert.assertEquals(topicAfterChange.getTitle(), "Testowa zmiana");
    }

    @Test(expected = ResourceNotFoundException.class)
    public void updateExceptionTest() {
        topicService.updateTopic(10, "Testowa zmiana");
    }
}