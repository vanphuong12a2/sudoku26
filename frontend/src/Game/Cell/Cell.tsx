import React, {ChangeEvent} from 'react';
import './Cell.css';

export const EMPTY_CELL = 0;

interface Props {
    cellData: number
    finish: boolean
    invalid: boolean
    readOnly: boolean
    onCellChange: (newValue: number) => void
}

const Cell = (props: Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const parsedValue = Number(event.target.value);
        const newValue = isNaN(parsedValue) ? EMPTY_CELL : parsedValue;
        props.onCellChange(newValue);
    };

    const className = (props.readOnly ? 'readonly' : 'writable')
        + (props.invalid ? ' invalid' : '')
        + (props.finish ? ' finish' : '');
    return (
        <td>
            <input
                className={className}
                maxLength={1}
                readOnly={props.readOnly}
                value={props.cellData !== EMPTY_CELL ? props.cellData : ''}
                onChange={handleChange}
            />
        </td>
    );
};

export default Cell;