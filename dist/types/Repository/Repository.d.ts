export default class Repository {
    protected connectionType: string;
    protected connection: any;
    constructor();
    protected _assertValidArguments(requiredArguments: any[], actualArguments: any): void;
    setConnection(connection: any): void;
    getConnectionType(): string;
}
