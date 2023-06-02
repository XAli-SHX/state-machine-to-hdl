export class ReadJsonError extends Error {
    constructor(readonly message: string) {
        super();
    }
}