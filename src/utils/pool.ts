/* tslint:disable interface-name */
namespace we {
  export namespace utils {
    export class Pool<T> {
      private pool: T[];
      private Func: Pool.Resettable<T>;

      constructor(Func: Pool.Resettable<T>) {
        this.pool = [];
        this.Func = Func;
      }

      public get(): T {
        if (this.pool.length) {
          return this.pool.pop();
        }
        return new this.Func();
      }

      public release(obj: T): void {
        if (this.Func.reset) {
          this.Func.reset(obj);
        }
        this.pool.push(obj);
      }
    }

    namespace Pool {
      export interface Resettable<T> {
        // constructor
        new (): T;
        // static
        reset?(obj: T): void;
      }
    }
  }
}
