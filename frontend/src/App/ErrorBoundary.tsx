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
            return <div>Something went wrong. Please refresh the page :)</div>;
        }
        return this.props.children
    }
}

export default ErrorBoundary;