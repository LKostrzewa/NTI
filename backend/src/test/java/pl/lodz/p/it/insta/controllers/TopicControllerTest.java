package pl.lodz.p.it.insta.controllers;

import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import pl.lodz.p.it.insta.dtos.EditForumPostDto;
import pl.lodz.p.it.insta.dtos.EditTopicDto;
import pl.lodz.p.it.insta.dtos.NewForumPostDto;
import pl.lodz.p.it.insta.dtos.NewTopicDto;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class TopicControllerTest {

    private final Gson gson = new Gson();
    @Autowired
    private MockMvc mvc;

    @Test
    public void getAll() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/forum")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].title", is("Proponuję żeby każdy coś tu napisał o sobie :)")));
    }

    @Test
    public void getTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title", is("Proponuję żeby każdy coś tu napisał o sobie :)")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.account.username", is("JonBękart12")));
    }

    @Test
    public void getWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void addTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/forum/addTopic")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new NewTopicDto("Testowy temat"))))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title", is("Testowy temat")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].account.username", is("ObiKenobi14")));
    }

    @Test
    public void addPostTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/forum/addForumPost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new NewForumPostDto("Testowy post", 2))))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.forumPosts", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.forumPosts[1].account.username", is("ObiKenobi14")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.forumPosts[1].content", is("Testowy post")));
    }

    @Test
    public void addPostWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/forum/addForumPost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new NewForumPostDto("Testowy post", 10))))
                .andExpect(status().is(404));
    }

    @Test
    public void deleteTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/forum/topic/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void deleteWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/forum/topic/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void deletePostTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/forum/forumPost/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.forumPosts", hasSize(3)));
    }

    @Test
    public void deletePostWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/forum/forumPost/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void updateTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .put("/forum/editTopic")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new EditTopicDto("Testowy tytul", 2))))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title", is("Testowy tytul")));
    }

    @Test
    public void updateWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .put("/forum/editTopic")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new EditTopicDto("Testowy tytul", 10))))
                .andExpect(status().is(404));
    }

    @Test
    public void updatePostTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .put("/forum/editForumPost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new EditForumPostDto("Testowy post", 4))))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/forum/topic/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.forumPosts[-1].content", is("Testowy post")));
    }
}