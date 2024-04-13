
export class DelayedAction<TResult> {
    public static delay(wait: number) {
        return new DelayedAction(() => { }, wait).execute();
    }

    constructor(
        private readonly func: (...args) => TResult,
        private readonly wait: number
    ) {
    }

    execute(...args: any[]) {
        let result: TResult;
        return new Promise<TResult>(
            (resolve) => {
                setTimeout(() => {
                    result = this.func.call(this.func, ...args);
                    resolve(result);
                }, this.wait);
            }
        );
    }
}