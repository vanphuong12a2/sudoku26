import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import {mount, shallow} from 'enzyme';

const withoutErrorLogging = (callback: any) => {
    const currentErrorFn = console.error;
    console.error = () => {;};
    callback();
    console.error = currentErrorFn;
};

describe('<ErrorBoundary />', () => {

    it('renders error correctly', () => {
        const wrapper = shallow(<ErrorBoundary>
            <div/>
        </ErrorBoundary>);
        wrapper.instance().setState({hasError: true});
        wrapper.update();

        expect(wrapper.find('div').text()).toBe('Something went wrong. Please refresh the page :)');
    });


    it('should catch error', () => {
        withoutErrorLogging(() => {
            const ErrorComponent = () => {
                throw new Error('Error Occurred');
            };

            const wrapper = mount(<ErrorBoundary> <ErrorComponent/> </ErrorBoundary>);

            expect(wrapper.instance().state).toEqual({hasError: true});
        });
    });
});