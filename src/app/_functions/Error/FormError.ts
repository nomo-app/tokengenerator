export class FormError extends Error {
    constructor(message: string, public ref: HTMLInputElement) {
        super(message);
        this.name = 'FormError';
    }
}