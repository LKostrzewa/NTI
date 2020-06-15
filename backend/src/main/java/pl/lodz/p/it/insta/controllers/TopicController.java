package pl.lodz.p.it.insta.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.insta.dtos.*;
import pl.lodz.p.it.insta.services.ForumPostService;
import pl.lodz.p.it.insta.services.TopicService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/forum")
public class TopicController {

    private final TopicService topicService;
    private final ForumPostService forumPostService;
    private final ModelMapper modelMapper;

    @Autowired
    public TopicController(TopicService topicService, ForumPostService forumPostService, ModelMapper modelMapper) {
        this.topicService = topicService;
        this.forumPostService = forumPostService;
        this.modelMapper = modelMapper;
    }


    @GetMapping(produces = "application/json")
    public List<TopicDto> getAll() {
        return topicService.getAll().stream()
                .map(t -> modelMapper.map(t, TopicDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/topic/{id}", produces = "application/json")
    public TopicDto getTopic(@PathVariable Long id) {
        return modelMapper.map(topicService.getTopic(id), TopicDto.class);
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