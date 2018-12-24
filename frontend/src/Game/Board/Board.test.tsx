import React from 'react';
import {create} from 'react-test-renderer';
import Board from './Board';
import {sampleBoardData} from '../../common/testData';

describe('<Board />', () => {

    describe('Snapshots', () => {

        it('renders boardData correctly', () => {
            let currentBoard = [
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9],
                [1,2,3,4,5,6,7,8,9]
            ];
            const board = create(<Board boardData={sampleBoardData} currentBoard={currentBoard}/>);
            expect(board.toJSON()).toMatchSnapshot();
        });
    });

});