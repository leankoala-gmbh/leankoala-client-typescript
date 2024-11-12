declare class BadRequestError extends Error {
    url: string;
    data: any;
    protected identifier: any;
    constructor(errorData: any);
}
export default BadRequestError;
