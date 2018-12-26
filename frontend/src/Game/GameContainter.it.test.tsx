import {mount} from 'enzyme';
import React from 'react';
import GameContainer from './GameContainer';
import {emptyBoardData, sampleBoardData} from '../common/testData';
import * as boardFunctions from '../common/boardFunctions';

describe('<GameContainer />', () => {

    let promise: Promise<number[][]>;
    let generateBoardFn: () => Promise<number[][]>;

    beforeEach(() => {
        const boardData = sampleBoardData();
        promise = Promise.resolve(boardData);
        generateBoardFn = jest.fn(() => promise);
        Object.defineProperty(boardFunctions, 'generateBoard', {value: generateBoardFn});
        Object.defineProperty(boardFunctions, 'generateEmptyBoard', {value: jest.fn(() => emptyBoardData())});
    });

    describe('new game button', () => {

        it('should display a new game', async () => {
            const gameContainer = mount(<GameContainer/>);

            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'New game').simulate('click');
            await promise;

            expect(generateBoardFn).toBeCalledTimes(2);
        });
    });

    describe('refresh game button', () => {

        it('should display a new game', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;

            gameContainer.find('input').first().simulate('change', {target: {value: '3'}});
            expect(gameContainer.find('input').first().prop('value')).toEqual(3);

            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'Refresh').simulate('click');
            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

    describe('clear game button', () => {

        it('should display a new game', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;

            gameContainer.find('input').first().simulate('change', {target: {value: '1'}});
            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'Clear all').simulate('click');

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

    describe('user fills in value to the board', () => {

        it('should display the number', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;

            gameContainer.find('input').first().simulate('change', {target: {value: '3'}});

            expect(gameContainer.find('input').first().prop('value')).toEqual(3);
        });

        it('should erase the number', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;

            gameContainer.find('input').first().simulate('change', {target: {value: '3'}});
            expect(gameContainer.find('input').first().prop('value')).toEqual(3);

            gameContainer.find('input').first().simulate('change', {target: {value: ''}});
            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });

        it('should not display invalid input', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;

            gameContainer.find('input').first().simulate('change', {target: {value: 'w'}});

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

});