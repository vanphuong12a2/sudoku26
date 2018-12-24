import React from 'react';
import Board from './Board';

interface Props {
    boardData: (number | undefined)[][]
}

interface State {
    currentBoard: (number | undefined)[][]
}

class BoardContainer extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {currentBoard: this.props.boardData};
    }

    render() {
        return (
            <Board
                boardData={this.props.boardData}
                currentBoard={this.state.currentBoard}/>
        )
    }
}

export default BoardContainer;