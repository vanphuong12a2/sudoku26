import {EMPTY_CELL} from '../Game/Cell/Cell';

export const BOARD_SIZE = 9;
export const INVALID_CELL = -1;
const solveUrl = '/api/board/solved';
const generateUrl = '/api/board/random';

function convertTo2DArray(board: number[]) {
    const newArr = [];
    while (board.length) {
        newArr.push(board.splice(0, BOARD_SIZE));
    }
    return newArr;
}

function convertto1DArray(stringWithCommaSeparator: string) {
    return JSON.parse('[' + stringWithCommaSeparator + ']');
}

const solveBoard = async (boardData: number[][]) => {
    return fetch(`${solveUrl}?inputBoard=${boardData.join()}`)
        .then(response => response.json())
        .then(convertTo2DArray);
};

const generateBoard = async () => {
    return fetch(generateUrl)
        .then(response => response.json())
        .then(convertTo2DArray);
};

const generateEmptyBoard = () => {
    return new Array(BOARD_SIZE).fill(0).map(() => new Array(BOARD_SIZE).fill(EMPTY_CELL));
};

const getDuplicates = (cellValues: number[]) => {
    const counts: number[][] = new Array(BOARD_SIZE).fill(0).map(() => []);
    cellValues.forEach((cellValue, index) => {
        if (cellValue !== EMPTY_CELL) {
            counts[cellValue - 1].push(index);
        }
    });
    return convertto1DArray(counts.filter(indexes => indexes.length > 1).join());
};

const getIllegalCellsMap = (boardData: number[][]) => {
    const illegalMap: number[][] = generateEmptyBoard();
    const rowBoard: number[][] = new Array(BOARD_SIZE).fill(0).map(() => []);
    const columnBoard: number[][] = new Array(BOARD_SIZE).fill(0).map(() => []);
    const boxBoard: number[][] = new Array(BOARD_SIZE).fill(0).map(() => []);

    boardData.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            rowBoard[rowIndex].push(cell);
            columnBoard[columnIndex].push(cell);
            boxBoard[Math.floor(rowIndex / 3) * 3 + Math.floor(columnIndex/3)].push(cell);
        })
    });

    rowBoard.forEach((row, rowIndex) => {
        getDuplicates(row).forEach((columnIndex: number) => {
            illegalMap[rowIndex][columnIndex] = INVALID_CELL;
        });
    });

    columnBoard.forEach((column, columnIndex) => {
        getDuplicates(column).forEach((rowIndex: number) => {
            illegalMap[rowIndex][columnIndex] = INVALID_CELL;
        });
    });

    boxBoard.forEach((box, boxIndex) => {
        getDuplicates(box).forEach((boxSubIndex: number) => {
            const rowIndex = Math.floor(boxIndex / 3) * 3 + Math.floor(boxSubIndex / 3);
            const columnIndex = (boxIndex % 3) * 3 + (boxSubIndex % 3);
            illegalMap[rowIndex][columnIndex] = INVALID_CELL;
        });
    });

    return illegalMap;
};

export {solveBoard, generateBoard, generateEmptyBoard, getIllegalCellsMap};