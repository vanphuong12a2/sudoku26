import React from 'react';
import ControlArea from './ControlArea/ControlArea';
import './Game.css'
import Board from './Board/Board';

interface Props {
    boardData: number[][]
    currentBoard: number[][]
    newGameOnClickHandler: () => void
    refreshGameOnClickHandler: () => void
    clearBoardOnClickHandler: () => void
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: number) => void
}

const Game = (props: Props) => {
    return (
        <div className='game-container'>
            <Board
                boardData={props.boardData}
                currentBoard={props.currentBoard}
                onCellChange={props.onCellChange}
            />
            <ControlArea
                newGameOnClickHandler={props.newGameOnClickHandler}
                refreshGameOnClickHandler={props.refreshGameOnClickHandler}
                clearBoardOnClickHandler={props.clearBoardOnClickHandler}
            />
        </div>
    );
};

export default Game;