import {mount} from 'enzyme';
import BoardContainer from './BoardContainer';
import React from 'react';

describe('<BoardContainer />', () => {

    describe('user fills in the board', () => {

        it('should display the number', function () {
            let boardData = new Array(9).fill(new Array(9).fill(undefined));
            const boardContainer = mount(<BoardContainer boardData={boardData}/>);

            boardContainer.find('input').first().simulate('change', { target: { value: '3' } });

            expect(boardContainer.find('input').first().prop('value')).toEqual(3);
        });

        it('should erase the number', function () {
            let boardData = new Array(9).fill(new Array(9).fill(undefined));
            const boardContainer = mount(<BoardContainer boardData={boardData}/>);

            boardContainer.find('input').first().simulate('change', { target: { value: '' } });

            expect(boardContainer.find('input').first().prop('value')).toEqual(undefined);
        });
    });
});