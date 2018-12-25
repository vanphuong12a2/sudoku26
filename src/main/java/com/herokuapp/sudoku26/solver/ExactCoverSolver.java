package com.herokuapp.sudoku26.solver;

import static com.herokuapp.sudoku26.solver.Direction.BACKTRACK;
import static com.herokuapp.sudoku26.solver.Direction.FORWARD;

enum Direction {
    FORWARD,
    BACKTRACK
}

class ExactCoverSolver extends AbstractSolver {
    private static final int CELL_CONSTRAIN = 0;
    private static final int BOX_CONSTRAIN = 1;
    private static final int ROW_CONSTRAIN = 2;
    private static final int COLUMN_CONSTRAIN = 3;
    private static final int BOARD_SIZE = 9;
    private static final int INVALID_INDEX = BOARD_SIZE + 1;
    private static final int CELLS_SIZE = 81;
    private static final int CONSTRAIN_SETS_SIZE = 4;
    private static final int CONSTRAINS_SIZE = CELLS_SIZE * CONSTRAIN_SETS_SIZE;
    private static final int CANDIDATES_SIZE = CELLS_SIZE * BOARD_SIZE;
    private static final int UNSET_VALUE = -1;
    private static int[][] candidates, constrains;
    private int[] numberOfConstrains, numberOfCandidates;
    private int[] outputCandidateIndexes, outputConstrains;
    private int inputBoardValues;

    ExactCoverSolver() {
        setUpExactCoverMatrixForEmptyBoard();
    }

    @Override
    int[] search(int[] inputBoard) throws NoSolutionFoundException {

        initializeVariables();

        acceptValuesInInputBoard(inputBoard);

        int currentCell = inputBoardValues;

        while (currentCell >= inputBoardValues && currentCell < CELLS_SIZE) {

            int constrain = findConstrainWithMinimumCandidates();
            int nextCandidateIndex = getNextCandidateIndex(currentCell, constrain);

            if (nextCandidateIndex != INVALID_INDEX) {
                acceptACandidate(constrain, nextCandidateIndex, currentCell);
                currentCell += 1;
            } else {
                backtrackAnAcceptedCandidate(outputConstrains[currentCell - 1], outputCandidateIndexes[currentCell - 1], currentCell);
                currentCell -= 1;
            }
        }

        if(currentCell != CELLS_SIZE) throw new NoSolutionFoundException();
        return reArrangeOutputBoard();
    }

    private int getNextCandidateIndex(int currentCell, int constrain) {
        for (int nextCandidateIndex = outputCandidateIndexes[currentCell] + 1; nextCandidateIndex < BOARD_SIZE; nextCandidateIndex++) {
            if (numberOfConstrains[candidates[constrain][nextCandidateIndex]] == CONSTRAIN_SETS_SIZE)
                return nextCandidateIndex;
        }
        return INVALID_INDEX;
    }

    private void acceptValuesInInputBoard(int[] inputBoard) {
        for (int cell = 0; cell < CELLS_SIZE; cell++) {
            int cellValue = inputBoard[cell] - 1;
            if (cellValue >= 0) {
                int candidate = cell * BOARD_SIZE + cellValue;
                acceptACandidate(constrains[candidate][CELL_CONSTRAIN], cellValue, inputBoardValues);
                inputBoardValues++;
            }
        }
    }

    private void acceptACandidate(int constrain, int candidateIndex, int outputCell) {
        considerACandidate(constrain, candidateIndex, outputCell, FORWARD);
    }

    private void backtrackAnAcceptedCandidate(int constrain, int candidateIndex, int outputCell) {
        considerACandidate(constrain, candidateIndex, outputCell, Direction.BACKTRACK);
    }

    private void considerACandidate(int constrain, int candidateIndex, int outputCell, Direction direction) {
        int candidate = candidates[constrain][candidateIndex];

        for (int constrainSet = 0; constrainSet < CONSTRAIN_SETS_SIZE; constrainSet++) {
            int additionCandidates = direction == FORWARD ? BOARD_SIZE : BOARD_SIZE * -1;
            numberOfCandidates[constrains[candidate][constrainSet]] += additionCandidates;
        }

        for (int constrainSet = 0; constrainSet < CONSTRAIN_SETS_SIZE; constrainSet++) {
            for (int candidateIndex2 = 0; candidateIndex2 < BOARD_SIZE; candidateIndex2++) {
                int conflictedCandidate = candidates[constrains[candidate][constrainSet]][candidateIndex2];
                if(direction == BACKTRACK) numberOfConstrains[conflictedCandidate] += 1;
                if (numberOfConstrains[conflictedCandidate] == CONSTRAIN_SETS_SIZE) {
                    for (int constrainSet1 = 0; constrainSet1 < CONSTRAIN_SETS_SIZE; constrainSet1++) {
                        int constrainWithConflictedCandidate = constrains[conflictedCandidate][constrainSet1];
                        int additionCandidates = direction == FORWARD ? 1 : -1;
                        numberOfCandidates[constrainWithConflictedCandidate] -= additionCandidates;
                    }
                }
                if(direction == FORWARD) numberOfConstrains[conflictedCandidate] -= 1;
            }
        }

        outputCandidateIndexes[outputCell] = direction == FORWARD ? candidateIndex: UNSET_VALUE;
        outputConstrains[outputCell] = direction == FORWARD ? constrain: UNSET_VALUE;
    }

    private int findConstrainWithMinimumCandidates() {
        int minConstrain = 0;
        for (int constrain = 1; constrain < CONSTRAINS_SIZE; constrain++) {
            if (numberOfCandidates[constrain] < numberOfCandidates[minConstrain]) {
                minConstrain = constrain;
            }
        }
        return minConstrain;
    }

    private int[] reArrangeOutputBoard() {
        int[] output = new int[CELLS_SIZE];
        for (int cell = 0; cell < CELLS_SIZE; cell++) {
            int candidate = candidates[outputConstrains[cell]][outputCandidateIndexes[cell]];
            output[candidate / BOARD_SIZE] = candidate % BOARD_SIZE + 1;
        }
        return output;
    }

    private void initializeVariables() {
        inputBoardValues = 0;
        numberOfConstrains = new int[CANDIDATES_SIZE];
        numberOfCandidates = new int[CONSTRAINS_SIZE];
        outputCandidateIndexes = new int[CELLS_SIZE];
        outputConstrains = new int[CELLS_SIZE];

        for (int candidate = 0; candidate < CANDIDATES_SIZE; candidate++) {
            numberOfConstrains[candidate] = CONSTRAIN_SETS_SIZE;
        }
        for (int constrain = 0; constrain < CONSTRAINS_SIZE; constrain++) {
            numberOfCandidates[constrain] = BOARD_SIZE;
        }
        for (int cell = 0; cell < CELLS_SIZE; cell++) {
            outputCandidateIndexes[cell] = UNSET_VALUE;
            outputConstrains[cell] = UNSET_VALUE;
        }
    }

    private void setUpExactCoverMatrixForEmptyBoard() {
        setUpConstrainIndexesForCandidates();
        setUpCandidateIndexesForConstrains();
    }

    private static void setUpCandidateIndexesForConstrains() {
        candidates = new int[CONSTRAINS_SIZE][BOARD_SIZE];
        int[] counters = new int[CONSTRAINS_SIZE];
        for (int constrain = 0; constrain < CONSTRAINS_SIZE; constrain++) {
            counters[constrain] = 0;
        }
        for (int candidate = 0; candidate < CANDIDATES_SIZE; candidate++)
            for (int constrainSet = 0; constrainSet < CONSTRAIN_SETS_SIZE; constrainSet++) {
                int constrain = constrains[candidate][constrainSet];
                candidates[constrain][counters[constrain]++] = candidate;
            }
    }

    private static void setUpConstrainIndexesForCandidates() {
        constrains = new int[CANDIDATES_SIZE][CONSTRAIN_SETS_SIZE];

        for (int row = 0; row < BOARD_SIZE; row++)
            for (int column = 0; column < BOARD_SIZE; column++) {
                int cell = row * BOARD_SIZE + column;
                for (int value = 0; value < BOARD_SIZE; value++) {
                    int candidate = cell * BOARD_SIZE + value;
                    int BOX_SIZE = 3;
                    int box = (row / BOX_SIZE) * BOX_SIZE + (column / BOX_SIZE);
                    constrains[candidate][CELL_CONSTRAIN] = cell;
                    constrains[candidate][BOX_CONSTRAIN] = CELLS_SIZE * BOX_CONSTRAIN + box * BOARD_SIZE + value;
                    constrains[candidate][ROW_CONSTRAIN] = CELLS_SIZE * ROW_CONSTRAIN + row * BOARD_SIZE + value;
                    constrains[candidate][COLUMN_CONSTRAIN] = CELLS_SIZE * COLUMN_CONSTRAIN + column * BOARD_SIZE + value;
                }
            }
    }
}
