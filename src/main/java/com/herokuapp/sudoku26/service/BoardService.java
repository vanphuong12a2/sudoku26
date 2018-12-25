package com.herokuapp.sudoku26.service;

import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;

import static java.util.Collections.emptyList;

@Service
public class BoardService {

    private static final String SUDOKU_SAMPLES = "sudokuSamples.txt";

    public int[] getRandomBoard() {
        List<String> sampleBoards = getSampleBoards();
        int randomNum = ThreadLocalRandom.current().nextInt(0, sampleBoards.size());
        return Arrays.stream(sampleBoards.get(randomNum).split(""))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    private List<String> getSampleBoards() {
        try {
            Path samplesPath = Paths.get(Objects.requireNonNull(getClass().getClassLoader().getResource(SUDOKU_SAMPLES)).toURI());
            return Files.readAllLines(samplesPath);
        } catch (Exception e) {
            return emptyList();
        }
    }
}
