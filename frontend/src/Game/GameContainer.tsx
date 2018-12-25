import React from 'react';
import Game from './Game';
import {generateBoard, generateEmptyBoard} from '../common/boardFunctions';

interface State {
    boardData: number[][]
    currentBoard: number[][]
}

class GameContainer extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        const newBoard = generateBoard();
        this.state = {
            boardData: newBoard,
            currentBoard: this.copyBoard(newBoard)
        };
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
            />);
    }

    public clearBoardOnClickHandler = () => {
        const newEmptyBoard = generateEmptyBoard();
        this.setState({boardData: newEmptyBoard, currentBoard: this.copyBoard(newEmptyBoard)});
    };

    public newGameOnClickHandler = () => {
        const newBoard = generateBoard();
        this.setState({boardData: newBoard, currentBoard: this.copyBoard(newBoard)});
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