import React from 'react';
import Cell, {EMPTY_CELL} from '../Cell/Cell';
import './Board.css';
import {getIllegalCellsMap, INVALID_CELL} from '../../common/boardFunctions';

interface Props {
    boardData: number[][]
    currentBoard: number[][]
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: number) => void
}

const Board = (props: Props) => {

    const illegalCellsMap = getIllegalCellsMap(props.currentBoard);
    return (
        <table className='main-board'>
            <tbody>
            {props.currentBoard.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {
                            props.currentBoard[rowIndex].map((cellData, columnIndex) => {
                                return (
                                    <Cell
                                        key={columnIndex}
                                        cellData={cellData}
                                        invalid={illegalCellsMap[rowIndex][columnIndex] === INVALID_CELL}
                                        readOnly={props.boardData[rowIndex][columnIndex] !== EMPTY_CELL}
                                        onCellChange={props.onCellChange(rowIndex, columnIndex)}
                                    />
                                );
                            })
                        }
                    </tr>);
            })}
            </tbody>
        </table>
    );
};

export default Board;