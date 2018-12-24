import React from 'react';
import Cell, {EMPTY_CELL} from '../Cell/Cell';
import './Board.css';

interface Props {
    boardData: number[][]
    currentBoard: number[][]
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: number) => void
}

const Board = (props: Props) => {
    return (
        <table className='main-board'>
            <tbody>
            {props.currentBoard.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {
                            props.currentBoard[rowIndex].map((cellData, cellIndex) => {
                                return (
                                    <Cell
                                        key={cellIndex}
                                        cellData={cellData}
                                        readOnly={props.boardData[rowIndex][cellIndex] != EMPTY_CELL}
                                        onCellChange={props.onCellChange(rowIndex, cellIndex)}
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