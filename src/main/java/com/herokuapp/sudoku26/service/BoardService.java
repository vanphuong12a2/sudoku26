package com.herokuapp.sudoku26.service;

import com.herokuapp.sudoku26.solver.AbstractSolver;
import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

@Service
@Slf4j
public class BoardService {
    private static final String SUDOKU_SAMPLES = "sudokuSamples.txt";
    private final AbstractSolver solver;

    public BoardService(final AbstractSolver abstractSolver) {
        this.solver = abstractSolver;
    }

    public int[] getRandomBoard() {
        List<String> sampleBoards = getSampleBoards();
        int randomNum = ThreadLocalRandom.current().nextInt(0, sampleBoards.size());
        return Arrays.stream(sampleBoards.get(randomNum).split(""))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    private List<String> getSampleBoards() {
        try {
            ClassPathResource resource = new ClassPathResource(SUDOKU_SAMPLES);
            InputStreamReader inputStreamReader = new InputStreamReader(resource.getInputStream());
            return new BufferedReader(inputStreamReader).lines().collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Fail to get resources", e);
            return emptyList();
        }
    }

    public int[] solve(int[] inputBoard) throws InvalidParameterException, NoSolutionFoundException {
        return solver.solve(inputBoard);
    }
}
