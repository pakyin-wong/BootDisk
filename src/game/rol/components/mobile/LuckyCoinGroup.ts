namespace we {
  export namespace rol {
    export class LuckyCoinGroup extends core.BaseGamePanel {
      // protected _chipLayer: ui.ChipLayer;
      protected gameData: we.rol.GameData;

      public isLuckyNo: boolean = false;

      protected animXArr;
      protected animYArr;

      protected _factory: dragonBones.EgretFactory;
      protected _displays: dragonBones.EgretArmatureDisplay[];

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected setAnimPositionVer(no: number) {
        if (env.orientation === 'portrait') {
          switch (no) {
            case 1:
              this.animXArr = [930];
              this.animYArr = [1177];
              break;
            case 2:
              this.animXArr = [831, 1027];
              this.animYArr = [1177, 1177];
              break;
            case 3:
              this.animXArr = [831, 1027, 917];
              this.animYArr = [989, 989, 1363];
              break;
            case 4:
              this.animXArr = [831, 1027, 831, 1027];
              this.animYArr = [989, 989, 1363, 1363];
              break;
            case 5:
              this.animXArr = [831, 1027, 831, 1027, 917];
              this.animYArr = [796, 796, 1170, 1170, 1544];
              break;
          }
        } else {
          switch (no) {
            case 1:
              this.animXArr = [1841];
              this.animYArr = [779];
              break;
            case 2:
              this.animXArr = [1741, 1942];
              this.animYArr = [779, 779];
              break;
            case 3:
              this.animXArr = [1640, 1841, 2042];
              this.animYArr = [779, 779, 779];
              break;
            case 4:
              this.animXArr = [1738, 1939, 1738, 1939];
              this.animYArr = [471, 471, 837, 837];
              break;
            case 5:
              this.animXArr = [1640, 1841, 2042, 1738, 1939];
              this.animYArr = [471, 471, 471, 837, 837];
              break;
          }
        }
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
        if (env.orientation === 'portrait') {
          return this._factory.buildArmatureDisplay('draw_number_effect_vertical');
        } else {
          return this._factory.buildArmatureDisplay('draw_number_effect_horizontal');
        }
      }

      protected destroy() {
        this.clearAnim();
        if (this._factory) this._factory.clear(true);
        super.destroy();
      }

      public clearAnim() {
        if (this._displays) {
          for (const display of this._displays) {
            // if (display) {
              if (display.animation) {
                display.animation.stop();
              }
              display.armature.dispose();
              display.dispose();
              if (display.parent) {
                display.parent.removeChild(display);
              }
            }
          // }
          this._displays = null;
        }
      }
      

      protected getOddSlotGroup(odd: number) {
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.text = odd.toString() + 'x';
        label.size = 50;
        label.textColor = 0x80fbfd;
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
        label.textColor = 0x80fbfd;
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

      public updateLuckyNumbers(gameData: data.GameData, chipLayer: ui.ChipLayer) {
        this.gameData = <rol.GameData> gameData;
        this.clearAnim();

        if (!(this.gameData && this.gameData.luckynumber)) {
          this.isLuckyNo = false;
          return;
        }

        this.isLuckyNo = true;
        const luckyNumbers = this.gameData.luckynumber;
        const noOfLuckNum = Object.keys(luckyNumbers).length;
        this.setAnimPositionVer(noOfLuckNum);

        let no = 0;

        this._displays = [];

        for (const key of Object.keys(luckyNumbers)) {
          const coinAnim = this.createLuckyCoinAnim();
          utils.dblistenToSoundEffect(coinAnim);
          coinAnim.x = this.animXArr[no];
          coinAnim.y = this.animYArr[no];
          coinAnim.scaleX = 0.8;
          coinAnim.scaleY = 0.8;
          no += 1;

          const oddSlot = coinAnim.armature.getSlot('odds');
          oddSlot.display = this.getOddSlotGroup(luckyNumbers[key]);

          const numberSlot = coinAnim.armature.getSlot('number');
          numberSlot.display = this.getNumberSlotGroup(+key);

          let noBet = '_nobet';

          if (chipLayer) {
            const betDetails = chipLayer.getConfirmedBetDetails();
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
          this.addChild(coinAnim);

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

            this.clearAnim();
          })();
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
