import React from 'react';
import Board from './Board';

interface Props {
    boardData: (number)[][]
}

interface State {
    currentBoard: (number)[][]
}

class BoardContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {currentBoard: this.copyBoard(this.props.boardData)};
    }

    private copyBoard = (board: number[][]) => {
        return board.map(row => row.slice());
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.boardData !== this.props.boardData) {
            this.setState({currentBoard: this.copyBoard(nextProps.boardData)});
        }
    }

    render() {
        return (
            <Board
                boardData={this.props.boardData}
                currentBoard={this.state.currentBoard}
                onCellChange={this.onCellChange}
            />
        )
    }

    public onCellChange = (rowIndex: number, cellIndex: number) => (newValue: number) => {
        this.state.currentBoard[rowIndex][cellIndex] = newValue;
        this.setState({currentBoard: this.state.currentBoard});
    }
}

export default BoardContainer;