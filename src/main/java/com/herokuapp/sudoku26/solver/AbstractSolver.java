package com.herokuapp.sudoku26.solver;

import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.springframework.stereotype.Component;

@Component
public abstract class AbstractSolver {

    private static final int BOARD_SIZE = 81;

    public int[] solve(int[] inputBoard) throws InvalidParameterException, NoSolutionFoundException {
        if (inputBoard.length != BOARD_SIZE) {
            throw new InvalidParameterException();
        } else {
            return search(inputBoard);
        }
    }

    abstract int[] search(int[] inputBoard) throws NoSolutionFoundException;
}

