import {shallow} from 'enzyme';
import React from 'react';
import GameContainer from './GameContainer';
import Game from './Game';
import * as boardFunctions from '../common/boardFunctions';
import {emptyBoardData, sampleBoardData} from '../common/testData';

describe('<GameContainer />', () => {

    let promise: Promise<number[][]>;
    let boardData: number[][];

    beforeEach(() => {
        boardData = sampleBoardData();
        promise = Promise.resolve(boardData);
        Object.defineProperty(boardFunctions, 'generateBoard', {value: jest.fn(() => promise)});
        Object.defineProperty(boardFunctions, 'generateEmptyBoard', {value: jest.fn(() => emptyBoardData())});
    });

    it('should create new board on mount', async () => {
        const component = shallow(<GameContainer/>);
        await promise;

        expect(component.state('boardData')).toEqual(boardData);
        expect(component.state('currentBoard')).toEqual(boardData);
    });

    it('should sent correct props to Game', async () => {
        const component = shallow(<GameContainer/>);
        await promise;

        const instance = component.instance() as GameContainer;
        expect(component.find(Game).length).toBe(1);
        expect(component.find(Game).prop('boardData')).toEqual(boardData);
        expect(component.find(Game).prop('currentBoard')).toEqual(boardData);
        expect(component.find(Game).prop('onCellChange')).toEqual(instance.onCellChange);
        expect(component.find(Game).prop('newGameOnClickHandler')).toEqual(instance.newGameOnClickHandler);
        expect(component.find(Game).prop('refreshGameOnClickHandler')).toEqual(instance.refreshGameOnClickHandler);
        expect(component.find(Game).prop('clearBoardOnClickHandler')).toEqual(instance.clearBoardOnClickHandler);
        expect(component.find(Game).prop('solveGameOnClickHandler')).toEqual(instance.solveGameOnClickHandler);
    });
});