package pl.lodz.p.it.insta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.p.it.insta.dtos.NewCommentDto;
import pl.lodz.p.it.insta.entities.Post;
import pl.lodz.p.it.insta.services.PostService;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    Logger logger = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(produces = "application/json")
    public List<Post> getAll() {
        return postService.getAll();
    }

    @PostMapping("/addCommentToPost")
    public void addCommentToPost(@RequestBody NewCommentDto newCommentDto) {
        long postId = newCommentDto.getPostId();
        String content = newCommentDto.getContent();
        postService.addCommentToPost(postId, content);
    }

    @RequestMapping(value = "/addPost", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"})
    public void uploadImage(@RequestParam("imageFile") MultipartFile file,
                            @RequestParam("description") String description) {
        try {
            byte[] lob = file.getBytes();
            postService.addPost(description, lob);
        } catch (IOException e) {
            logger.info("File upload problem");
        }
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
