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
        <a className="waves-effect waves-light btn-small" onClick={props.button.onClickHandler}>
            {props.button.name}
        </a>
    );
};

interface Props {
    newGameOnClickHandler: () => void
    clearBoardOnClickHandler: () => void
}

const ControlArea = (props: Props) => {
    let dummyHandler = () => {;};
    const gameButtons = [
        new Button('New game', props.newGameOnClickHandler),
        new Button('Show a hint', dummyHandler)
    ];

    const solverButtons = [
        new Button('Clear', props.clearBoardOnClickHandler),
        new Button('Validate', dummyHandler),
        new Button('Show solution', dummyHandler)
    ];
    return (
        <div className='control-area'>
            <ControlFieldSet legend='Game' buttons={gameButtons}/>
            <ControlFieldSet legend='Solver' buttons={solverButtons}/>
        </div>
    )
};

export default ControlArea;