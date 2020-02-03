declare class UAParser {
    constructor([uastring]?, [extensions]?);
    getBrowser(): any;
    getDevice(): any;
    getEngine(): any;
    getOS(): any;
    getCPU(): any;
    getResult(): any;
    getUA(): any;
    setUA(uastring): void;
}