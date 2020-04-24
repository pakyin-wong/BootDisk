namespace we {
  export namespace ui {
    export abstract class GameComponentPool {
      protected _pools: { [key: number]: utils.Pool<any> };

      constructor(opt: any) {
        this._pools = {};
        const gameTypes = ['ba', 'dt', 'ro', 'di', 'lw'];
        for (const gameType of gameTypes) {
          this._pools[gameType] = new utils.Pool(this.generateComponent(gameType));
        }
        this.initPool(opt);
      }

      async initPool(opt) {
        const gameTypes = ['ba', 'dt', 'ro', 'di', 'lw'];
        for (const gameType of gameTypes) {
          if (opt[gameType]) {
            const count = opt[gameType];
            const objs = [];
            const pool = this._pools[gameType];
            for (let i = 0; i < count; i++) {
              const obj = pool.get();
              objs.push(obj);
              await utils.sleep(100);
            }
            for (let i = count - 1; i >= 0; i--) {
              const obj = objs[i];
              pool.release(obj);
            }
          }
        }
      }

      abstract generateComponent(gameType: string);

      get(gameType: core.GameType) {
        const namespace = utils.getGameTypeNamespace(gameType);
        try {
          return this._pools[namespace].get();
        }
        catch (err) {
          throw new Error(`no pool for specific game type ${gameType}`);
        }
      }

      release(obj: any, gameType: core.GameType) {
        const namespace = utils.getGameTypeNamespace(gameType);
        try {
          this._pools[namespace].release(obj);
        }
        catch (err) {
          throw new Error(`no pool for specific game type ${gameType}`);
        }
      }
    }
  }
}
