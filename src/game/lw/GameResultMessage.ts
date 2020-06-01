namespace we {
  export namespace lw {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      private eastSource: string;
      private southSource: string;
      private westSource: string;
      private northSource: string;
      private redSource: string;
      private greenSource: string;
      private whiteSource: string;

      public type: string = null;

      public constructor() {
        super();
      }

      protected updateSource() {
        if (env.isMobile) {
          if (this.type === 'side') {
            this.eastSource = 'm_lw_listpenal_result_east_png';
            this.southSource = 'm_lw_listpenal_result_south_png';
            this.westSource = 'm_lw_listpenal_result_west_png';
            this.northSource = 'm_lw_listpenal_result_north_png';
            this.redSource = 'm_lw_listpenal_result_red_png';
            this.greenSource = 'm_lw_listpenal_result_green_png';
            this.whiteSource = 'm_lw_listpenal_result_white_png';
          } else {
            this.eastSource = 'm_lw_result_east_png';
            this.southSource = 'm_lw_result_south_png';
            this.westSource = 'm_lw_result_west_png';
            this.northSource = 'm_lw_result_north_png';
            this.redSource = 'm_lw_result_red_png';
            this.greenSource = 'm_lw_result_green_png';
            this.whiteSource = 'm_lw_result_white_png';
          }
        } else {
          this.eastSource = 'd_lw_result_east_png';
          this.southSource = 'd_lw_result_south_png';
          this.westSource = 'd_lw_result_west_png';
          this.northSource = 'd_lw_result_north_png';
          this.redSource = 'd_lw_result_red_png';
          this.greenSource = 'd_lw_result_green_png';
          this.whiteSource = 'd_lw_result_white_png';
        }
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this.visible = true;
        this.updateSource();
        this._dbClass = 'roulette';
        this.removeChildren();
        const image = new eui.Image();
        switch (resultData.value) {
          case '01':
            image.source = this.eastSource;
            break;
          case '02':
            image.source = this.southSource;
            break;
          case '03':
            image.source = this.westSource;
            break;
          case '04':
            image.source = this.northSource;
            break;
          case '05':
            image.source = this.whiteSource;
            break;
          case '06':
            image.source = this.redSource;
            break;
          case '07':
          default:
            image.source = this.greenSource;
            break;
        }
        this.addChild(image);

        if (resultData.totalWin) {
          const banner = new eui.Image();
          banner.source = image.source.replace('result', 'result_money_bg').replace('green', 'gold');
          banner.y = 400;
          banner.horizontalCenter = 0;
          // banner.bottom = -40;
          this.addChild(banner);

          const lab = new eui.Label();
          lab.text = utils.formatNumber(resultData.totalWin);
          lab.size = 40;
          lab.y = 420;
          lab.horizontalCenter = 0;
          // lab.horizontalCenter = 0;
          // lab.bottom = -40;
          this.addChild(lab);
        }
      }

      public clearMessage() {
        this.visible = false;
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { resultNo, winAmount } = resultData;

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        const [numLeft, numCenter, numRight] = we.ro.getNeighbour(resultNo, 1);
        const colorMap = {
          [we.ro.Color.BLACK]: 'b',
          [we.ro.Color.GREEN]: 'g',
          [we.ro.Color.RED]: 'r',
        };

        let anim = 'ani_result_';
        if (isNaN(winAmount)) {
          anim += 'nobet_';
        } else {
          anim += 'win_loss_';
        }
        anim += `${colorMap[we.ro.RACETRACK_COLOR[numLeft]]}${colorMap[we.ro.RACETRACK_COLOR[numCenter]]}${colorMap[we.ro.RACETRACK_COLOR[numRight]]}`;
        logger.l(anim, numLeft, numCenter, numRight);

        const array = [['L_txt', 60, numLeft, 90], ['middle_txt', 90, numCenter, 90], ['L_txt3', 60, numRight, 90]];

        for (const [slotName, fontSize, text, rotate] of array) {
          const slot = this._display.armature.getSlot(<string> slotName);
          const lbl = new eui.Label();
          lbl.text = <string> text;
          lbl.fontFamily = 'Barlow';
          lbl.size = <number> fontSize;
          lbl.anchorOffsetX = lbl.width / 2;
          lbl.anchorOffsetY = lbl.height / 2;
          lbl.rotation = rotate as number;
          const layer = new eui.Group();
          layer.addChild(lbl);
          slot.display = layer;
        }

        const slot = this._display.armature.getSlot('-800');
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
