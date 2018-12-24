import React from 'react';
import Game from './Game';
import {generateBoard, generateEmptyBoard} from '../common/boardFunctions';

interface Props {
}

interface State {
    currentBoard: number[][]
}

class GameContainer extends React.Component<{}, State> {

    constructor(props: Props) {
        super(props);
        this.state = {currentBoard: generateBoard()}
    }

    render() {
        return (
            <Game
                boardData={this.state.currentBoard}
                newGameOnClickHandler={this.newGameOnClickHandler}
                clearBoardOnClickHandler={this.clearBoardOnClickHandler}
            />);
    }

    public clearBoardOnClickHandler = () => {
        this.setState({currentBoard: generateEmptyBoard()});
    };

    public newGameOnClickHandler = () => {
        this.setState({currentBoard: generateBoard()});
    };
}

export default GameContainer;