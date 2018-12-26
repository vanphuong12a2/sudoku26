import {EMPTY_CELL} from '../Game/Cell/Cell';

const solveUrl = '/api/board/solved';
const generateUrl = '/api/board/random';

function convertTo2DArray(board: number[]) {
    const newArr = [];
    while (board.length) {
        newArr.push(board.splice(0, 9));
    }
    return newArr;
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
    return new Array(9).fill(0).map(() => new Array(9).fill(EMPTY_CELL));
};

export {solveBoard, generateBoard, generateEmptyBoard};