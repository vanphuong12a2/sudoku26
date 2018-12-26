import React from 'react';
import './ControlArea.css'
import Button from './Button';

const ControlFieldSet = (props: { legend: string, buttons: Button[] }) => {
    return (
        <fieldset>
            <legend>{props.legend}</legend>
            {
                props.buttons.map((button, buttonIndex) => {
                    return <ButtonComponent key={buttonIndex} button={button}/>
                })
            }
        </fieldset>
    );
};

const ButtonComponent = (props: { button: Button }) => {
    return (
        <a className='waves-effect waves-light btn-small' onClick={props.button.onClickHandler}>
            {props.button.name}
        </a>
    );
};

interface Props {
    newGameOnClickHandler: () => void
    clearBoardOnClickHandler: () => void
    refreshGameOnClickHandler: () => void
    solveGameOnClickHandler: () => void
}

const ControlArea = (props: Props) => {
    const gameButtons = [
        new Button('Refresh', props.refreshGameOnClickHandler),
        new Button('New game', props.newGameOnClickHandler)
    ];

    const solverButtons = [
        new Button('Clear all', props.clearBoardOnClickHandler),
        new Button('Show solution', props.solveGameOnClickHandler)
    ];
    return (
        <div className='control-area'>
            <ControlFieldSet legend='Game' buttons={gameButtons}/>
            <ControlFieldSet legend='Solver' buttons={solverButtons}/>
        </div>
    )
};

export default ControlArea;