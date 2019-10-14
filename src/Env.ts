class Env {
    private static _env: Env;
    public static get Instance(): Env {
        return (this._env = this._env ? this._env : new Env())
    };

    /* Global Environment Variable */
    public balance: number = undefined;
}

let env: Env = Env.Instance;