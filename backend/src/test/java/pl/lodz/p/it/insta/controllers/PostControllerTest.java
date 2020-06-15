package pl.lodz.p.it.insta.controllers;

import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import pl.lodz.p.it.insta.dtos.NewCommentDto;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class PostControllerTest {

    @Autowired
    private MockMvc mvc;

    private final Gson gson = new Gson();

    @Test
    public void getAllTest() throws Exception {
        mvc.perform( MockMvcRequestBuilders
                .get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(10)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].description", is("Się jara dzieciaku he he...")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[5].account.username", is("ObiKenobi14")));
    }


    @Test
    public void addTest() throws Exception {
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.png", MediaType.IMAGE_PNG_VALUE, "<<data>>".getBytes());

        mvc.perform(MockMvcRequestBuilders
                .multipart("/posts/addPost")
                .file(file)
                .param("description", "Testowy post"))
                .andExpect(status().isOk());
    }

    @Test
    public void addCommentTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/posts/addCommentToPost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new NewCommentDto(1, "Testowy komentarz"))))
                .andExpect(status().isOk());

        mvc.perform( MockMvcRequestBuilders
                .get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[3].comments", hasSize(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[3].comments[0].content", is("Testowy komentarz")));
    }

    @Test
    public void addCommentWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/posts/addCommentToPost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new NewCommentDto(20, "Testowy komentarz"))))
                .andExpect(status().is(404));
    }

    @Test
    public void deleteTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/posts/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform( MockMvcRequestBuilders
                .get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(9)));
    }

    @Test
    public void deleteWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/posts/post/20")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void deleteCommentTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/posts/postComment/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform( MockMvcRequestBuilders
                .get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].comments", hasSize(2)));
    }

    @Test
    public void deleteCommentWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/posts/postComment/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }
}