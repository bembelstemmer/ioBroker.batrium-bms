export interface ParserInterface {
    initObjects(systemId: number): Promise<void>;
    handleMessage(systemId: number, msg: Buffer): Promise<void>;
    getMessageName(): string;
}