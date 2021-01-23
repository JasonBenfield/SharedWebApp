import { Result } from "./Result";

export class Awaitable {
    private _resolve: (value: Result) => void = null;

    isInProgress() {
        return this._resolve !== null;
    }

    start() {
        return new Promise<Result>((resolve) => {
            this._resolve = resolve;
        });
    }

    resolve(result: Result) {
        let resolve = this._resolve;
        this._resolve = null;
        if (resolve) {
            resolve(result);
        }
    }
}