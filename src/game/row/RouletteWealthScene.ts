/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace rol {
    export class Scene extends ro.Scene {
      protected _dealRelatedGroup: eui.Group;
      protected _lucky1: eui.Image;
      protected _lucky1No: eui.Label;
      protected _lucky1Odd: eui.Label;
      protected _lucky2: eui.Image;
      protected _lucky2No: eui.Label;
      protected _lucky2Odd: eui.Label;
      protected _lucky3: eui.Image;
      protected _lucky3No: eui.Label;
      protected _lucky3Odd: eui.Label;

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'rol' });
      }
      protected setStateIdle(isInit: boolean = false) {
        super.setStateIdle(isInit);
        this._dealRelatedGroup.visible = false;
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
      }
      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._dealRelatedGroup.visible = false;
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
      }
      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        if (this._previousState !== we.core.GameState.FINISH || isInit) {
          this.updateLuckyNumber();
        }
      }

      protected setStateRefund(isInit: boolean = false) {
        super.setStateRefund(isInit);
        this._dealRelatedGroup.visible = false;
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();

      }
      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        this._dealRelatedGroup.visible = false;
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
      }

      protected setStateUnknown(isInit: boolean = false) {
        super.setStateUnknown(isInit);
        this._dealRelatedGroup.visible = false;
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          (<we.rol.ChipLayer> this._chipLayer).showLuckyNumber();
          this.updateLuckyNumber();
        }
      }

      protected updateLuckyNumber() {
        if (this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber) {
          const luckyImgs = [this._lucky1, this._lucky2, this._lucky3];
          const luckyNo = [this._lucky1No, this._lucky2No, this._lucky3No];
          const luckyOdd = [this._lucky1Odd, this._lucky2Odd, this._lucky3Odd];
          Object.keys(env.tableInfos[this._tableId].data.luckynumber).map((key, index) => {
            console.log(key, index, env.tableInfos[this._tableId].data.luckynumber[key]);
            if (luckyImgs[index] && luckyNo[index] && luckyOdd[index]) {
              luckyImgs[index].source = this.getNumberSource(+key);
              luckyNo[index].text = key;
              luckyOdd[index].text = env.tableInfos[this._tableId].data.luckynumber[key] + 'x';
            }
          });
          (<we.rol.ChipLayer> this._chipLayer).showLuckyNumber();
          this._dealRelatedGroup.visible = true;
        }
      }

      protected getNumberSource(value: number) {
        if (value) {
          switch (ro.RACETRACK_COLOR[value]) {
            case ro.Color.GREEN:
              return 'd_gow_rou_lucky_number_gn_png';
            case ro.Color.RED:
              return 'd_gow_rou_lucky_number_red_png';
            case ro.Color.BLACK:
              return 'd_gow_rou_lucky_number_bk_png';
          }
        }
        return null;
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteWealthScene');
      }
    }
  }
}
