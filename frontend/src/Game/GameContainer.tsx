import React from 'react';
import Game from './Game';
import {generateBoard} from '../common/boardFunctions';

interface Props {}

interface State {
    currentBoard: (number | undefined)[][]
}

class GameContainer extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {currentBoard: generateBoard()}
    }

    render(){
        return (<Game boardData={this.state.currentBoard}/>);
    }
}

export default GameContainer;