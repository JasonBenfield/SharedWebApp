import { HtmlComponent } from "./HtmlComponent";
import { HtmlBlockViewModel } from "./HtmlBlockViewModel";

export class HtmlBlockView extends HtmlComponent {
    readonly vm: HtmlBlockViewModel;

    constructor(vm: HtmlBlockViewModel = new HtmlBlockViewModel()) {
        super(vm);
    }

    setHtml(html: string) {
        this.vm.html(html);
    }

    setTitle(title: string) {
        this.vm.title(title);
    }
}