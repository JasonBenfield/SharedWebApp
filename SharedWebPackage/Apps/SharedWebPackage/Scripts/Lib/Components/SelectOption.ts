export class SelectOption<T> {
    constructor(public readonly value: T | null, public readonly displayText: string) {
    }
}