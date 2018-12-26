import * as React from 'react';

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({hasError: true});
    }

    public render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div className='error'>
                    <div className='error-message'>
                        Something went wrong. Please refresh the page
                        <i className='material-icons'>refresh</i>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;