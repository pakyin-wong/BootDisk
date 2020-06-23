// TypeScript file
namespace we {
  export namespace lo {
      class SSCBallRowInput extends AInputComponent{
        private _title : ui.RunTimeLabel;
        private _ballsGroup : eui.Group;
        private _content : eui.Group;

        private _optionPanel : SSCTradtionalBettingOptionButtonRow;
        private _balls : SSCBallButton[];

        constructor(index: number, config: any){
            super(index,config);

            switch(this._config.theme){
                case InputComponentTheme.ROW:
                case InputComponentTheme.ROW_WITH_OPTION:
                this.skinName = 'skin_desktop.lo.SSCBallButtonRow';
                case InputComponentTheme.ROWS:
                this.skinName = 'skin_desktop.lo.SSCBallButtonRows';
                break;
            }

            this.init();
        }

        protected init(){
            if(this._config.title && this._title){
                this._title.text = this._config.title;
            }

            for(let i = 0;i < this._config.data.length;i++){
                const ball = new SSCBallButton(this._config.data[i]);
                ball.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBallClicked,this);
                this._balls.push(ball);
                this._ballsGroup.addChild(ball);
            }

            if(this._config.theme === InputComponentTheme.ROW_WITH_OPTION){
                this._optionPanel = new SSCTradtionalBettingOptionButtonRow();
                for(let i = 0;i < this._optionPanel._buttonGroup.numChildren;i++){
                    this._optionPanel._buttonGroup[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOptionMenuClicked,this);
                }
                this._content.addChild(this._optionPanel);
            }
        }

        protected onOptionMenuClicked(e:egret.TouchEvent){
            switch(e.target)
            {
                case this._optionPanel._allButton:
                    for(let i = 0;i < this._balls.length;i++){
                        (this._balls[i]as SSCBallButton).toggleActive(true);
                    }
                break;
                case this._optionPanel._oddButton:
                break;
                case this._optionPanel._evenButton:
                break;
                case this._optionPanel._bigButton:
                break;
                case this._optionPanel._smallButton:
                break;
                case this._optionPanel._clearButton:
                break;
            }
            this.updateData();
        }

        protected onBallClicked(e:egret.TouchEvent){
            (e.target as SSCBallButton).toggleActive();
            this.updateData();
        }

        protected updateData(){
            this._data = '';
            for(let i = 0;i < this._balls.length;i++){
                if(this._balls[i].isActive){
                    this._data.push(this._balls[i].betValue);
                }
            }
            this.dispatchEventWith(egret.Event.CHANGE, false, {index: this._index, data:this._data});
        }
    }
  }
}