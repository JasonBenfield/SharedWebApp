import { CardTitleHeaderView } from './CardTitleHeaderView';

export class CardTitleHeader {
    constructor(title: string = '', private readonly view: CardTitleHeaderView) {
        this.view.setText(title);
    }

    setText(text: string) {
        this.view.setText(text);
    }
}