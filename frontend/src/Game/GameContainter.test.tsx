import {shallow} from 'enzyme';
import React from 'react';
import GameContainer from './GameContainer';
import Game from './Game';

jest.mock('../common/boardFunctions', () => {
    return {
        generateBoard: () => {
            return new Array(9).fill(0).map(() => new Array(9).fill(1));
        }
    };
});

describe('<BoardContainer />', () => {

    it('should sent correct props to Game', () => {
        let boardData = new Array(9).fill(0).map(() => new Array(9).fill(1));
        const component = shallow(<GameContainer/>);
        const instance = component.instance() as GameContainer;

        expect(component.find(Game).length).toBe(1);
        expect(component.find(Game).prop('boardData')).toEqual(boardData);
        expect(component.find(Game).prop('newGameOnClickHandler')).toEqual(instance.newGameOnClickHandler);
        expect(component.find(Game).prop('clearBoardOnClickHandler')).toEqual(instance.clearBoardOnClickHandler);
    });
});