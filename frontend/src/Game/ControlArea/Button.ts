export default class Button {

    constructor(name: string, onClickHandler: () => void) {
        this.name = name;
        this.onClickHandler = onClickHandler;
    }

    public name: string;
    public onClickHandler: () => void;
}