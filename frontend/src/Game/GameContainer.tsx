import React from 'react';
import Game from './Game';
import {generateBoard, generateEmptyBoard, solveBoard} from '../common/boardFunctions';

interface State {
    boardData: number[][]
    currentBoard: number[][]
}

class GameContainer extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        const newBoard = generateEmptyBoard();
        this.state = {
            boardData: newBoard,
            currentBoard: this.copyBoard(newBoard)
        };
    }

    public componentDidMount() {
        generateBoard().then(
            randomBoard => {
                this.setState({
                    boardData: randomBoard,
                    currentBoard: this.copyBoard(randomBoard)
                });
            }
        )
    }

    public render() {
        return (
            <Game
                boardData={this.state.boardData}
                currentBoard={this.state.currentBoard}
                onCellChange={this.onCellChange}
                newGameOnClickHandler={this.newGameOnClickHandler}
                refreshGameOnClickHandler={this.refreshGameOnClickHandler}
                clearBoardOnClickHandler={this.clearBoardOnClickHandler}
                solveGameOnClickHandler={this.solveGameOnClickHandler}
            />);
    }

    public clearBoardOnClickHandler = () => {
        const newEmptyBoard = generateEmptyBoard();
        this.setState({boardData: newEmptyBoard, currentBoard: this.copyBoard(newEmptyBoard)});
    };

    public solveGameOnClickHandler = () => {
        solveBoard(this.state.currentBoard).then(
            solutionBoard => {
                this.setState({
                    boardData: this.state.currentBoard,
                    currentBoard: this.copyBoard(solutionBoard)
                });
            }
        )
    };

    public newGameOnClickHandler = () => {
        generateBoard().then(
            newBoard => {
                this.setState({
                    boardData: newBoard,
                    currentBoard: this.copyBoard(newBoard)
                });
            }
        )
    };

    public refreshGameOnClickHandler = () => {
        this.setState({currentBoard: this.copyBoard(this.state.boardData)});
    };

    public onCellChange = (rowIndex: number, cellIndex: number) => (newValue: number) => {
        this.state.currentBoard[rowIndex][cellIndex] = newValue;
        this.setState({currentBoard: this.state.currentBoard});
    };

    private copyBoard = (board: number[][]) => {
        return board.map(row => row.slice());
    };
}

export default GameContainer;