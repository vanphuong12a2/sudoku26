import {shallow} from 'enzyme';
import React from 'react';
import GameContainer from './GameContainer';
import Game from './Game';

jest.mock('../common/boardFunctions', () => {
    return {
        generateBoard: () => {
            return new Array(9).fill(new Array(9).fill(undefined));
        }
    };
});


describe('<BoardContainer />', () => {

    it('should set the initial state to board data', () => {
        let boardData = new Array(9).fill(new Array(9).fill(undefined));
        const wrapper = shallow(<GameContainer/>);

        expect(wrapper.find(Game).length).toBe(1);
        expect(wrapper.find(Game).prop('boardData')).toEqual(boardData);
    });
});