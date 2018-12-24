import React, {ChangeEvent} from 'react';
import './Board.css';


interface CellProps {
    cellData: number | undefined
    readOnly: boolean
    onCellChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Cell = (props: CellProps) => {
    return (
        <td>
            <input
                className={props.readOnly ? 'readonly' : 'writable'}
                maxLength={1}
                readOnly={props.readOnly}
                value={props.cellData}
                onChange={props.onCellChange}
            />
        </td>
    );
};

interface Props {
    boardData: (number | undefined)[][]
    currentBoard: (number | undefined)[][]
    onCellChange: (rowIndex: number, cellIndex: number) => (event: ChangeEvent<HTMLInputElement>) => void
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