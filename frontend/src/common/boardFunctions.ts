import {EMPTY_CELL} from '../Game/Cell/Cell';

const generateUrl = '/api/board/random';

function convertTo2DArray(board: number[]) {
    const newArr = [];
    while (board.length) {
        newArr.push(board.splice(0, 9));
    }
    return newArr;
}

const generateBoard = async () => {
    return fetch(generateUrl)
        .then(response => response.json())
        .then(convertTo2DArray);
};

const generateEmptyBoard = () => {
    return new Array(9).fill(0).map(() => new Array(9).fill(EMPTY_CELL));
};

export {generateBoard, generateEmptyBoard};