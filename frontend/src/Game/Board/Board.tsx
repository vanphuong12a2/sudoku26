import React from 'react';
import Cell, {EMPTY_CELL} from '../Cell/Cell';
import './Board.css';

interface Props {
    loading: boolean
    boardData: number[][]
    currentBoard: number[][]
    onCellChange: (rowIndex: number, cellIndex: number) => (newValue: number) => void
}

const Board = (props: Props) => {

    const boardTable = <table>
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
                                    readOnly={props.boardData[rowIndex][cellIndex] !== EMPTY_CELL}
                                    onCellChange={props.onCellChange(rowIndex, cellIndex)}
                                />
                            );
                        })
                    }
                </tr>);
        })}
        </tbody>
    </table>;

    const loadingSpinner = <i className='fa fa-spinner fa-spin'/>;

    return (
        <div className='main-board'>
            {props.loading ? loadingSpinner : boardTable}
        </div>
    );
};

export default Board;