import React from 'react';
import {shallow} from 'enzyme';
import BoardContainer from './BoardContainer';
import Board from './Board';

describe('<BoardContainer />', () => {

    it('should set the initial state to board data', () => {
        let boardData = new Array(9).fill(new Array(9).fill(undefined));
        const wrapper = shallow(<BoardContainer boardData={boardData}/>);

        expect(wrapper.find(Board).length).toBe(1);
        expect(wrapper.find(Board).prop('currentBoard')).toEqual(boardData);
    });
});