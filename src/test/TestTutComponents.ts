// TypeScript file
namespace we {
  export namespace test {
    export class TestTutComponents extends eui.Component {

        private _button : eui.Group;
        private _holder : we.ui.HorizontalHolder;

        constructor()
        {
            super();
            this.init();
        }

        private init()
        {
            this.addListeners();
            //add childs then init holder
        }

        private addListeners()
        {
            this._button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);            
        }

        private removeListners()
        {
            this._button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);            
        }

        private onButtonClick(e)
        {
            this._holder.doNext();
        }
    }
  }
}