import {mount} from 'enzyme';
import React from 'react';
import GameContainer from './GameContainer';

jest.mock('../common/boardFunctions', () => {
    return {
        generateBoard: () => {
            let boardData = new Array(9).fill(0).map(() => new Array(9).fill(1));
            boardData[0][0] = 0;
            return boardData;
        },
        generateEmptyBoard: () => {
            return new Array(9).fill(0).map(() => new Array(9).fill(0));
        }
    };
});

describe('<GameContainer />', () => {

    describe('new game button', () => {

        it('should display a new game', function () {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('input').first().simulate('change', { target: { value: '3' } });
            expect(gameContainer.find('input').first().prop('value')).toEqual(3);

            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'New game').simulate('click');

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

    describe('clear game button', () => {

        it('should display a new game', function () {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('input').first().simulate('change', { target: { value: '1' } });
            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'Clear all').simulate('click');

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

    describe('user fills in the board', () => {

        it('should display the number', function () {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('input').first().simulate('change', { target: { value: '3' } });

            expect(gameContainer.find('input').first().prop('value')).toEqual(3);
        });

        it('should erase the number', function () {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('input').first().simulate('change', { target: { value: '3' } });
            expect(gameContainer.find('input').first().prop('value')).toEqual(3);

            gameContainer.find('input').first().simulate('change', { target: { value: '' } });
            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });

        it('should not display invalid input', function () {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('input').first().simulate('change', { target: { value: 'w' } });

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

});