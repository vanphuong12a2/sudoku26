package com.herokuapp.sudoku26;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT, classes = Application.class)
public class E2EWebDriverTest {
    private static final int WEBDRIVER_WAIT_TIMEOUT_IN_SECONDS = 30;
    private WebDriver webdriver;

    @LocalServerPort
    protected String port;

    @Before
    public void setUp() {
        webdriver = new ChromeDriver();
    }

    @After
    public void tearDown(){
        webdriver.close();
    }

    @Test
    public void shouldShowARandomBoardWhenOpen() {
        webdriver.get(String.format("http://localhost:%s/", port));

        new WebDriverWait(webdriver, WEBDRIVER_WAIT_TIMEOUT_IN_SECONDS)
                .until(searchContext -> searchContext.findElements(By.tagName("input")).size() > 0);
    }
}
