namespace we {
  export namespace utils {
    export class UndoStack {
      protected _stack: Array<{ hashkey: string; undoData: any; undoCallback: (undoData: any) => void }>;
      public push(hashkey, undoData, undoCallback) {
        if (!this._stack) {
          this._stack = new Array<{ hashkey: string; undoData: any; undoCallback: (undoData: any) => void }>();
        }
        this._stack.push({ hashkey, undoData, undoCallback });
      }
      public pop() {
        if (!this._stack) {
          return null;
        }
        const command = this._stack.pop();
        return command;
      }
      public popAndUndo() {
        if (!this._stack || this._stack.length === 0) {
          return;
        }
        const command = this._stack.pop();
        if (command) {
          command.undoCallback(command.undoData);
          if (command.hashkey) {
            // if (this._stack[this._stack.length - 1].hashkey === command.hashkey) {
            //   this.popAndUndo();
            // }
            while (this._stack.length > 0 && this._stack[this._stack.length - 1].hashkey === command.hashkey) {
              const chainCommand = this._stack.pop();
              chainCommand.undoCallback(chainCommand.undoData);
            }
          }
        }
      }
      public clearStack() {
        this._stack = new Array<{ hashkey: string; undoData: any; undoCallback: (undoData: any) => void }>();
      }
    }
  }
}
