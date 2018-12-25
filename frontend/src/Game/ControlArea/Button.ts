export default class Button {
    public name: string;
    public onClickHandler: () => void;

    constructor(name: string, onClickHandler: () => void) {
        this.name = name;
        this.onClickHandler = onClickHandler;
    }
}