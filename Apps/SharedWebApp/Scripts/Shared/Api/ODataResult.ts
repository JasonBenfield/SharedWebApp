
export class ODataResult<TEntity> {
    constructor(readonly records: TEntity[], readonly count: number) { }
}