import { ButtonViewModel } from "./ButtonViewModel";
import { ContextualClass } from "../ContextualClass";
import { HtmlContainerComponent } from "./HtmlContainerComponent";

export class Button extends HtmlContainerComponent {
    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        vm.type('button');
        this.addCssName('btn');
    }

    protected readonly vm: ButtonViewModel;

    readonly clicked = this.vm.clicked;

    changeTypeToSubmit() {
        this.vm.type('submit');
    }

    enable() { this.vm.isEnabled(true); }

    disable() { this.vm.isEnabled(false); }

    private context: ContextualClass;

    setContext(context: ContextualClass) {
        let contextCss = this.getContextCss(context, this.isOutline);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.context = context;
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    private isOutline = false;

    useOutlineStyle() {
        let contextCss = this.getContextCss(this.context, true);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.isOutline = true;
    }
}