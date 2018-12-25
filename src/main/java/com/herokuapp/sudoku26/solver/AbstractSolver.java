package com.herokuapp.sudoku26.solver;

abstract class AbstractSolver {

    private static final int BOARD_SIZE = 81;

    int[] solve(int[] inputBoard) throws InvalidParameterException, NoSolutionFoundException {
        if (inputBoard.length != BOARD_SIZE) {
            throw new InvalidParameterException();
        } else {
            return search(inputBoard);
        }
    }

    abstract int[] search(int[] inputBoard) throws NoSolutionFoundException;
}

class NoSolutionFoundException extends Throwable {}
class InvalidParameterException extends Throwable {}