package com.herokuapp.sudoku26.service;

import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class BoardServiceTest {

    @Test
    public void shouldGetRandomBoard() {
        int[] randomBoard = new BoardService().getRandomBoard();

        assertThat(randomBoard.length, is(81));
    }
}