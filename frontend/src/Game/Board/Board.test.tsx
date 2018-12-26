import React from 'react';
import {create} from 'react-test-renderer';
import Board from './Board';
import {sampleBoardData} from '../../common/testData';

describe('<Board />', () => {

    describe('Snapshots', () => {

        it('renders boardData correctly', () => {
            const board = create(
                <Board
                    loading={false}
                    boardData={sampleBoardData()}
                    currentBoard={sampleBoardData()}
                    onCellChange={jest.fn()}
                />);
            expect(board.toJSON()).toMatchSnapshot();
        });

        it('renders boardData correctly when loading', () => {
            const board = create(
                <Board
                    loading={true}
                    boardData={sampleBoardData()}
                    currentBoard={sampleBoardData()}
                    onCellChange={jest.fn()}
                />);
            expect(board.toJSON()).toMatchSnapshot();
        });
    });

});