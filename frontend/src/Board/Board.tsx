import React from 'react';
import './Board.css';


interface CellProps {
    cellData: number | undefined
    readOnly: boolean
}

const Cell = (props: CellProps) => {
    return (
        <td>
            <input
                className={props.readOnly ? 'readonly' : 'writable'}
                maxLength={1}
                readOnly={props.readOnly}
                value={props.cellData}/>
        </td>
    );
};

interface Props {
    boardData: (number | undefined)[][]
    currentBoard: (number | undefined)[][]
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