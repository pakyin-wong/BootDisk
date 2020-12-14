namespace we {
  export namespace ui {
    export class RunTimeLabel extends ClampWidthLabel implements ui.IRunTimeComponent {
      private _renderer: () => string;
      private _isReg: boolean = false;

      public _textKey: string = '';
      public _oddKey: string = '';
      public overflow: boolean = false; //replace overflow text with overflowText
      public overflowText: string = '...';
      protected _targetWidth: number = -1;

      constructor() {
        super();
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      get textKey(): string {
        return this._textKey;
      }

      set textKey(value: string) {
        this._textKey = value;
      }

      get oddKey(): string {
        return this._oddKey;
      }

      set oddKey(val: string) {
        this._oddKey = val;
      }

      public set targetWidth(val: number) {
        this.$setTargetWidth(val);
      }

      public get targetWidth(): number {
        return this.$getTargetWidth();
      }

      protected initRenderText() {
        if (!this._isReg && this._renderer) {
          i18n.register(this);
          this._isReg = true;
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
          this.render();
        } else if (this._textKey) {
          this.renderText = () => i18n.t(this._textKey);
        } else if (this._oddKey) {
          this.renderText = () => i18n.oddt(this._oddKey);
        }
      }

      protected destroy() {
        if (this._isReg) {
          i18n.drop(this);
          this._isReg = false;
        }
        this.renderText = null;
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.initRenderText, this);
      }

      public set i18n(value: string) {
        this.renderText = () => i18n.t(value);
      }

      public get i18n() {
        return this._renderer && this._renderer();
      }

      public set renderText(renderer: () => string) {
        this._renderer = renderer;
        if (!this._isReg && this.$hasAddToStage) {
          i18n.register(this);
          this._isReg = true;
          this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        }
        this.render();
      }

      public get renderText() {
        return this._renderer;
      }

      public render() {
        let rslt = this._renderer && (this.text = this._renderer());
        if(this.overflow){
          const values = {
            italic: this.italic,
            bold: this.bold,
            size: this.size,
            fontFamily: this.fontFamily,
          };
          const inText = this.text;
          let count = 0;
          while(utils.measureTextWidth(this.text, values, this.style) > this.width && count < inText.length){
            this.text = inText.substring(0, inText.length-count-1) + this.overflowText;
            count ++;
          };
        }
        return rslt;
      }
    }
  }
}
