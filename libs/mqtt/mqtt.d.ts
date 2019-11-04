declare class TestClient {
    private _service;
    private _conn;
    constructor({ service, id, secret, authhost, hostname, port, protocol, path, }: {
        service?: string;
        id?: string;
        secret?: string;
        authhost?: string;
        hostname?: string;
        port?: string;
        protocol?: string;
        path?: string;
    });
    connect(): void;
    close(): void;
    subscribe(eventName: string, f: Function): void;
    unsubscribe(eventName: string, f: Function): void;
}