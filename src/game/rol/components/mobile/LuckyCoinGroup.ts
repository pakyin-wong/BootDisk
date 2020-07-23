namespace we {
  export namespace rol {
    export class LuckyCoinGroup extends core.BaseGamePanel {
      protected _chipLayer: we.rol.MobileChipLayer;

      protected animArr;

      protected coinAnim1;
      protected coinAnim2;
      protected coinAnim3;
      protected coinAnim4;
      protected coinAnim5;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.animArr = [this.coinAnim1, this.coinAnim2, this.coinAnim3, this.coinAnim4, this.coinAnim5];
      }

      protected setAnimPositionVer(no: number) {
        if (env.orientation === 'portrait') {
          switch (no) {
            case 1:
              this.coinAnim1.x = 930;
              this.coinAnim1.y = 1177;
              break;
            case 2:
              this.coinAnim1.x = 831;
              this.coinAnim1.y = 1177;
              this.coinAnim2.x = 1027;
              this.coinAnim2.y = 1177;
              break;
            case 3:
              this.coinAnim1.x = 831;
              this.coinAnim1.y = 989;
              this.coinAnim2.x = 1027;
              this.coinAnim2.y = 989;
              this.coinAnim3.x = 917;
              this.coinAnim3.y = 1363;
              break;
            case 4:
              this.coinAnim1.x = 831;
              this.coinAnim1.y = 989;
              this.coinAnim2.x = 1027;
              this.coinAnim2.y = 989;
              this.coinAnim3.x = 831;
              this.coinAnim3.y = 1363;
              this.coinAnim4.x = 1027;
              this.coinAnim4.y = 1363;
              break;
            case 5:
              this.coinAnim1.x = 831;
              this.coinAnim1.y = 796;
              this.coinAnim2.x = 1027;
              this.coinAnim2.y = 796;
              this.coinAnim3.x = 831;
              this.coinAnim3.y = 1170;
              this.coinAnim4.x = 1027;
              this.coinAnim4.y = 1170;
              this.coinAnim5.x = 917;
              this.coinAnim5.y = 1544;
              break;
          }
        } else {
          switch (no) {
            case 1:
              this.coinAnim1.x = 1841;
              this.coinAnim1.y = 779;
              break;
            case 2:
              this.coinAnim1.x = 1741;
              this.coinAnim1.y = 779;
              this.coinAnim2.x = 1942;
              this.coinAnim2.y = 779;
              break;
            case 3:
              this.coinAnim1.x = 1640;
              this.coinAnim1.y = 779;
              this.coinAnim2.x = 1841;
              this.coinAnim2.y = 779;
              this.coinAnim3.x = 2042;
              this.coinAnim3.y = 779;
              break;
            case 4:
              this.coinAnim1.x = 1738;
              this.coinAnim1.y = 471;
              this.coinAnim2.x = 1939;
              this.coinAnim2.y = 471;
              this.coinAnim3.x = 1738;
              this.coinAnim3.y = 837;
              this.coinAnim4.x = 1939;
              this.coinAnim4.y = 837;
              break;
            case 5:
              this.coinAnim1.x = 1640;
              this.coinAnim1.y = 471;
              this.coinAnim2.x = 1841;
              this.coinAnim2.y = 471;
              this.coinAnim3.x = 2042;
              this.coinAnim3.y = 471;
              this.coinAnim4.x = 1738;
              this.coinAnim4.y = 837;
              this.coinAnim5.x = 1939;
              this.coinAnim5.y = 837;
              break;
          }
        }
      }

      protected createLuckyCoinAnim() {
        const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
        const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
        const texture = RES.getRes(`roulette_w_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        if (env.orientation === 'portrait') {
          return factory.buildArmatureDisplay('Draw_Number_Effect_Vertical');
        } else {
          return factory.buildArmatureDisplay('Draw_Number_Effect_Horizontal');
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

      public updateLuckyNumbers() {
        this.removeChildren();

        if (!(this.tableInfo && this.tableInfo.data && this.tableInfo.data.luckynumber)) {
          return;
        }

        const luckyNumbers = this.tableInfo.data.luckynumber;
        const noOfLuckNum = Object.keys(luckyNumbers).length;

        // 18 = 668 - 5 * 112
        // let x = (668 - (noOfLuckNum - 1) * 18 - noOfLuckNum * 112) / 2;
        const x = 0;
        const y = 0;

        for (const key of Object.keys(luckyNumbers)) {
          const coinAnim = this.createLuckyCoinAnim();
          coinAnim.x = x;
          coinAnim.y = y;
          coinAnim.width = 171;
          coinAnim.height = 344;
          // x += 130; // 112 + 18

          const oddSlot = coinAnim.armature.getSlot('Odd');
          oddSlot.display = this.getOddSlotGroup(luckyNumbers[key]);

          const numberSlot = coinAnim.armature.getSlot('Number');
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
              color = 'Green';
              break;
            case we.ro.Color.RED:
              color = 'Red';
              break;
            case we.ro.Color.BLACK:
            default:
              color = 'Black';
          }

          this.addChild(coinAnim);

          (async () => {
            let p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Draw_Number_${color}${noBet}_in`, 1);
            await p;

            p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Draw_Number_${color}${noBet}_loop`, 4);
            await p;

            p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Draw_Number_${color}${noBet}_out`, 1);
            await p;
          })();

          we.utils.sleep(250);
        }
      }

      public clearLuckyNumbers() {
        this.removeChildren();
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
