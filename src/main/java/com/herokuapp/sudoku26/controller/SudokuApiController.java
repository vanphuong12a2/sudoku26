package com.herokuapp.sudoku26.controller;

import com.herokuapp.sudoku26.service.BoardService;
import com.herokuapp.sudoku26.solver.AbstractSolver;
import com.herokuapp.sudoku26.solver.exception.InvalidParameterException;
import com.herokuapp.sudoku26.solver.exception.NoSolutionFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SudokuApiController {
    private final BoardService boardService;
    private final AbstractSolver solver;

    @Autowired
    public SudokuApiController(BoardService boardService, AbstractSolver solver) {
        this.boardService = boardService;
        this.solver = solver;
    }

    @GetMapping("/board/random")
    public int[] getRandomBoard() {
        return boardService.getRandomBoard();
    }

    @GetMapping("/board/solved")
    public int[] solveBoard(@PathVariable @RequestParam int[] inputBoard) throws InvalidParameterException, NoSolutionFoundException {
        return solver.solve(inputBoard);
    }

    @ExceptionHandler(InvalidParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleInvalidParameterException(){ }

    @ExceptionHandler(NoSolutionFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleNoSolutionFoundException(){ }
}
