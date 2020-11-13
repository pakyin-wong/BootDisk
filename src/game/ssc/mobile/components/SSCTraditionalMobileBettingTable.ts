// TypeScript 
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileBettingTable extends SSCTraditionalBettingTable {

      private _bettingTableViewPort: eui.Group;
      private _bettingTableToggleButton: eui.Group;
      private _topClose: eui.Group;

      private _playmodeDropDownButton: eui.Group;
      private _playmodeDropDownButtonBg: ui.RoundRectShape;
      private _playmodeLabelGrp : eui.Group;

      private _lblPlayMode : ui.RunTimeLabel;
      private _bottomGroup : eui.Group;
      private _content : eui.Group;
      private _bettingTableGrp : eui.Group;
      private _buttonGroup : eui.Group;
      private _bg : eui.Group;

      private playMode : string;

      constructor(config ,playMode = null) {
        super(config);
        if(playMode){
          this.playMode = playMode;
        }
      }

      public init() {
        super.init();
        this.addEventListeners();
        if(this.playMode){
          this._lblPlayMode.renderText = () => this.playMode;
          this._playmodeDropDownButton.width = this._playmodeLabelGrp.width;
          this._playmodeDropDownButtonBg.width = this._playmodeLabelGrp.width;
          this._playmodeDropDownButtonBg.refresh();
        }
      }

      public setLabelPlayMode(str){
        if(this._lblPlayMode){
          this._lblPlayMode.renderText = () => str;
        }
      }

      protected addEventListeners() {
        if (env.isMobile) {
          this._bettingTableToggleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._topClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.closeBettingTableState, this.bettingPanel);
          this._playmodeDropDownButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.toggleGameTypeDropdown, this.bettingPanel);
        }
      }

      protected removeEventListeners() {
        if (env.isMobile) {
          this._bettingTableToggleButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._topClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._playmodeDropDownButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.toggleGameTypeDropdown, this.bettingPanel);
        }
      }

      protected initSkin() {
        this.skinName = 'skin_mobile.lo.SSCTraditionalBettingTable';
      }

      protected createComponents() {
        let offsetY = 0;

        let container;
        container = this._bettingTableViewPort;

        for (let i = 0; i < this._inputs.length; i++) {
          container.addChild(this._inputs[i]);
          this._inputs[i].y = offsetY;
          offsetY += this._inputs[i].height + 1;
        }
      }
      
      public switchState(to : string){
        //_bottomGroup : height.off="0" height.on="1456" height.extend="2023"
        //_topClose : height.off="0" height.on="699" height.extend="132" touchEnabled.off="false" touchEnabled.on="true" touchEnabled.extend="true"
        //id="_content" : visible.off="false" visible.on="true" visible.extend="true"
        //_bettingTableGrp : height.off="0" height.on="960" height.extend="1527"
        //_bettingTableViewPort : height.on="960" height.extend="1527" height.off="0"
        if(this.currentState === to){
          return;
        }

        this._content.touchEnabled = false;
        this._content.touchChildren = false;

        egret.Tween.removeTweens(this._bottomGroup);
        egret.Tween.removeTweens(this._topClose);
        egret.Tween.removeTweens(this._content);
        egret.Tween.removeTweens(this._bettingTableGrp);
        egret.Tween.removeTweens(this._bettingTableViewPort);
        egret.Tween.removeTweens(this._buttonGroup);
        egret.Tween.removeTweens(this._bg);

        let bottomGrpHeight = 0;
        let bottomGroupTouchEnable = false;
        let topCloseHeight = 0;
        let topCloseEnable = false;
        let contentVisible = false;
        let bettingTableHeight = 0;
        let bettingViewPortHeight = 0;
        let buttonGrpHeight = 0;
        let bgHeight = 0;

        switch(to){
          case 'off':
            bottomGrpHeight = 0;
            topCloseHeight = 0;
            topCloseEnable = false;
            contentVisible = false;
            bettingTableHeight = 0;
            bettingViewPortHeight = 0;
            buttonGrpHeight = 0;
            bgHeight = 0;
            bottomGroupTouchEnable = false;
          break;
          case 'on':
            bottomGrpHeight = 1456;
            topCloseHeight = 699;
            topCloseEnable = true;
            contentVisible = true;
            bettingTableHeight = 960;
            bettingViewPortHeight = 960;
            buttonGrpHeight = 960;
            bgHeight = 1402;
            bottomGroupTouchEnable = true;

          break;
          case 'extend':
            bottomGrpHeight = 2023;
            topCloseHeight = 132;
            topCloseEnable = true;
            contentVisible = true;
            bettingTableHeight = 1527;
            bettingViewPortHeight = 1527;
            buttonGrpHeight = 1527;
            bgHeight = 1979;
            bottomGroupTouchEnable = true;
          break;
        }

        const tweenComplete = function (): void {
          this._content.touchEnabled = true;
          this._content.touchChildren = true;
        }.bind(this); 

        egret.Tween.get(this._bottomGroup).to({height:bottomGrpHeight, touchEnabled:bottomGroupTouchEnable, touchChildren:bottomGroupTouchEnable},250);
        egret.Tween.get(this._topClose).to({height:topCloseHeight, touchEnabled:topCloseEnable},250);
        egret.Tween.get(this._content).to({visible:contentVisible},contentVisible ? 0 : 250);
        egret.Tween.get(this._bettingTableGrp).to({height:bettingTableHeight},250);

        egret.Tween.get(this._bettingTableViewPort).to({height:bettingViewPortHeight},250)
        egret.Tween.get(this._bg).to({height:bgHeight},250);

        egret.Tween.get(this._buttonGroup).to({height:buttonGrpHeight},250).call(tweenComplete);
      }
    }
  }
}