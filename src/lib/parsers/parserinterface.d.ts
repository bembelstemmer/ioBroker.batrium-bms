export interface ParserInterface {
    initObjects(): Promise<void>;
    handleMessage(systemId: number, msg: Buffer): Promise<boolean>;
}