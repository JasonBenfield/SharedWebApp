import { AsyncCommand } from './AsyncCommand';

export class Command extends AsyncCommand {
    constructor(action: (context?: any) => void) {
        super((c?: any) => {
            return new Promise<any>((resolve, reject) => {
                try {
                    action(c);
                    resolve({});
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
