// TypeScript file
namespace we {
  export namespace ui {
    export class GameRulePanel extends Panel {
      public content: eui.Group;
      public close: eui.Image;

      // protected _lblRuleTitle : ui.RunTimeLabel;

      // protected _lblWinRule : ui.RunTimeLabel;
      // protected _lblBettingGuide : ui.RunTimeLabel;
      // protected _lblDrawingRule : ui.RunTimeLabel;
      // protected _lblPayoutRule : ui.RunTimeLabel;

      // protected _scroller : eui.Scroller;

      // protected _gameType : string;

      public constructor(){
        super();

        // this._skinKey="basb.GameRulePanel";
        // this.updateSkin(this._skinKey);
      }

      protected init(isInit){
        this.isPoppable = true;
        this.hideOnStart = true;
        if(isInit){
          this.addListeners();
        }
      }

      protected mount(){
        super.mount();

        if(env.isMobile){
          this.horizontalCenter = 0;
          this.bottom = 0;
        }else{
          this.horizontalCenter = 0;
          this.verticalCenter = 0;
        }

        this.onLanguageUpdate();
        // this.addListeners()
      }

      protected addListeners(){
        dir.evtHandler.addEventListener(we.core.Event.SWITCH_LANGUAGE,this.onLanguageUpdate,this);
        dir.evtHandler.addEventListener('OPEN_GAMERULEPANEL',this.onShow,this);
        if(this.close){
          this.close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
          mouse.setButtonMode(this.close,true);
        }
      }

      protected removeListeners(){
        dir.evtHandler.removeEventListener(we.core.Event.SWITCH_LANGUAGE,this.onLanguageUpdate,this);
        dir.evtHandler.removeEventListener('OPEN_GAMERULEPANEL',this.onShow,this);
        if(this.close){
          this.close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
        }      
      }

      protected destroy(){
        this.removeListeners();
        super.destroy();
      }

      protected onClose(e){
        if(this.isShowed){
          this.hide();
        }
      }

      public setGameType(gameType, isInit = false){
        // this.removeListeners();
        switch(gameType){
          case we.core.GameType.BAB:
            this._skinKey = 'bab.GameRulePanel';
          break;
          case we.core.GameType.BAMB:
            this._skinKey = 'bamb.GameRulePanel';
          break;
          case we.core.GameType.BASB:
            this._skinKey = 'basb.GameRulePanel';
          break;
          case we.core.GameType.DTB:
            this._skinKey = 'dtb.GameRulePanel';
          break;
          default:
            this._skinKey = '';
          return;
        }

        if(this._skinKey.length > 0){
          this.updateSkin(this._skinKey);
          this.init(isInit);
        }
      }

      protected onShow(e){
        if(this.isShowed){
          return;
        }
        this.setGameType(this._skinKey);
        this.show();
      }

      protected onLanguageUpdate(e = null){
        switch(env.language){
          case we.core.lang.CN.toString():
          this.currentState = 'cn';
          break;
          case we.core.lang.ZH.toString():
          this.currentState = 'zh';
          break;
          case we.core.lang.EN.toString():
          this.currentState = 'en';
          break;
        }

        this.invalidateState();
      }
    }
  }
}