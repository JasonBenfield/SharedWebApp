import { ContextualClass } from '../ContextualClass';
import { BasicComponentView } from './BasicComponentView';
import { IconView } from './IconView';

export type FaIconAnimation = 'spin' | 'pulse';

export class FaIconView extends IconView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    setColor(color: ContextualClass = ContextualClass.default) {
        this.setCss('text-color', color.append('text'));
    }

    regularStyle(name: string) {
        this.setPrefix('fa-regular');
        if (name) {
            this.setViewName(name);
        }
    }

    solidStyle(name: string) {
        this.setPrefix('fa-solid');
        this.setIconName(name);
    }

    private setPrefix(prefix: string) {
        this.setCss('prefix', prefix);
    }

    private setIconName(name: string) {
        name = this.normalizeName(name);
        this.setCss('icon-name', name);
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

    resize(size: '' | 'xs' | 'sm' | 'lg' | '1X' | '2X' | '3X' | '4X' | '5X' | '6X' | '7X' | '8X' | '9X' | '10X') {
        const sizeCss = size ? `fa-${size}` : size;
        this.setCss('icon-size', sizeCss);
    }

    makeBordered() {
        this.addCssName('fa-bordered');
    }

    rotate(howMuch: 0 | 90 | 180 | 270) {
        let rotationCss = howMuch ? `fa-rotate-${howMuch}` : '';
        this.setCss('icon-rotation', rotationCss);
    }

    pullLeft() {
        this.pull('fa-pull-left');
    }

    pullRight() {
        this.pull('fa-pull-right');
    }

    private pull(pulled: string) {
        this.setCss('icon-pulled', pulled);
    }

    startAnimation(animation: FaIconAnimation) {
        let css = animation ? `fa-${animation}` : animation;
        this.setCss('icon-animation', css);
    }

    stopAnimation() {
        this.setCss('icon-animation', '');
    }
}