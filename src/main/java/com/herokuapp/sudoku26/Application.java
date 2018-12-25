package com.herokuapp.sudoku26;

import com.herokuapp.sudoku26.solver.AbstractSolver;
import com.herokuapp.sudoku26.solver.ExactCoverSolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    @Bean
    public static AbstractSolver abstractSolver() {
        return new ExactCoverSolver();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}