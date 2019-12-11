declare class PlayerClient {
    private _service;
    private _serviceProcessEvent;
    private _conn;
    private _tableInfoCallbackMap;
    private _tableListFilter;
    private _endpoint;
    constructor({ service, playerID, secret, endpoint, hostname, port, protocol, path, connectTimeout, reconnectPeriod, rabbitmqhostname, rabbitmqport, rabbitmqprotocol, }: {
        service?: string;
        playerID?: string;
        secret?: string;
        endpoint?: string;
        hostname?: string;
        port?: string;
        protocol?: string;
        path?: string;
        connectTimeout?: number;
        reconnectPeriod?: number;
        rabbitmqhostname?: any;
        rabbitmqport?: any;
        rabbitmqprotocol?: any;
    });
    init(lang: string, callback: Function): void;
    connect(callback: Function): void;
    close(): void;
    subscribe(eventName: string, f: Function, context?: object, options?: any): void;
    unsubscribe(eventName: string, f: Function, options?: any): void;
    getTableList(filter?: string): void;
    getBalance(): void;
    getHistory(tableID: string): void;
    enterTable(tableID: string): void;
    leaveTable(tableID: string): void;
    bet(tableID: string, betArray: BetValueCommand[], callback: Function): void;
    updateSetting(key: string, value: string): void;
    updateSettings(settings: {
        [key: string]: string;
    }): void;
    getLobbyMaterial(callback: (data: LobbyMaterial) => any): void;
    getRoadmap(callback: Function): void;
    createCustomRoadmap(name: string, pattern: string, callback: Function): void;
    upadteCustomRoadmap(id: string, name: string, pattern: string): void;
    removeCustomRoadmap(id: string, callback: Function): void;
    private _handleGetTableList;
    private _handleTableInfoUpdate;
    private _isTableInfoCallbackEmpty;
    private _processEvent;
    private _onConnect;
}
declare enum BAGameStateType {
    IDLE = 0,
    BET = 1,
    DEAL = 2,
    FINISH = 3,
    REFUND = 4,
    SHUFFLE = 5
}
declare enum BAWinType {
    NONE = 0,
    BANKER = 1,
    PLAYER = 2,
    TIE = 3
}
interface BetValueCommand {
    field: string;
    amount: number;
}
interface LobbyMaterial {
    logourl: string;
    homeherobanners: {
        [key: string]: string;
    }[];
    homelargebanners: {
        [key: string]: string;
    }[];
    homebanners: {
        [key: string]: string;
    }[];
    liveherobanners: {
        [key: string]: string;
    }[];
    lotteryherobanners: {
        [key: string]: string;
    }[];
    egameherobanners: {
        [key: string]: string;
    }[];
    favouriteherobanners: {
        [key: string]: string;
    }[];
    messages: string[];
}
