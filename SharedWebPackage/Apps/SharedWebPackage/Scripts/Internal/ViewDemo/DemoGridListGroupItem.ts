import { BasicComponent } from '../../Lib/Components/BasicComponent';
import { DemoGridListGroupItemView } from './DemoGridListGroupItemView';
import { TextComponent } from '../../Lib/Components/TextComponent';

export class DemoGridListGroupItem extends BasicComponent {
    readonly displayText: string;

    constructor(i: number, view: DemoGridListGroupItemView) {
        super(view);
        const displayText = new TextComponent(view.displayText);
        this.displayText = `Item ${i}`;
        displayText.setText(this.displayText);
        if (i % 3 === 0) {
            view.highlight();
        }
    }
}