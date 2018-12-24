import React, {ChangeEvent} from "react";

export const EMPTY_CELL = 0;

interface Props {
    cellData: number
    readOnly: boolean
    onCellChange: (newValue: number) => void
}

const Cell = (props: Props) => {

    let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onCellChange(event.target.value ? Number(event.target.value) : EMPTY_CELL);
    };

    return (
        <td>
            <input
                className={props.readOnly ? 'readonly' : 'writable'}
                maxLength={1}
                readOnly={props.readOnly}
                value={props.cellData != EMPTY_CELL ? props.cellData : ''}
                onChange={handleChange}
            />
        </td>
    );
};

export default Cell;