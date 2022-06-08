import { EnumerableRange, MappedArray } from "../Enumerable";
import { ColGroupViewModel } from "./ColGroupViewModel";
import { ColView } from "./ColView";
import { HtmlContainerComponent } from "./HtmlContainerComponent";

export class ColGroupView extends HtmlContainerComponent {
    protected readonly vm: ColGroupViewModel;

    constructor(vm: ColGroupViewModel = new ColGroupViewModel()) {
        super(vm);
    }

    addCol() {
        return this.addCols(1)[0];
    }

    addCols(howMany: number) {
        let cols = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new ColView()
        ).value();
        for (let col of cols) {
            this.addContent(col);
        }
        return cols;
    }
}