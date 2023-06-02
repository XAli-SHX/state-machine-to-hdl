export interface ReadJsonError extends NodeJS.ErrnoException {
    message: string;
}