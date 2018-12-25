package com.herokuapp.sudoku26.solver;

import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class ExactCoverSolverTest {

    @Test
    public void shouldSolveValidBoard1() throws InvalidParameterException, NoSolutionFoundException {
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

        int[] expectedResult = {
                2, 9, 8, 6, 1, 4, 3, 5, 7,
                5, 4, 6, 2, 7, 3, 9, 1, 8,
                7, 3, 1, 5, 9, 8, 4, 6, 2,
                4, 2, 5, 3, 8, 1, 6, 7, 9,
                8, 1, 7, 9, 6, 5, 2, 3, 4,
                3, 6, 9, 4, 2, 7, 5, 8, 1,
                6, 7, 3, 8, 4, 9, 1, 2, 5,
                1, 5, 4, 7, 3, 2, 8, 9, 6,
                9, 8, 2, 1, 5, 6, 7, 4, 3};

        assertArrayEquals(expectedResult, new ExactCoverSolver().solve(board));
    }

    @Test
    public void shouldSolveValidBoard2() throws InvalidParameterException, NoSolutionFoundException {
        int[] board = {
                9, 0, 3, 0, 0, 0, 7, 8, 5,
                0, 0, 0, 0, 0, 0, 3, 6, 2,
                0, 8, 0, 0, 5, 3, 0, 0, 0,
                3, 0, 0, 0, 0, 9, 8, 0, 1,
                4, 0, 0, 0, 3, 0, 6, 0, 7,
                0, 0, 0, 2, 0, 0, 4, 0, 3,
                0, 3, 0, 0, 7, 1, 0, 0, 6,
                0, 0, 0, 0, 0, 5, 0, 0, 0,
                5, 0, 1, 0, 0, 0, 0, 0, 0};

        int[] expectedResult = {
                9, 4, 3, 6, 1, 2, 7, 8, 5,
                7, 1, 5, 8, 9, 4, 3, 6, 2,
                2, 8, 6, 7, 5, 3, 9, 1, 4,
                3, 6, 7, 5, 4, 9, 8, 2, 1,
                4, 2, 9, 1, 3, 8, 6, 5, 7,
                1, 5, 8, 2, 6, 7, 4, 9, 3,
                8, 3, 2, 9, 7, 1, 5, 4, 6,
                6, 9, 4, 3, 2, 5, 1, 7, 8,
                5, 7, 1, 4, 8, 6, 2, 3, 9};

        assertArrayEquals(expectedResult, new ExactCoverSolver().solve(board));
    }

    @Test
    public void shouldSolveValidBoard3() throws InvalidParameterException, NoSolutionFoundException {
        int[] board = {
                8, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 3, 6, 0, 0, 0, 0, 0,
                0, 7, 0, 0, 9, 0, 2, 0, 0,
                0, 5, 0, 0, 0, 7, 0, 0, 0,
                0, 0, 0, 0, 4, 5, 7, 0, 0,
                0, 0, 0, 1, 0, 0, 0, 3, 0,
                0, 0, 1, 0, 0, 0, 0, 6, 8,
                0, 0, 8, 5, 0, 0, 0, 1, 0,
                0, 9, 0, 0, 0, 0, 4, 0, 0};

        int[] expectedResult = {
                8, 1, 2, 7, 5, 3, 6, 4, 9,
                9, 4, 3, 6, 8, 2, 1, 7, 5,
                6, 7, 5, 4, 9, 1, 2, 8, 3,
                1, 5, 4, 2, 3, 7, 8, 9, 6,
                3, 6, 9, 8, 4, 5, 7, 2, 1,
                2, 8, 7, 1, 6, 9, 5, 3, 4,
                5, 2, 1, 9, 7, 4, 3, 6, 8,
                4, 3, 8, 5, 2, 6, 9, 1, 7,
                7, 9, 6, 3, 1, 8, 4, 5, 2};

        assertArrayEquals(expectedResult, new ExactCoverSolver().solve(board));
    }

    @Test(expected = NoSolutionFoundException.class)
    public void shouldThrowExceptionWhenThereIsNoSolution() throws InvalidParameterException, NoSolutionFoundException {
        int[] board = {
                8, 8, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 3, 6, 0, 0, 0, 0, 0,
                0, 7, 0, 0, 9, 0, 2, 0, 0,
                0, 5, 0, 0, 0, 7, 0, 0, 0,
                0, 0, 0, 0, 4, 5, 7, 0, 0,
                0, 0, 0, 1, 0, 0, 0, 3, 0,
                0, 0, 1, 0, 0, 0, 0, 6, 8,
                0, 0, 8, 5, 0, 0, 0, 1, 0,
                0, 9, 0, 0, 0, 0, 4, 0, 0};

        new ExactCoverSolver().solve(board);
    }
}