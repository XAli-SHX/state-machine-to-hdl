export class ParseJsonError extends Error {
    constructor(readonly message: string) {
        super();
    }
}