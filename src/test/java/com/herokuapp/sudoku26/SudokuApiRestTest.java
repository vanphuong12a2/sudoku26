package com.herokuapp.sudoku26;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.startsWith;
import static org.hamcrest.core.Is.is;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class SudokuApiRestTest {
    @LocalServerPort
    private int port;

    @Test
    public void shouldReturnRandomBoard() {
        when()
                .get(String.format("http://localhost:%s/api/board/random", port))
                .then()
                .statusCode(is(200))
                .body(startsWith("["))
                .body(endsWith("]"));
    }
}