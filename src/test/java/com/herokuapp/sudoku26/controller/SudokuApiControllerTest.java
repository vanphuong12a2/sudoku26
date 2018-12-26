package com.herokuapp.sudoku26.controller;

import com.herokuapp.sudoku26.service.BoardService;
import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(controllers = SudokuApiController.class)
public class SudokuApiControllerTest {
    private SudokuApiController sudokuApiController;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    BoardService mockBoardService;

    @Before
    public void setUp() {
        sudokuApiController = new SudokuApiController(mockBoardService);
        mockMvc = standaloneSetup(sudokuApiController).build();
    }

    @Test
    public void shouldReturnRandomBoard() {
        int[] expectedBoard = {};
        when(mockBoardService.getRandomBoard()).thenReturn(expectedBoard);

        int[] randomBoard = sudokuApiController.getRandomBoard();

        assertThat(randomBoard, is(expectedBoard));
    }


    @Test
    public void shouldReturn200StatusAndARandomBoard() throws Exception {
        when(mockBoardService.getRandomBoard()).thenReturn(new int[]{1,2,3});
        mockMvc.perform(get("/api/board/random"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string("[1,2,3]"));
    }

    @Test
    public void shouldReturnBadRequestForInvalidInput() throws Exception {
        mockMvc.perform(get("/api/board/solved?inputBoard=invalid-param"))
                .andExpect(status().is(HttpStatus.BAD_REQUEST.value()));
    }

    @Test
    public void shouldReturnBadRequestForInvalidInputBoard() throws Exception, InvalidParameterException, NoSolutionFoundException {
        when(mockBoardService.solve(new int[]{1,2,3})).thenThrow(new InvalidParameterException());

        mockMvc.perform(get("/api/board/solved?inputBoard=1,2,3"))
                .andExpect(status().is(HttpStatus.BAD_REQUEST.value()));
    }

    @Test
    public void shouldReturnNotFoundForInputBoardWithoutSolution() throws Exception, InvalidParameterException, NoSolutionFoundException {
        when(mockBoardService.solve(new int[]{1,2,3})).thenThrow(new NoSolutionFoundException());

        mockMvc.perform(get("/api/board/solved?inputBoard=1,2,3"))
                .andExpect(status().is(HttpStatus.NOT_FOUND.value()));
    }

    @Test
    public void shouldReturnSolvedBoardForValidInputBoardWithSolution() throws Exception, InvalidParameterException, NoSolutionFoundException {
        when(mockBoardService.solve(new int[]{1,2,3})).thenReturn(new int[]{4,5,6});

        mockMvc.perform(get("/api/board/solved?inputBoard=1,2,3"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string("[4,5,6]"));
    }
}