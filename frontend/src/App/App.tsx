import React, {Component} from 'react';
import './App.css'
import GameContainer from '../Game/GameContainer';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
    public render() {
        return (
            <React.Fragment>
                <header>
                    <h3>Sudoku 26</h3>
                </header>
                <ErrorBoundary>
                    <GameContainer/>
                </ErrorBoundary>
            </React.Fragment>
        );
    }
}

export default App;
