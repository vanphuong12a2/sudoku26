import React from 'react';
import BoardContainer from "./Board/BoardContainer";
import ControlArea from "./ControlArea/ControlArea";
import './Game.css'
import {CellType} from "./Cell/Cell";

interface Props {
    boardData: CellType[][]
    newGameOnClickHandler: () => void
    clearBoardOnClickHandler: () => void
}

const Game = (props: Props) => {
    return (
        <div className='game-container'>
            <BoardContainer boardData={props.boardData}/>
            <ControlArea
                newGameOnClickHandler={props.newGameOnClickHandler}
                clearBoardOnClickHandler={props.clearBoardOnClickHandler}
            />
        </div>
    );
};

export default Game;