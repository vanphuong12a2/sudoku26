import React from 'react';
import {create} from 'react-test-renderer';
import Game from './Game';
import {sampleBoardData} from '../common/testData';
import {shallow} from 'enzyme';
import Board from './Board/Board';
import ControlArea from './ControlArea/ControlArea';

describe('<Game />', () => {

    describe('Snapshots', () => {

        it('renders game area correctly when not loading', () => {
            const board = create(<Game
                loading={false}
                boardData={sampleBoardData()}
                currentBoard={sampleBoardData()}
                onCellChange={jest.fn()}
                newGameOnClickHandler={jest.fn()}
                refreshGameOnClickHandler={jest.fn()}
                clearBoardOnClickHandler={jest.fn()}
                solveGameOnClickHandler={jest.fn()}
            />);
            expect(board.toJSON()).toMatchSnapshot();
        });
    });

    it('should send correct props to control area', () => {

        const boardData = sampleBoardData();
        const onCellChange = jest.fn();
        const newGameOnClickHandler = jest.fn();
        const refreshGameOnClickHandler = jest.fn();
        const clearBoardOnClickHandler = jest.fn();
        const solveGameOnClickHandler = jest.fn();

        const component = shallow(<Game
            loading={false}
            boardData={boardData}
            currentBoard={boardData}
            onCellChange={onCellChange}
            newGameOnClickHandler={newGameOnClickHandler}
            refreshGameOnClickHandler={refreshGameOnClickHandler}
            clearBoardOnClickHandler={clearBoardOnClickHandler}
            solveGameOnClickHandler={solveGameOnClickHandler}
        />);

        expect(component.find(Board).prop('loading')).toEqual(false);
        expect(component.find(Board).prop('boardData')).toEqual(boardData);
        expect(component.find(Board).prop('currentBoard')).toEqual(boardData);
        expect(component.find(Board).prop('onCellChange')).toEqual(onCellChange);
        expect(component.find(ControlArea).prop('newGameOnClickHandler')).toEqual(newGameOnClickHandler);
        expect(component.find(ControlArea).prop('refreshGameOnClickHandler')).toEqual(refreshGameOnClickHandler);
        expect(component.find(ControlArea).prop('clearBoardOnClickHandler')).toEqual(clearBoardOnClickHandler);
        expect(component.find(ControlArea).prop('solveGameOnClickHandler')).toEqual(solveGameOnClickHandler);
    });
});