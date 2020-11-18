namespace we {
  export namespace dil {
    export class LuckyCoinGroup extends core.BaseGamePanel {
      protected gameData: we.dil.GameData;

      protected animXArr;
      protected animYArr;

      protected _displays: dragonBones.EgretArmatureDisplay[];
      protected _factory: dragonBones.EgretFactory;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected destroy() {
        this.clearAnim();
        if (this._factory) this._factory.clear(true);
        super.destroy();
      }

      public clearAnim() {
        if (this._displays) {
          for (const display of this._displays) {
            if (display.animation) {
              display.animation.stop();
            }
            display.armature.dispose();
            display.dispose();
            
            if (display.parent) {
              display.parent.removeChild(display);
            }
          }
          this._displays = null;
        }
      }

      protected setAnimPositionVer(no: number) {
        if (env.orientation === 'portrait') {
          switch (no) {
            case 1:
              this.animXArr = [484];
              this.animYArr = [727];
              break;
            case 2:
              this.animXArr = [323, 647];
              this.animYArr = [727, 727];
              break;
            case 3:
              this.animXArr = [484, 808, 162];
              this.animYArr = [727, 727, 727];
              break;
          }
        } else {
          switch (no) {
            case 1:
              this.animXArr = [2028];
              this.animYArr = [148];
              break;
            case 2:
              this.animXArr = [2028, 2028];
              this.animYArr = [410, 148];
              break;
            case 3:
              this.animXArr = [2028, 2028, 2028];
              this.animYArr = [410, 148, 670];
              break;
          }
        }
      }

      protected createLuckyCoinAnim() {
        if (!this._factory) {
          const skeletonData = RES.getRes(`dice_w_game_result_ske_json`);
          const textureData = RES.getRes(`dice_w_game_result_tex_json`);
          const texture = RES.getRes(`dice_w_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._factory = factory;
        }
        if (env.orientation === 'portrait') {
          return this._factory.buildArmatureDisplay('draw_number_effect_vertical');
        } else {
          return this._factory.buildArmatureDisplay('draw_number_effect_horizontal');
        }
      }

      public updateLuckyNumbers(gameData: data.GameData, chipLayer: ui.ChipLayer) {
        this.gameData = <dil.GameData> gameData;
        this.clearAnim();

        if (!(this.gameData && this.gameData.luckynumber)) {
          return;
        }

        const luckyNumbers = this.gameData.luckynumber;
        const noOfLuckNum = Object.keys(luckyNumbers).length > 3 ? 3 : Object.keys(luckyNumbers).length;
        this.setAnimPositionVer(noOfLuckNum);

        let no = 0;
        this._displays = [];

        for (const key of Object.keys(luckyNumbers)) {
          const animName = this.getAnimName(+key);

          const coinAnim = this.createLuckyCoinAnim();
          utils.dblistenToSoundEffect(coinAnim);
          coinAnim.x = this.animXArr[no];
          if (env.orientation === 'portrait' && env.isBottomPanelOpen === false) {
            coinAnim.y = this.animYArr[no] + 530;
          } else {
            coinAnim.y = this.animYArr[no];
          }
          coinAnim.scaleX = 1;
          coinAnim.scaleY = 1;
          no += 1;

          const oddSlot = coinAnim.armature.getSlot(`${animName}_odds`);
          oddSlot.display = this.getOddSlotGroup(luckyNumbers[key]);

          const numberSlot = coinAnim.armature.getSlot(`${animName}_number`);
          numberSlot.display = this.getNumberSlotGroup(+key);

          coinAnim.visible = false;
          this.addChild(coinAnim);
          this._displays.push(coinAnim);

          if (!chipLayer) {
            return;
          }

          const betDetails = chipLayer.getConfirmedBetDetails();

          if (betDetails) {
            betDetails.map((detail, index) => {
              if (!detail || !detail.field || !detail.amount) {
                return;
              }

              const f = this.fieldToValue(detail.field);

              if (key === f) {
                // const chipSlot = coinAnim.armature.getSlot('chips');
                // chipSlot.display = this.getChipSlotGroup(detail.amount / 100);
                // noBet = '';
              }
            });
          }

          (async () => {
            await we.utils.sleep(400);

            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_in`, 1);
              coinAnim.visible = true;
              await p;
            }
            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_loop`, 4);
              await p;
            }
            if (coinAnim.animation) {
              let p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_out`, 1);
              await p;
            }

            this.clearAnim();
          })();
        }
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

      protected fieldToValue(fieldName: string) {
        if (!fieldName) {
          return null;
        }
        if (fieldName.indexOf('SUM_') === -1) {
          return null;
        }
        const result = fieldName.split('SUM_');
        if (result && result[1]) {
          return result[1];
        }
        return null;
      }

      public getAnimName(sum: number) {
        let animName;
        if (sum <= 10) {
          const firstPart = sum;
          const secondPart = 21 - sum;
          animName = `${firstPart}_${secondPart}`;
        } else {
          const firstPart = 21 - sum;
          const secondPart = sum;
          animName = `${firstPart}_${secondPart}`;
        }
        return animName;
      }
    }
  }
}
