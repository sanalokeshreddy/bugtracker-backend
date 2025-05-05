package com.devsage.bugtracker.controller;

import com.devsage.bugtracker.model.Bug;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BugController.class)
public class BugControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturn200OnGetBugs() throws Exception {
        mockMvc.perform(get("/bugs")).andExpect(status().isOk());
    }
}
