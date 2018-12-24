import React, {Component} from 'react';
import BoardContainer from '../Board/BoardContainer';
import {generateBoard} from '../common/boardFunctions';
import './App.css'

class App extends Component {
    render() {
        let boardData = generateBoard();
        return (
            <React.Fragment>
                <header><h4>Sudoku 26</h4></header>
                <BoardContainer boardData={boardData}/>
            </React.Fragment>
        );
    }
}

export default App;
