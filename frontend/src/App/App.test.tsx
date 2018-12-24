import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {create} from 'react-test-renderer';


describe('<App />', () => {

    describe('Snapshots', () => {
        it('renders correctly', () => {
            const app = create(<App/>);
            expect(app.toJSON()).toMatchSnapshot();
        });
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
});