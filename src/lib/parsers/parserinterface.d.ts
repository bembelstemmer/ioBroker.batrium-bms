export interface ParserInterface {
    initObjects(systemId: number): void | Promise<void>;
    handleMessage(systemId: number, msg: Buffer): void | Promise<void>;
    getMessageName(): string;
}
