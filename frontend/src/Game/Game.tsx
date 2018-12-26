import React from 'react';
import ControlArea from './ControlArea/ControlArea';
import './Game.css';
import Board from './Board/Board';

interface Props {
    loading: boolean
    boardData: number[][]
    currentBoard: number[][]
    newGameOnClickHandler: () => void
    refreshGameOnClickHandler: () => void
    clearBoardOnClickHandler: () => void
    solveGameOnClickHandler: () => void
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: number) => void
}

const Game = (props: Props) => {
    return (
        <React.Fragment>
            <div className='game-container'>
                <Board
                    loading={props.loading}
                    boardData={props.boardData}
                    currentBoard={props.currentBoard}
                    onCellChange={props.onCellChange}
                />
                <ControlArea
                    newGameOnClickHandler={props.newGameOnClickHandler}
                    refreshGameOnClickHandler={props.refreshGameOnClickHandler}
                    clearBoardOnClickHandler={props.clearBoardOnClickHandler}
                    solveGameOnClickHandler={props.solveGameOnClickHandler}
                />
            </div>
        </React.Fragment>
    );
};

export default Game;