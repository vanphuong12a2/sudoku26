import React, {Component} from 'react';
import './App.css'
import GameContainer from '../Game/GameContainer';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <h3>Sudoku 26</h3>
                </header>
                <GameContainer/>
            </React.Fragment>
        );
    }
}

export default App;
