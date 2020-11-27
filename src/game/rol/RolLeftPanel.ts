namespace we {
  export namespace rol {
    export class RolLeftPanel extends ro.RoLeftPanel {
      protected pageRadioBtn4: eui.RadioButton;
      protected _coinGroup: eui.Group;

      protected _factory: dragonBones.EgretFactory;
      protected _displays: dragonBones.EgretArmatureDisplay[];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RolLeftPanel');
      }

      protected setRadioButtons() {
        this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3, this.pageRadioBtn4];
      }

      public changeLang() {
        super.changeLang();
        this.pageRadioBtn4['labelDisplayDown']['text'] = this.pageRadioBtn4['labelDisplayUp']['text'] = i18n.t('roulette.luckyNumber');
      }

      protected init() {
        super.init();
        this.pageRadioBtn4.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      protected createLuckyCoinAnim() {
        if (!this._factory) {
          const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
          const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
          const texture = RES.getRes(`roulette_w_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._factory = factory;
        }
        return this._factory.buildArmatureDisplay('draw_number_effect');
      }

      protected getOddSlotGroup(odd: number) {
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.text = odd.toString() + 'x';
        label.size = 50;
        label.textColor = 0x2ab9c6;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.width = 112;
        label.anchorOffsetX = 56;
        label.anchorOffsetY = 15;

        const group = new eui.Group();
        group.addChild(label);

        return group;
      }

      protected getNumberSlotGroup(num: number) {
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.text = num.toString();
        label.size = 120;
        label.textColor = 0x2ab9c6;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.width = 300;
        label.anchorOffsetX = 150;
        label.anchorOffsetY = 40;
        label.bold = true;
        const color: number = 0x33ccff;
        const alpha: number = 0.8;
        const blurX: number = 35;
        const blurY: number = 35;
        const strength: number = 2;
        const quality: number = egret.BitmapFilterQuality.HIGH;
        const inner: boolean = false;
        const knockout: boolean = false;
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        label.filters = [glowFilter];

        const group = new eui.Group();
        group.addChild(label);

        return group;
      }

      protected getChipSlotGroup(amount) {
        const coin = new LuckyCoin();

        coin.anchorOffsetX = 90;
        coin.anchorOffsetY = 90;
        coin.amount = amount;
        coin.height = 180;
        coin.width = 180;

        const group = new eui.Group();
        group.addChild(coin);

        return group;
      }

      public updateLuckyNumbers() {
        this._coinGroup.removeChildren();

        if (!(this.tableInfo && this.tableInfo.data && this.tableInfo.data.luckynumber)) {
          return;
        }

        const luckyNumbers = this.tableInfo.data.luckynumber;
        const noOfLuckNum = Object.keys(luckyNumbers).length;

        // 18 = 668 - 5 * 112
        let x = (668 - (noOfLuckNum - 1) * 18 - noOfLuckNum * 112) / 2;

        this._displays = [];

        for (const key of Object.keys(luckyNumbers)) {
          const coinAnim = this.createLuckyCoinAnim();
          utils.dblistenToSoundEffect(coinAnim);
          coinAnim.x = x;
          coinAnim.y = 10;
          coinAnim.width = 112;
          coinAnim.height = 226;
          x += 130; // 112 + 18

          const oddSlot = coinAnim.armature.getSlot('odds');
          oddSlot.display = this.getOddSlotGroup(luckyNumbers[key]);

          const numberSlot = coinAnim.armature.getSlot('number');
          numberSlot.display = this.getNumberSlotGroup(+key);

          let noBet = '_nobet';

          if (this._chipLayer) {
            const betDetails = this._chipLayer.getConfirmedBetDetails();
            if (betDetails) {
              betDetails.map((detail, index) => {
                if (detail && detail.field && detail.amount) {
                  const f = this.fieldToValue(detail.field);
                  if (key === f) {
                    const chipSlot = coinAnim.armature.getSlot('chips');
                    chipSlot.display = this.getChipSlotGroup(detail.amount / 100);
                    noBet = '';
                  }
                }
              });
            }
          }

          let color: string;

          switch (we.ro.RACETRACK_COLOR[+key]) {
            case we.ro.Color.GREEN:
              color = 'green';
              break;
            case we.ro.Color.RED:
              color = 'red';
              break;
            case we.ro.Color.BLACK:
            default:
              color = 'black';
          }

          coinAnim.visible = false;
          this._coinGroup.addChild(coinAnim);

          this._displays.push(coinAnim);

          (async () => {
            await we.utils.sleep(1000);

            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`draw_number_${color}${noBet}_in`, 1);
              coinAnim.visible = true;
              await p;
            }
            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`draw_number_${color}${noBet}_loop`, 4);
              await p;
            }
            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`draw_number_${color}${noBet}_out`, 1);
              await p;
            }

            coinAnim.animation.stop();
          })();
        }
      }

      public destroy() {
        this.clearLuckyNumbers();
        if (this._factory) this._factory.clear(true);
        super.destroy();
      }

      public clearLuckyNumbers() {
        if (this._displays) {
          for (const display of this._displays) {
            if (display) {
              if (display.animation) {
                display.animation.stop();
              }
              dragonBones.WorldClock.clock.remove(display.armature);
              display.armature.dispose();
              display.dispose();
              if (display.parent) {
                display.parent.removeChild(display);
              }
            }
          }
          this._displays = null;
        }
      }

      protected fieldToValue(fieldName: string) {
        if (!fieldName) {
          return null;
        }
        if (fieldName.indexOf('DIRECT_') === -1) {
          return null;
        }
        const result = fieldName.split('DIRECT_');
        if (result && result[1]) {
          return result[1];
        }
        return null;
      }
    }
  }
}
