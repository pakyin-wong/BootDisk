/* tslint:disable triple-equals */
/**
 * BlockchainDragonTigerScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dtb {
    export class Scene extends bab.Scene {
      protected _leftGamePanel: dt.DTRoadmapLeftPanel;
      protected _rightGamePanel: dt.DTRoadmapRightPanel;
      protected _beadRoadResultPanel: dt.DTBeadRoadResultPanel;

      public static resGroups = [core.res.Blockchain, core.res.BlockchainDragonTiger];

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainDragonTigerScene');
      }

      protected initRoadMap() {
        this._roadmapControl = new dt.DTRoadmapControl(this._tableId);
        (<dt.DTRoadmapControl>this._roadmapControl).setRoads(
          this._leftGamePanel.beadRoad,
          this._rightGamePanel.bigRoad,
          this._rightGamePanel.bigEyeRoad,
          this._rightGamePanel.smallRoad,
          this._rightGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel,
          this._beadRoadResultPanel
        );
      }

      protected async updateCard(currentcardindex){
        if(!this.tableInfo || !this._tableInfo.hostid){
          return;
        }
        await new Promise(resolve=>
          {dir.socket.getGameStatusDT(this._tableInfo.hostid,we.blockchain.RETRIEVE_OPTION.CARD,currentcardindex,
          (data) => {
            if(this._gameData && this._gameData.maskedcardssnList && data.maskedcardssnList && data.maskedcardssnList[0]){
              this._gameData.maskedcardssnList[currentcardindex] = data.maskedcardssnList[0]
            }
            resolve();
          }
        )
        });
        return new Promise(resolve=>resolve());
      }

      protected async updateMaskedSsn(){
        if(!this.tableInfo || !this._tableInfo.hostid){
          return;
        }
        dir.socket.getGameStatusDT(this._tableInfo.hostid,we.blockchain.RETRIEVE_OPTION.MASK,null,
          (data) => {this._gameData.maskedcardssnList = data.maskedcardssnList}
        )
      }

      protected async updateHash(){
        if(!this.tableInfo || !this._tableInfo.hostid){
          return;
        }
        dir.socket.getGameStatusDT(this._tableInfo.hostid,we.blockchain.RETRIEVE_OPTION.HASH,null,
          (data)=> {this._gameData.hashedcardsList = data.hashedcardsList}
        )
      }

      // protected onTableBetInfoUpdate(evt: egret.Event) {
      //   super.onTableBetInfoUpdate(evt);
      //   if (!evt || !evt.data) {
      //     return;
      //   }
      //   const betInfo = <data.GameTableBetInfo> evt.data;
      //   if (betInfo.tableid === this._tableId) {
      //     // update the scene
      //     (<we.dt.TableLayer> this._tableLayer).totalAmount = evt.data.amount;
      //     (<we.dt.TableLayer> this._tableLayer).totalPerson = evt.data.count;
      //     // this._leftGamePanel.totalBet = evt.data.total;
      //   }
      // }
    }
  }
}
