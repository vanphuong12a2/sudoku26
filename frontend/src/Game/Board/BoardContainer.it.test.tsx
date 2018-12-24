import {mount} from 'enzyme';
import BoardContainer from './BoardContainer';
import React from 'react';
import {sampleBoardData} from '../../common/testData';

describe('<BoardContainer />', () => {

    describe('user fills in the board', () => {

        it('should display the number', function () {
            let boardData = sampleBoardData();
            const boardContainer = mount(<BoardContainer boardData={boardData}/>);

            boardContainer.find('input').first().simulate('change', { target: { value: '3' } });

            expect(boardContainer.find('input').first().prop('value')).toEqual(3);
        });

        it('should erase the number', function () {
            let boardData = sampleBoardData();
            boardData[0][0] = 3;
            const boardContainer = mount(<BoardContainer boardData={boardData}/>);

            boardContainer.find('input').first().simulate('change', { target: { value: '' } });

            expect(boardContainer.find('input').first().prop('value')).toEqual('');
        });

        it('should not display invalid input', function () {
            let boardData = sampleBoardData();
            const boardContainer = mount(<BoardContainer boardData={boardData}/>);

            boardContainer.find('input').first().simulate('change', { target: { value: 'w' } });

            expect(boardContainer.find('input').first().prop('value')).toEqual('');
        });
    });
});