import React from 'react';
import {create} from 'react-test-renderer';
import Game from './Game';
import {sampleBoardData} from '../common/testData';

describe('<Game />', () => {

    describe('Snapshots', () => {

        it('renders game area correctly', () => {
            const board = create(<Game boardData={sampleBoardData}/>);
            expect(board.toJSON()).toMatchSnapshot();
        });
    });

});