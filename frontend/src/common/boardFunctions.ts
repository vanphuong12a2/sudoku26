import {sampleBoardData} from './testData';
import {EMPTY_CELL} from '../Game/Cell/Cell';

const generateBoard = () => {
    return sampleBoardData();
};

const generateEmptyBoard = () => {
    return new Array(9).fill(0).map(() => new Array(9).fill(EMPTY_CELL));
};

export {generateBoard, generateEmptyBoard}