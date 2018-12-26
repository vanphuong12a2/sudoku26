import React from 'react';
import Game from './Game';
import {generateBoard, generateEmptyBoard, solveBoard} from '../common/boardFunctions';

interface State {
    boardData: number[][]
    currentBoard: number[][]
    loading: boolean
}

class GameContainer extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        const newBoard = generateEmptyBoard();
        this.state = {
            boardData: newBoard,
            currentBoard: this.copyBoard(newBoard),
            loading: false
        };
    }

    public componentDidMount() {
        this.setState({loading: true});
        generateBoard().then(
            randomBoard => {
                this.setState({
                    boardData: randomBoard,
                    currentBoard: this.copyBoard(randomBoard),
                    loading: false
                });
            }
        ).catch(() => this.setState({loading: false}));
    }

    public render() {
        return (
            <Game
                loading={this.state.loading}
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
        this.setState({loading: true});
        solveBoard(this.state.currentBoard).then(
            solutionBoard => {
                this.setState({
                    boardData: this.copyBoard(solutionBoard),
                    currentBoard: this.copyBoard(solutionBoard),
                    loading: false
                });
            }
        ).catch(() => this.setState({loading: false}));
    };

    public newGameOnClickHandler = () => {
        this.setState({loading: true});
        generateBoard().then(
            newBoard => {
                this.setState({
                    boardData: newBoard,
                    currentBoard: this.copyBoard(newBoard),
                    loading: false
                });
            }
        ).catch(() => this.setState({loading: false}));
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