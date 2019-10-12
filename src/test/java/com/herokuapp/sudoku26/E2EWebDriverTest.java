package com.herokuapp.sudoku26;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import io.github.bonigarcia.wdm.DriverManagerType;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
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
    private WebDriver driver;

    @LocalServerPort
    protected String port;


    @BeforeClass
    public static void setUpClass() {
        ChromeDriverManager.getInstance(DriverManagerType.CHROME).setup();
    }

    @Before
    public void setUp() {
        driver = new ChromeDriver();
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @Ignore
    public void shouldShowARandomBoardWhenOpen() {
        driver.get(String.format("http://localhost:%s/", port));

        new WebDriverWait(driver, WEBDRIVER_WAIT_TIMEOUT_IN_SECONDS)
            .until(searchContext -> searchContext.findElements(By.tagName("input")).size() > 0);
    }
}
