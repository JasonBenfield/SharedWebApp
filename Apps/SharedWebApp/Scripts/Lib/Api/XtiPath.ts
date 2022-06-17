import { JoinedStrings } from "../JoinedStrings";

export class XtiPath {
    static app(appKey: string, version: string, modifier: string) {
        return new XtiPath(appKey, version, '', '', '', modifier);
    }

    static odata(appKey: string, version: string, modifier: string) {
        return new XtiPath(appKey, version, 'odata', '', '', modifier);
    }

    readonly app: string;
    readonly version: string;
    readonly odata: string;
    readonly group: string;
    readonly action: string;
    readonly modifier: string;

    private readonly value: string;

    constructor(
        app: string,
        version: string,
        odata: string,
        group: string,
        action: string,
        modifier: string
    ) {
        this.app = app ? app : '';
        this.version = version ? version : '';
        this.odata = odata ? odata : '';
        this.group = group ? group : '';
        this.action = action ? action : '';
        this.modifier = modifier ? modifier : '';
        let parts = [this.app, this.version];
        if (this.odata) {
            parts.push(this.odata);
        }
        if (this.group) {
            parts.push(this.group);
            if (this.action) {
                parts.push(this.action);
                if (this.modifier) {
                    parts.push(this.modifier);
                }
            }
        }
        this.value = new JoinedStrings('/', parts).value();
    }

    withGroup(group: string) {
        return new XtiPath(this.app, this.version, this.odata, group, '', this.modifier);
    }

    withAction(action: string) {
        return new XtiPath(this.app, this.version, this.odata, this.group, action, this.modifier);
    }

    withModifier(modifier: string) {
        return new XtiPath(this.app, this.version, this.odata, this.group, this.action, modifier);
    }

    format() {
        return this.value;
    }

    equals(other: XtiPath) {
        if (other) {
            return this.value === other.value;
        }
        return false;
    }

    toString() {
        return this.value;
    }
}