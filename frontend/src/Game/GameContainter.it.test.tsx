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
            await promise;
            gameContainer.update();

            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'New game').simulate('click');
            await promise;

            expect(generateBoardFn).toBeCalledTimes(2);
        });
    });

    describe('refresh game button', () => {

        it('should display a new game', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

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
            gameContainer.update();

            gameContainer.find('input').first().simulate('change', {target: {value: '1'}});
            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'Clear all').simulate('click');

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });
    });

    describe('show solution button', () => {

        it('should display the solution', async () => {

            const solutionBoard = new Array(9).fill(0).map(() => new Array(9).fill(4));
            const solutionPromise = Promise.resolve(solutionBoard);
            Object.defineProperty(boardFunctions, 'solveBoard', {value: jest.fn((boardData: number[][]) => solutionPromise)});

            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

            gameContainer.find('a').findWhere(wrapper => wrapper.text() === 'Show solution').simulate('click');

            await solutionPromise;
            gameContainer.update();

            expect(gameContainer.find('input').first().prop('value')).toEqual(4);
            expect(gameContainer.find('input').first().prop('readOnly')).toEqual(false);
        });
    });

    describe('user fills in value to the board', () => {

        it('should display the number', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

            gameContainer.find('input').first().simulate('change', {target: {value: '3'}});

            expect(gameContainer.find('input').first().prop('value')).toEqual(3);
        });

        it('should erase the number', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

            gameContainer.find('input').first().simulate('change', {target: {value: '3'}});
            expect(gameContainer.find('input').first().prop('value')).toEqual(3);

            gameContainer.find('input').first().simulate('change', {target: {value: ''}});
            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });

        it('should not display invalid input', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

            gameContainer.find('input').first().simulate('change', {target: {value: 'w'}});

            expect(gameContainer.find('input').first().prop('value')).toEqual('');
        });

        it('should highlight invalid input', async () => {
            const gameContainer = mount(<GameContainer/>);
            await promise;
            gameContainer.update();

            gameContainer.find('input').first().simulate('change', {target: {value: '2'}});

            expect(gameContainer.find('input').first().hasClass('invalid')).toBeTruthy();
        });
    });

});