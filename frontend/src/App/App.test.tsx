import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {create} from 'react-test-renderer';

jest.mock('../common/boardFunctions', () => {
    return {
        generateBoard: () => {
            return [
                [undefined, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, undefined, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, undefined, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            ];
        }
    };
});


describe('<App />', () => {

    describe('Snapshots', () => {
        it('renders correctly', () => {
            const accordion = create(<App/>);
            expect(accordion.toJSON()).toMatchSnapshot();
        });
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
});