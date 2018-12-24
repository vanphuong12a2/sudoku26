import {create} from 'react-test-renderer';
import React from 'react';
import ControlArea from './ControlArea';

describe('<ControlArea />', () => {

    describe('Snapshots', () => {
        it('renders correctly', () => {
            const button = create(
                <ControlArea
                    newGameOnClickHandler={jest.fn()}
                    clearBoardOnClickHandler={jest.fn()}
                />);
            expect(button.toJSON()).toMatchSnapshot();
        });
    });
});