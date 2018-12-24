import React from 'react';
import Cell, {CellType} from '../Cell/Cell';
import './Board.css';

interface Props {
    boardData: CellType[][]
    currentBoard: CellType[][]
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: CellType) => void
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
                                        readOnly={props.boardData[rowIndex][cellIndex] != undefined}
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