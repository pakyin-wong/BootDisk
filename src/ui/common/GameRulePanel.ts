// TypeScript file
namespace we {
  export namespace ui {
    export class GameRulePanel extends Panel {
      public content: eui.Group;
      public close: eui.Image;

      protected _lblRuleTitle : ui.RunTimeLabel;

      protected _lblWinRule : ui.RunTimeLabel;
      protected _lblBettingGuide : ui.RunTimeLabel;
      protected _lblDrawingRule : ui.RunTimeLabel;
      protected _lblPayoutRule : ui.RunTimeLabel;

      protected _scroller : eui.Scroller;

      protected _gameType : string;

      public constructor(){
        super();
        this.isEdgeDismissable = true;
        //test
        this.skinName = "skin_mobile_portrait.bamb.GameRulePanel";
      }

      protected mount(){
        super.mount();
        this.onLanguageUpdate();
      }
      protected addListeners(){
        dir.evtHandler.addEventListener(we.core.Event.SWITCH_LANGUAGE,this.onLanguageUpdate,this);
      }

      protected removeListeners(){
        dir.evtHandler.removeEventListener(we.core.Event.SWITCH_LANGUAGE,this.onLanguageUpdate,this);
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