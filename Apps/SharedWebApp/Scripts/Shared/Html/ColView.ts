import { ColViewModel } from './ColViewModel';
import { HtmlComponent } from './HtmlComponent';

export class ColView extends HtmlComponent {
    protected readonly vm: ColViewModel;

    constructor(vm: ColViewModel = new ColViewModel()) {
        super(vm);
        this.vm = vm;
    }
}