declare enum EventType {
    READY = "READY",
    TABLE_LIST_UPDATE = "TABLE_LIST_UPDATE",
    GAME_STATUS_UPDATE = "GAME_STATUS_UPDATE",
    GAME_STATISTIC_UPDATE = "GAME_STATISTIC_UPDATE",
    BALANCE_UPDATE = "BALANCE_UPDATE",
    ERROR = "ERROR"
}
declare class PlayerClient {
    private _service;
    private _serviceProcessEvent;
    private _conn;
    private _tableInfoCallbackMap;
    constructor({ service, playerID, secret, authhost, hostname, port, protocol, path, connectTimeout, reconnectPeriod, }: {
        service?: string;
        playerID?: string;
        secret?: string;
        authhost?: string;
        hostname?: string;
        port?: string;
        protocol?: string;
        path?: string;
        connectTimeout?: number;
        reconnectPeriod?: number;
    });
    connect(): void;
    close(): void;
    subscribe(eventName: string, f: Function, context?: object, options?: any): void;
    unsubscribe(eventName: string, f: Function, options?: any): void;
    getTableList(filter?: string): void;
    getBalance(): void;
    getHistory(tableID: string): void;
    enterTable(tableID: string): void;
    leaveTable(tableID: string): void;
    bet(tableID: string, betArray: BetValueCommand[], callback: Function): void;
    sortCategoryList(data: object): void;
    private _handleGetTableList;
    private _handleTableInfoUpdate;
    private _isTableInfoCallbackEmpty;
    private _processEvent;
    private _onConnect;
}

/**
 * Currency
 */
declare interface CurrencyMap {
    EUR: 0;
    GBP: 1;
    HKD: 2;
    JPY: 3;
    KRW: 4;
    MYR: 5;
    RMB: 6;
    SGD: 7;
    THB: 8;
    TWD: 9;
    USD: 10;
    VND: 11;
}
declare const Currency: CurrencyMap;

/**
 * GameType
 */
interface GameTypeMap {
    BAC: 0;
    BAS: 1;
    BAI: 2;
    DI: 12;
    MJ: 13;
    RO: 14;
}
declare const GameType: GameTypeMap;

/**
 * TableState
 */
declare interface TableStateMap {
CLOSED: 0;
ONLINE: 10;
OFFLINE: 20;
MAINTENANCE: 30;
}
declare const TableState: TableStateMap;
  
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
  
  