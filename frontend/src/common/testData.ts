import {EMPTY_CELL} from '../Game/Cell/Cell';

export function sampleBoardData(): number[][] {
    return [
        [0, 8, 0, 0, 5, 1, 0, 0, 0],
        [0, 0, 0, 6, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 0, 0, 0, 8, 0, 5],
        [5, 0, 7, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [4, 0, 6, 0, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 3, 5, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 0]];
}

export function emptyBoardData(): number[][] {
    return new Array(9).fill(0).map(() => new Array(9).fill(EMPTY_CELL));
}

export function finishBoard(): number[][] {
    return [
        [7, 8, 2, 3, 5, 1, 9, 6, 4],
        [1, 4, 5, 6, 9, 7, 3, 2, 8],
        [3, 6, 9, 8, 2, 4, 7, 5, 1],
        [6, 3, 1, 9, 7, 2, 8, 4, 5],
        [5, 9, 7, 4, 1, 8, 6, 3, 2],
        [8, 2, 4, 5, 6, 3, 1, 9, 7],
        [4, 5, 6, 1, 8, 9, 2, 7, 3],
        [9, 7, 8, 2, 3, 5, 4, 1, 6],
        [2, 1, 3, 7, 4, 6, 5, 8, 9]]
        ;
}

