import React from 'react';
import {create} from 'react-test-renderer';
import Cell from './Cell';

describe('<Cell />', () => {

    describe('Snapshots', () => {

        it('renders Cell correctly', () => {

            const cell = create(
                <Cell
                    cellData={3}
                    readOnly={true}
                    onCellChange={jest.fn()}
                />);
            expect(cell.toJSON()).toMatchSnapshot();
        });

        it('renders empty Cell correctly', () => {

            const cell = create(
                <Cell
                    cellData={0}
                    readOnly={true}
                    onCellChange={jest.fn()}
                />);
            expect(cell.toJSON()).toMatchSnapshot();
        });
    });

});