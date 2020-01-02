namespace we {
  export namespace utils {
    export class UndoStack {
      protected _stack: Array<{ id: string; undoData: any; undoCallback: (undoData: any) => void }>;
      public push(id, undoData, undoCallback) {
        if (!this._stack) {
          this._stack = new Array<{ id: string; undoData: any; undoCallback: (undoData: any) => void }>();
        }
        this._stack.push({ id, undoData, undoCallback });
      }
      public pop() {
        if (!this._stack) {
          return null;
        }
        const command = this._stack.pop();
        return command;
      }
      public popAndUndo() {
        if (!this._stack) {
          return;
        }
        const command = this._stack.pop();
        command.undoCallback(command.undoData);
      }
      public clearStack() {
        this._stack = new Array<{ id: string; undoData: any; undoCallback: (undoData: any) => void }>();
      }
    }
  }
}
