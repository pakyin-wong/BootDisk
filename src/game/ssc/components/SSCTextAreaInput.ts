// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTextAreaInput extends AInputComponent {
      protected _textAreaGroup: eui.Group;

      protected _textArea: egret.TextField;
      protected _instruction: ui.RunTimeLabel;

      constructor(index: number, config: any) {
        super(index, config);
        this.skinName = 'skin_desktop.lo.SSCTextAreaInput';
      }

      protected initComponents() {
        // this._textArea = new egret.TextField();
        // this._textArea.width = 1408;
        // this._textArea.height = 180;
        // this._textArea.background = true;
        // this._textArea.backgroundColor = 0x1b232c;
        // this._textArea.multiline = true;
        // this._textArea.setFocus();
        // this._textAreaGroup.addChild(this._textArea);
      }

      protected onTextInputUpdate(e:egret.Event){
        this._data = this.validateTextArea(this._textArea.text);
      }

      protected validateTextArea(text){
        //validate via rule
        return text;
      }
    }
  }
}
