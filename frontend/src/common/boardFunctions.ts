import {sampleBoardData} from './testData';

const generateBoard = () => {
    return sampleBoardData();
};

const generateEmptyBoard = () => {
    return new Array(9).fill(new Array(9).fill(undefined));
};

export {generateBoard, generateEmptyBoard}