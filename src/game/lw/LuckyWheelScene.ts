/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace lw {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.ro.RORoadmapControl;
      protected _leftGamePanel: we.ro.RoLeftPanel;
      protected _rightGamePanel: we.lw.LwRightPanel;
      protected _bigRoadResultPanel: we.ro.ROBigRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LuckyWheelScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'other' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (!evt.data) {
          return;
        }
        for (let i = 0; i < 7; i += 1) {
          this._rightGamePanel[`_lbl_lwValue${i}`].text = evt.data.amount[`LW_${i}`] || 0;
        }
        logger.l(JSON.stringify(evt.data.count));
        logger.l(JSON.stringify(evt.data.amount));
      }

      protected initChildren() {
        super.initChildren();
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        if (!this._gameData) {
          return;
        }

        const resultNo = (<ro.GameData> this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);

        if (this.hasBet() && !isNaN(totalWin)) {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: this._tableInfo.totalWin,
          });
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: NaN,
          });
          dir.audioCtr.playSequence(['player', 'win']);
        }
      }
    }
  }
}
