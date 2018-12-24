import React, {Component} from 'react';
import './App.css'
import GameContainer from '../Game/GameContainer';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <header><h4>Sudoku 26</h4></header>
                <body className='body-container'>
                    <GameContainer/>
                </body>
            </React.Fragment>
        );
    }
}

export default App;
