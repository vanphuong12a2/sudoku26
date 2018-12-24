import React, {ChangeEvent} from "react";

export type CellType = number | undefined;

interface Props {
    cellData: CellType
    readOnly: boolean
    onCellChange: (newValue: CellType) => void
}

interface State {
    value: CellType
}

class Cell extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {value: props.cellData};
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value ? Number(event.target.value) : undefined;
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