package com.herokuapp.sudoku26.solver;

import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class AbstractSolverTest {

    @Test(expected = InvalidParameterException.class)
    public void shouldThrowInvalidParameterExceptionWhenReceiveWrongInput() throws InvalidParameterException, NoSolutionFoundException {
        int[] emptyBoard = {};
        new TestSolver().solve(emptyBoard);
    }

    @Test
    public void shouldSolveValidBoard() throws InvalidParameterException, NoSolutionFoundException {
        int[] board = {
                0, 0, 8, 6, 0, 4, 3, 0, 0,
                0, 4, 0, 0, 7, 0, 0, 1, 0,
                7, 0, 0, 0, 0, 0, 0, 0, 2,
                4, 0, 0, 0, 8, 0, 0, 0, 9,
                0, 1, 0, 9, 0, 5, 0, 3, 0,
                3, 0, 0, 0, 2, 0, 0, 0, 1,
                6, 0, 0, 0, 0, 0, 0, 0, 5,
                0, 5, 0, 0, 3, 0, 0, 9, 0,
                0, 0, 2, 1, 0, 6, 7, 0, 0};

        assertArrayEquals(board, new TestSolver().solve(board));
    }

    private class TestSolver extends AbstractSolver {

        @Override
        int[] search(int[] inputBoard) {
            return inputBoard;
        }
    }
}