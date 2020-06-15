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
import pl.lodz.p.it.insta.dtos.EditTopicDto;
import pl.lodz.p.it.insta.dtos.EditUserDto;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "ObiKenobi14", password = "Duch123")
public class AccountControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getUserProfileTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/Ksiezniczka123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", is("Ksiezniczka123")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Leia")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Organa")));
    }

    @Test
    public void getUserProfileWrongTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/NieMaGo")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void checkUsernameAvailability() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/checkUsernameAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .param("username", "NieMaGo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.available", is(true)));

        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/checkUsernameAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .param("username", "$$VADER$$"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.available", is(false)));
    }

    @Test
    public void checkEmailAvailability() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/checkEmailAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .param("email", "NieMaGo@wp.pl"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.available", is(true)));

        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/checkEmailAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .param("email", "vader@02.pl"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.available", is(false)));
    }

    @Test
    public void editUserTest() throws Exception {
        Gson gson = new Gson();

        mvc.perform(MockMvcRequestBuilders
                .put("/accounts/editUser")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(new EditUserDto("Jan", "Pawlak", "PawlakJan@wp.pl"))))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                .get("/accounts/ObiKenobi14")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Jan")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Pawlak")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email", is("PawlakJan@wp.pl")));
    }
}