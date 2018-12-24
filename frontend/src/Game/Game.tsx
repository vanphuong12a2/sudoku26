import React from 'react';
import BoardContainer from "./Board/BoardContainer";
import ControlArea from "./ControlArea/ControlArea";

interface Props {
    boardData: (number | undefined)[][]
}

const Game = (props: Props) => {
    return (
        <React.Fragment>
            <BoardContainer boardData={props.boardData}/>
            <ControlArea/>
        </React.Fragment>
    );
};

export default Game;