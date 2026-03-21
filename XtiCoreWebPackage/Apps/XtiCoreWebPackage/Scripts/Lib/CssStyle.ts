
export interface ICssStyles {
    [name: string]: string;
}

export interface ICssStyle {
    toStyle(): ICssStyles;
}
