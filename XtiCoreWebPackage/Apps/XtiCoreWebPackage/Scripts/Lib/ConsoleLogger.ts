
export class ConsoleLogger {
    static readonly value = new ConsoleLogger();

    private isEnabled = false;

    private constructor() { }

    enable() { this.isEnabled = true; }

    disable() { this.isEnabled = false; }

    log(message: string) {
        if (this.isEnabled) {
            console.log(message);
        }
    }
}