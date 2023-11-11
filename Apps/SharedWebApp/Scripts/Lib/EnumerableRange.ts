
export class EnumerableRange {
    private readonly source: number[] = [];

    constructor(start: number, count: number) {
        for (let i = start; i < start + count; i++) {
            this.source.push(i);
        }
    }

    value() { return this.source; }
}