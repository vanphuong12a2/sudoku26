import fetchMock from 'fetch-mock';
import {generateBoard} from './boardFunctions';

describe('board functions', () => {

    const generateUrl = '/api/board/random';

    beforeEach(() => {
        fetchMock.restore();
    });

    it('shoud fetch random board from the backend', async () => {
        fetchMock.mock(generateUrl, '[0,8,0,0,5,1,0,0,0,0,0,0,6,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,8,0,5,5,0,7,4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,4,0,6,0,0,0,0,7,0,0,0,0,0,3,5,0,0,0,2,0,0,0,0,0,0,0,0]');

        const expectedBoard = [
            [0, 8, 0, 0, 5, 1, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 8, 0, 5],
            [5, 0, 7, 4, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0],
            [4, 0, 6, 0, 0, 0, 0, 7, 0],
            [0, 0, 0, 0, 3, 5, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0]];

        await generateBoard().then(board =>
            expect(board).toEqual(expectedBoard)
        );

    });
});