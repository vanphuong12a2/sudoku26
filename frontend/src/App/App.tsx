import React, {Component} from 'react';
import BoardContainer from '../Board/BoardContainer';
import {generateBoard} from '../common/boardFunctions';

class App extends Component {
    render() {
        let boardData = generateBoard();
        return (
            <React.Fragment>
                <header>Sudoku solver</header>
                <BoardContainer boardData={boardData}/>
            </React.Fragment>
        );
    }
}

export default App;
