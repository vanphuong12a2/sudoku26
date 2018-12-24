import React, {ChangeEvent} from "react";

export const EMPTY_CELL = 0;

interface Props {
    cellData: number
    readOnly: boolean
    onCellChange: (newValue: number) => void
}

interface State {
    value: number
}

class Cell extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {value: props.cellData};
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value ? Number(event.target.value) : EMPTY_CELL;
        this.setState({value: newValue});
        this.props.onCellChange(newValue);
    };

    render() {
        return (
            <td>
                <input
                    className={this.props.readOnly ? 'readonly' : 'writable'}
                    maxLength={1}
                    readOnly={this.props.readOnly}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </td>
        );
    }
}

export default Cell;