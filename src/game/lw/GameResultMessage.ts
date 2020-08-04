namespace we {
  export namespace lw {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'lucky_wheel';
      protected _armatureName = 'Luckywheel_Game_Result';

      //   private eastSource: string;
      //   private southSource: string;
      //   private westSource: string;
      //   private northSource: string;
      //   private redSource: string;
      //   private greenSource: string;
      //   private whiteSource: string;

      //   public type: string = null;

      //   public constructor() {
      //     super();
      //   }

      //   protected updateSource() {
      //     if (env.isMobile) {
      //       if (this.type === 'side') {
      //         this.eastSource = 'm_lw_listpenal_result_east_png';
      //         this.southSource = 'm_lw_listpenal_result_south_png';
      //         this.westSource = 'm_lw_listpenal_result_west_png';
      //         this.northSource = 'm_lw_listpenal_result_north_png';
      //         this.redSource = 'm_lw_listpenal_result_red_png';
      //         this.greenSource = 'm_lw_listpenal_result_green_png';
      //         this.whiteSource = 'm_lw_listpenal_result_white_png';
      //       } else {
      //         this.eastSource = 'm_lw_result_east_png';
      //         this.southSource = 'm_lw_result_south_png';
      //         this.westSource = 'm_lw_result_west_png';
      //         this.northSource = 'm_lw_result_north_png';
      //         this.redSource = 'm_lw_result_red_png';
      //         this.greenSource = 'm_lw_result_green_png';
      //         this.whiteSource = 'm_lw_result_white_png';
      //       }
      //     } else {
      //       this.eastSource = 'd_lw_result_east_png';
      //       this.southSource = 'd_lw_result_south_png';
      //       this.westSource = 'd_lw_result_west_png';
      //       this.northSource = 'd_lw_result_north_png';
      //       this.redSource = 'd_lw_result_red_png';
      //       this.greenSource = 'd_lw_result_green_png';
      //       this.whiteSource = 'd_lw_result_white_png';
      //     }
      //   }

      //   public showResult(gameType: core.GameType, resultData: any) {
      //     this.visible = true;
      //     this.updateSource();
      //     this._dbClass = 'roulette';
      //     this.removeChildren();
      //     const image = new eui.Image();
      //     const gameData = resultData.gameData;
      //     switch (gameData.value) {
      //       case '01':
      //         image.source = this.eastSource;
      //         break;
      //       case '02':
      //         image.source = this.southSource;
      //         break;
      //       case '03':
      //         image.source = this.westSource;
      //         break;
      //       case '04':
      //         image.source = this.northSource;
      //         break;
      //       case '05':
      //         image.source = this.whiteSource;
      //         break;
      //       case '06':
      //         image.source = this.redSource;
      //         break;
      //       case '07':
      //       default:
      //         image.source = this.greenSource;
      //         break;
      //     }
      //     this.addChild(image);

      //     if (resultData.totalWin) {
      //       const banner = new eui.Image();
      //       banner.source = image.source.replace('result', 'result_money_bg').replace('green', 'gold');
      //       banner.y = 400;
      //       banner.horizontalCenter = 0;
      //       // banner.bottom = -40;
      //       this.addChild(banner);

      //       const lab = new eui.Label();
      //       lab.text = utils.formatNumber(resultData.totalWin);
      //       lab.size = 40;
      //       lab.y = 420;
      //       lab.horizontalCenter = 0;
      //       // lab.horizontalCenter = 0;
      //       // lab.bottom = -40;
      //       this.addChild(lab);
      //     }
      //   }

      //   public clearMessage() {
      //     this.visible = false;
      //   }

      protected startAnim(gameType: core.GameType, resultData: any) {
        console.log('resultData', resultData);
        // const { , gameData } = resultData;
        const { winAmount, gameData } = resultData;
        const value = parseInt(gameData.value, 10) - 1;

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        let anim = 'ani_result_';
        switch (value) {
          case 0:
            anim += 'East';
            break;
          case 1:
            anim += 'South';
            break;
          case 2:
            anim += 'West';
            break;
          case 3:
            anim += 'North';
            break;
          case 4:
            anim += 'White';
            break;
          case 5:
            anim += 'Gold_Red';
            break;
          case 6:
          default:
            anim += 'Gold_Green';
            break;
        }

        if (isNaN(winAmount)) {
          anim += '_NoBet';
        }

        const slot = this._display.armature.getSlot('800_Number');
        const r = new eui.Label();
        r.fontFamily = 'Barlow';
        r.size = 60;
        r.text = utils.formatNumber(winAmount);
        const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
        r.filters = [shadowFilter];
        r.bold = true;
        r.textColor = 0xffffff;
        const layer = new eui.Group();
        layer.addChild(r);
        layer.anchorOffsetX = r.width * 0.5;
        layer.anchorOffsetY = r.height * 0.5;
        slot.display = layer;

        this.visible = true;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
