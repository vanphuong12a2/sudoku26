import React from 'react';
import Game from './Game';
import {generateBoard, generateEmptyBoard} from '../common/boardFunctions';

interface Props {
}

interface State {
    boardData: number[][]
    currentBoard: number[][]
}

class GameContainer extends React.Component<{}, State> {

    constructor(props: Props) {
        super(props);
        let newEmptyBoard = generateEmptyBoard();
        this.state = {
            boardData: newEmptyBoard,
            currentBoard: this.copyBoard(newEmptyBoard)
        };
    }

    render() {
        return (
            <Game
                boardData={this.state.boardData}
                currentBoard={this.state.currentBoard}
                onCellChange={this.onCellChange}
                newGameOnClickHandler={this.newGameOnClickHandler}
                clearBoardOnClickHandler={this.clearBoardOnClickHandler}
            />);
    }

    public clearBoardOnClickHandler = () => {
        let newEmptyBoard = generateEmptyBoard();
        this.setState({boardData: newEmptyBoard, currentBoard: this.copyBoard(newEmptyBoard)});
    };

    public newGameOnClickHandler = () => {
        let newBoard = generateBoard();
        this.setState({boardData: newBoard, currentBoard: this.copyBoard(newBoard)});
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