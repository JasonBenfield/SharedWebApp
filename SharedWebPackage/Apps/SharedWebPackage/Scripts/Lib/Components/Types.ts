
export interface IMessageAlert {
    get heading(): string;
    get message(): string;
    get hasMessage(): boolean;

    clear();

    success(message: string);
    success(message: string, heading: string);

    info(message: string);
    info(message: string, heading: string);

    infoAction<TResult>(message: string, a: () => Promise<TResult>);
    infoAction<TResult>(message: string, a: () => Promise<TResult>, heading: string): Promise<TResult>;

    warning(message: string);
    warning(message: string, heading: string);

    danger(message: string);
    danger(message: string, heading: string);

    dark(message: string);
    dark(message: string, heading: string);

    light(message: string);
    light(message: string, heading: string);

    primary(message: string);
    primary(message: string, heading: string);

    secondary(message: string);
    secondary(message: string, heading: string);

}