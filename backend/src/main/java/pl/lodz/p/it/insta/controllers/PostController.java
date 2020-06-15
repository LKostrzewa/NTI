package pl.lodz.p.it.insta.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.p.it.insta.dtos.NewCommentDto;
import pl.lodz.p.it.insta.dtos.PostDto;
import pl.lodz.p.it.insta.services.PostService;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final ModelMapper modelMapper;
    Logger logger = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

    @Autowired
    public PostController(PostService postService, ModelMapper modelMapper) {
        this.postService = postService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(produces = "application/json")
    public List<PostDto> getAll() {
        return postService.getAll().stream()
                .map(p -> modelMapper.map(p, PostDto.class))
                .collect(Collectors.toList());
    }

    @PostMapping("/addCommentToPost")
    public void addCommentToPost(@RequestBody NewCommentDto newCommentDto) {
        long postId = newCommentDto.getPostId();
        String content = newCommentDto.getContent();
        postService.addCommentToPost(postId, content);
    }

    @PostMapping("/addPost")
    public ResponseEntity<?> addPost(@RequestParam("imageFile") MultipartFile file,
                                     @RequestParam("description") String description) {
        try {
            byte[] lob = file.getBytes();
            postService.addPost(description, lob);
        } catch (IOException e) {
            logger.info("File upload problem");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/post/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @DeleteMapping("/postComment/{id}")
    public void deletePostComment(@PathVariable Long id) {
        postService.deletePostComment(id);
    }
}