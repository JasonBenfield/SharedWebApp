import { ComponentTemplate } from './ComponentTemplate';
import * as template from './Templates/FaIcon.html';
import { ContextualClass } from './ContextualClass';
import { HtmlComponent } from './Html/HtmlComponent';
import { HtmlComponentViewModel } from './Html/HtmlComponentViewModel';

export class FaIconViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('fa-icon', template));
    }
}

export class FaIconNames {
    static readonly login = 'sign-in-alt';
    static readonly save = 'check';
    static readonly cancel = 'times';
}

export type FaIconAnimation = 'spin' | 'pulse';

export class FaIcon extends HtmlComponent {
    constructor(
        name: string = '',
        vm: FaIconViewModel = new FaIconViewModel()
    ) {
        super(vm);
        this.solidStyle();
        this.setName(name);
    }

    private name: string;

    protected readonly vm: FaIconViewModel;
    private color = '';

    setColor(color: ContextualClass = ContextualClass.default) {
        let colorCss = color === ContextualClass.default ? '' : color.append('text');
        this.replaceCssName(this.color, colorCss);
        this.color = colorCss;
    }

    private prefix: string;

    regularStyle() {
        this.setPrefix('far');
    }

    solidStyle() {
        this.setPrefix('fas');
    }

    private setPrefix(prefix: string) {
        this.replaceCssName(this.prefix, prefix);
        this.prefix = prefix;
    }

    setName(name: string) {
        name = this.normalizeName(name);
        this.replaceCssName(this.name, name);
        this.name = name;
    }

    private normalizeName(name: string) {
        if (name && name.indexOf('fa-') !== 0) {
            name = `fa-${name}`;
        }
        return name;
    }

    makeFixedWidth() {
        this.addCssName('fa-fw');
    }

    private size = '';

    resize(size: '' | 'xs' | 'sm' | 'lg' | '1X' | '2X' | '3X' | '4X' | '5X' | '6X' | '7X' | '8X' | '9X' | '10X') {
        let sizeCss = size ? `fa-${size}` : size;
        this.replaceCssName(this.size, sizeCss);
        this.size = sizeCss;
    }

    makeBordered() {
        this.addCssName('fa-bordered');
    }

    private rotation = '';

    rotate(howMuch: 0 | 90 | 180 | 270) {
        let rotationCss = howMuch ? `fa-rotate-${howMuch}` : '';
        this.replaceCssName(this.rotation, rotationCss);
    }

    private pulled = '';

    pullLeft() {
        this.pull('fa-pull-left');
    }

    pullRight() {
        this.pull('fa-pull-right');
    }

    private pull(pulled: string) {
        this.replaceCssName(this.pulled, pulled);
        this.pulled = pulled;
    }

    private animation = '';

    startAnimation(animation: FaIconAnimation) {
        let css = animation ? `fa-${animation}` : animation;
        this.replaceCssName(this.animation, css);
        this.animation = css;
    }

    stopAnimation() {
        this.removeCssName(this.animation);
        this.animation = '';
    }
}