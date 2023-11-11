import { AppClientError } from "./AppClientError";

export class AppClientEvents {
    constructor(readonly handleError: (error: AppClientError) => void) {
    }
}