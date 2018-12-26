package com.herokuapp.sudoku26.service;

import com.herokuapp.sudoku26.solver.AbstractSolver;
import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class BoardServiceTest {

    @Mock
    AbstractSolver mockSolver;

    @InjectMocks
    private BoardService boardService;

    @Test
    public void shouldGetRandomBoard() {
        int[] randomBoard = boardService.getRandomBoard();

        assertThat(randomBoard.length, is(81));
    }

    @Test
    public void shouldSolveBoard() throws InvalidParameterException, NoSolutionFoundException {
        int[] inputBoard = {1, 2, 3};
        int[] expectBoard = {4, 5, 6};
        when(mockSolver.solve(inputBoard)).thenReturn(expectBoard);

        assertArrayEquals(expectBoard, boardService.solve(inputBoard));
    }
}