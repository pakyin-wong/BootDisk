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
    private _tableListFilter;
    private _endpoint;
    private _pingTimer;
    private _pingTimeout;
        rabbitmqvirtualhost?: string;
        constructor({ service, playerID, secret, endpoint, hostname, port, protocol, path, device, connectTimeout, pingTimeout, reconnectPeriod, rabbitmqhostname, rabbitmqport, rabbitmqprotocol, rabbitmqvirtualhost, logEnabled, }: {
        service?: string;
        playerID?: string;
        secret?: string;
        endpoint?: string;
        hostname?: string;
        port?: string;
        protocol?: string;
        path?: string;
        device?: string;
        connectTimeout?: number;
        pingTimeout?: number;
        reconnectPeriod?: number;
        rabbitmqhostname?: string;
        rabbitmqport?: string;
        rabbitmqprotocol?: string;
        rabbitmqvirtualhost?: string;
        logEnabled?: boolean;
    });
    init(lang: string, callback: Function): void;
    connect(callback?: Function): void;
    ping(callback?: Function): void;
    close(): void;
    subscribe(eventName: string, f: Function, context?: object, options?: any): void;
    unsubscribe(eventName: string, f: Function, options?: any): void;
    getTableList(filter?: string): void;
    getBalance(): void;
    getBetHistory(filter: object, callback?: (data: object) => void): void;
    enterTable(tableID: string): void;
    leaveTable(tableID: string): void;
    bet(tableID: string, betArray: BetValueCommand[], callback: Function): void;
    updateSetting(key: string, value: string): void;
    updateSettings(settings: {
        [key: string]: string;
    }): void;
    getLobbyMaterial(callback?: (data: LobbyMaterial) => any): void;
    _handleCustomRoadmapUpdate(result: any, callback: any, event: string, f: Function, status: string, method: string, args: Array<Object>): void;
    resetRoadmap(callback?: Function): void;
    getRoadmap(callback?: Function): void;
    updateDefaultRoadmap(ids: string[], callback?: Function): void;
    createCustomRoadmap(name: string, pattern: string, callback?: Function): void;
    updateCustomRoadmap(id: string, data: object, callback?: Function): void;
    removeCustomRoadmap(id: string, callback?: Function): void;
    _handleBetTemplateUpdate(result: any, callback: Function, f: Function, status: string, method: string, args: Array<Object>): void;
    createBetTemplate(title: string, betOptions: BetValueCommand[], callback?: Function): void;
    getBetTemplate(callback?: Function): void;
    removeBetTemplate(id: string, callback?: Function): void;
    updateBetTemplate(title: string, betOptions: BetValueCommand[], callback?: Function): void;
    sendVerifyInfo(tableID: string, pattern: string[], callback?: Function): void;
    private _handleGetTableList;
    private _handleTableInfoUpdate;
    private _isTableInfoCallbackEmpty;
    private _startPing;
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
    DT: 5;
    DI: 12;
    MJ: 13;
    RO: 14;
    LO: 15;
    LW: 16;
    ROL: 17;
    BAM: 18;
    DIL: 19;
    SLOT: 20;
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
    SHUFFLE = 5,
    PEEK = 6,
    PEEK_PLAYER = 7,
    PEEK_BANKER = 8
}
declare enum DTGameStateType {
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
declare enum DTWinType {
    NONE = 0,
    DRAGON = 1,
    TIGER = 2,
    TIE = 3
}
interface BetValueCommand {
    field: string;
    amount: number;
}

interface LobbyMaterial {
    logourl: string		// logo image url
    homeherobanners: {[key: string]: string}[]
	homelargebanners:{[key: string]: string}[]
	homebanners:{[key: string]: string}[]
	liveherobanners:{[key: string]: string}[]
	lotteryherobanners:{[key: string]: string}[]
	egameherobanners:{[key: string]: string}[]
	favouriteherobanners:{[key: string]: string}[]
	messages:string[]    
}

interface BetHistoryDetail {
    id: string;
    datetime: number;
    gametype: number;
    tablename: string;
    roundid: string;
    replayurl: string;
    remark: number;
    field: string;
    betAmount: number;
    winAmount: number;
    prevremaining: number;
    endremaining: number;
}
interface BetHistory {
    history: BetHistoryDetail[];
}

interface BetHistoryResults {
    a1: string,		// banker 1st card
    a2: string,
    a3: string,
    b1: string,		// player 1st card
    b2: string,
    b3: string,
    playerpoint: number,
    bankerpoint: number
}