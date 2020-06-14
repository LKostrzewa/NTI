package pl.lodz.p.it.insta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.insta.dtos.EditForumPostDto;
import pl.lodz.p.it.insta.dtos.EditTopicDto;
import pl.lodz.p.it.insta.dtos.NewForumPostDto;
import pl.lodz.p.it.insta.dtos.NewTopicDto;
import pl.lodz.p.it.insta.entities.Topic;
import pl.lodz.p.it.insta.services.ForumPostService;
import pl.lodz.p.it.insta.services.TopicService;

import java.util.List;

@RestController
@RequestMapping("/forum")
public class TopicController {

    private final TopicService topicService;
    private final ForumPostService forumPostService;

    @Autowired
    public TopicController(TopicService topicService, ForumPostService forumPostService) {
        this.topicService = topicService;
        this.forumPostService = forumPostService;
    }

    @GetMapping(produces = "application/json")
    public List<Topic> getAll() {
        return topicService.getAll();
    }

    @GetMapping(value = "/topic/{id}", produces = "application/json")
    public Topic getTopic(@PathVariable Long id) {
        return topicService.getTopic(id);
    }

    @PostMapping("/addTopic")
    public void addTopic(@RequestBody NewTopicDto newTopicDto) {
        topicService.addTopic(newTopicDto.getTitle());
    }

    @PostMapping("/addForumPost")
    public void addForumPost(@RequestBody NewForumPostDto newForumPostDto) {
        String content = newForumPostDto.getContent();
        long topicId = newForumPostDto.getTopicId();
        forumPostService.addForumPost(content, topicId);
    }

    @DeleteMapping("/topic/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }

    @DeleteMapping("/forumPost/{id}")
    public void deleteForumPost(@PathVariable Long id) {
        forumPostService.deleteForumPost(id);
    }

    @PutMapping("/editTopic")
    public void updateTopic(@RequestBody EditTopicDto editTopicDto) {
        topicService.updateTopic(editTopicDto.getTopicId(), editTopicDto.getTitle());
    }

    @PutMapping("/editForumPost")
    public void updateForumPost(@RequestBody EditForumPostDto editForumPostDto) {
        forumPostService.updateForumPost(editForumPostDto.getPostId(), editForumPostDto.getContent());
    }
}

