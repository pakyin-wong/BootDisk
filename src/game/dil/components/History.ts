namespace we {
  export namespace dil {
    export class History extends  ui.Panel {
      protected tableInfo: data.TableInfo;
      protected _gamestatistic: any;
      public round: number = 10;

      protected _roundNumber: eui.Label;
      protected _sum3Percent: ui.Label;
      protected _sum4Percent: ui.Label;
      protected _sum5Percent: ui.Label;
      protected _sum6Percent: ui.Label;
      protected _sum7Percent: ui.Label;
      protected _sum8Percent: ui.Label;
      protected _sum9Percent: ui.Label;
      protected _sum10Percent: ui.Label;
      protected _sum11Percent: ui.Label;
      protected _sum12Percent: ui.Label;
      protected _sum13Percent: ui.Label;
      protected _sum14Percent: ui.Label;
      protected _sum15Percent: ui.Label;
      protected _sum16Percent: ui.Label;
      protected _sum17Percent: ui.Label;
      protected _sum18Percent: ui.Label;
      protected _holder: ui.HorizontalHolder;

      protected _sum3: ui.ProgressBar;
      protected _sum4: ui.ProgressBar;
      protected _sum5: ui.ProgressBar;
      protected _sum6: ui.ProgressBar;
      protected _sum7: ui.ProgressBar;
      protected _sum8: ui.ProgressBar;
      protected _sum9: ui.ProgressBar;
      protected _sum10: ui.ProgressBar;
      protected _sum11: ui.ProgressBar;
      protected _sum12: ui.ProgressBar;
      protected _sum13: ui.ProgressBar;
      protected _sum14: ui.ProgressBar;
      protected _sum15: ui.ProgressBar;
      protected _sum16: ui.ProgressBar;
      protected _sum17: ui.ProgressBar;
      protected _sum18: ui.ProgressBar;
      protected _data;

      protected _prevbtn: eui.Group;//desktop only
      protected _prevbtnImage: eui.Image;//desktop only
      // d_common_panel_info_btn_right_active_png
      // d_common_panel_info_btn_right_png
      // d_common_panel_info_btn_left_active_png
      // d_common_panel_info_btn_left_png
      protected _nextbtn: eui.Group;//desktop only
      protected _nextbtnImage: eui.Image;//desktop only
      

      protected _totalResult:number;
      public constructor(skin: string = null) {
        super(skin);
      }

      public set totalResult (val:number) {
        this._totalResult = val;
      }
      protected mount() {
        super.mount();
        if (this._holder) {
          this._holder.finishAction = this.finishAction.bind(this);
        }
        if (this._roundNumber) {
          this._roundNumber.text = this.round.toString();
        }
        this.addEventListeners();
        if (this._nextbtn && this._prevbtn) {
          this._nextbtnImage.source = 'd_common_panel_info_btn_right_active_png';
          this._prevbtnImage.source = 'd_common_panel_info_btn_left_png'
        }        
      }
      protected destroy(){
        super.destroy();
        this.removeEventListeners();
      }
      protected addEventListeners(){
        if(this._nextbtn){
          this._nextbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickNext,this)
        }
        if(this._prevbtn){
          this._prevbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickPrev,this)
        }
      }
      protected removeEventListeners(){
        if(this._nextbtn){
          this._nextbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickNext,this)
        }
        if(this._prevbtn){
          this._prevbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickPrev,this)
        }
      }
      public setValue(tableInfo: data.TableInfo) { //called when bet start
        this.tableInfo = tableInfo;
        if (tableInfo.gamestatistic) {
          this._gamestatistic = tableInfo.gamestatistic;
          this._data = tableInfo.gamestatistic
          this.updateHistoryBar(this._gamestatistic)
        }
      }
      // update history chart when tableinfo info update
       public updateHistoryTableInfo(tableInfo) {
        this._gamestatistic = tableInfo.gamestatistic;
        // console.log('updateTableBetInfo::this.tableInfo.betInfo',this.tableInfo.betInfo)
        this.updateHistoryBar(this._gamestatistic);  
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.amount));
      }    
      public finishAction(page: number) {
        if (page === 0) {
          this.round = 10;
        } else {
          this.round = 50;
        }
        if (this._roundNumber) {
          this._roundNumber.text = this.round.toString();
        }
        this.updateHistoryBar(this._data);
        console.log(' this.updateHistoryBar(this._data);',this._data)
      }
      public updateStat(data: we.data.GameStatistic) {
        this._data = data;
        console.log('updateStat::this._data = data;',this._data)
        this.updateHistoryBar(this._data);
      }
      protected updateBar(data) {
        if (!data || !data.dilHistory || !data.dilHistory.round_10 || !data.dilHistory.round_50) {
          return;
        }
        const percentages_10 = we.utils.stat.toPercentages(data.dilHistory.round_10);
        const percentages_50 = we.utils.stat.toPercentages(data.dilHistory.round_50);
        if (this.round === 10) {
          for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages_10[i - 3]}%`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_10[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
        } else {
          for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages_50[i - 3]}%`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_50[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
        }
      }
      protected updateBarWithTenResult(data){//mobile
        if (!data || !data.dilHistory || !data.dilHistory.round_10 || !data.dilHistory.round_50) {
          return;
        }
        const percentages_10 = we.utils.stat.toPercentages(data.dilHistory.round_10);
        for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages_10[i - 3]}`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_10[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
      }
      protected updateBarWithFiftyResult(data){//mobile
        if (!data || !data.dilHistory || !data.dilHistory.round_10 || !data.dilHistory.round_50) {
          return;
        }
        const percentages_50 = we.utils.stat.toPercentages(data.dilHistory.round_50);
        for (let i = 3; i < 19; i++) {
          this[`_sum${i}Percent`].text = `${percentages_50[i - 3]}`;
          (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_50[i - 3] / 100;
          (<ui.ProgressBar> this[`_sum${i}`]).draw();
        }
      }
      protected updateHistoryBar (data) {
        if (env.isMobile) {
          // check is 10 records or 50 records
          if (this._totalResult === 10) {
            this.updateBarWithTenResult(data);
          } else if (this._totalResult === 50){
            this.updateBarWithFiftyResult(data);
          }
        } else {
          this.updateBar(data)
        }
      };
      protected onClickNext(){
        this.finishAction(1)
        this._nextbtnImage.source = 'd_common_panel_info_btn_right_png';
        this._prevbtnImage.source = 'd_common_panel_info_btn_left_active_png'
        this._prevbtn.touchEnabled = true;
        this._nextbtn.touchEnabled = false;
      }
      protected onClickPrev(){
        this.finishAction(0)
        this._nextbtnImage.source = 'd_common_panel_info_btn_right_active_png';
        this._prevbtnImage.source = 'd_common_panel_info_btn_left_png'
        this._prevbtn.touchEnabled = false;
        this._nextbtn.touchEnabled = true;
      }
    }
  }
}
