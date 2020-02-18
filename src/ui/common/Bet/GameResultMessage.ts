namespace we {
  export namespace ui {
    export class GameResultMessage extends core.BaseEUI {
      protected _bg: eui.Image;
      protected _label: eui.IDisplayText & egret.DisplayObject;
      protected _numlabel: eui.IDisplayText & egret.DisplayObject;

      protected _isAnimating: boolean;

      private _display: dragonBones.EgretArmatureDisplay = null;

      public duration: number = 1600;

      public constructor() {
        super();
        this.visible = true;
        this._isAnimating = false;
        // this.skinName = 'GameResultNormalSkin';
      }

      public showResult(gameType: core.GameType, winType: number, winAmount: number = NaN) {
        if (!this._display) {
          const skeletonData = RES.getRes('baccarat_game_result_ske_json');
          const textureData = RES.getRes('baccarat_game_result_tex_json');
          const texture = RES.getRes('baccarat_game_result_tex_png');
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._display = factory.buildArmatureDisplay('armatureName');
          this._display.x = this.width / 2;
          this._display.y = this.height / 2;
          this.addChild(this._display);
        }

        // const isWin = !isNaN(winAmount) && winAmount > 0;
        // const background = this.getBackground(gameType, winType, isWin);
        // egret.Tween.removeTweens(this);
        // this.changeSkin(isWin);
        // if (this._bg) {
        //   this.setBackground(gameType, winType, isWin);
        // }
        // this.start(gameType, winType, winAmount);
        this.startDragonBoneAnim(gameType, winType, winAmount);
      }

      // protected changeSkin(isWin: boolean) {
      //   if (isWin) {
      //     this.skinName = utils.getSkinByClassname('GameResultWinSkin');
      //   } else {
      //     this.skinName = utils.getSkinByClassname('GameResultNormalSkin');
      //   }
      //   this.anchorOffsetX = this.width * 0.5;
      //   this.anchorOffsetY = this.height * 0.5;
      // }

      protected setBackground(gameType: core.GameType, winType: number, isWin: boolean) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
            switch (winType) {
              case ba.WinType.BANKER:
                this.setBackgroundImage('red', isWin);
                break;
              case ba.WinType.PLAYER:
                this.setBackgroundImage('blue', isWin);
                break;
              case ba.WinType.TIE:
                this.setBackgroundImage('green', isWin);
                break;
            }
            break;
          case core.GameType.DT:
            switch (winType) {
              case dt.WinType.DRAGON:
                this.setBackgroundImage('blue', isWin);
                break;
              case dt.WinType.TIGER:
                this.setBackgroundImage('red', isWin);
                break;
              case dt.WinType.TIE:
                this.setBackgroundImage('green', isWin);
                break;
            }
            break;
        }
      }

      protected getBackground(gameType: core.GameType, winType: number, isWin: boolean) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
            switch (winType) {
              case ba.WinType.BANKER:
                return 'r';
              case ba.WinType.PLAYER:
                return 'b';
              case ba.WinType.TIE:
                return 'g';
              default:
                return null;
            }
          case core.GameType.DT:
            switch (winType) {
              case dt.WinType.DRAGON:
                return 'b';
              case dt.WinType.TIGER:
                return 'r';
              case dt.WinType.TIE:
                return 'g';
              default:
                return null;
            }
          default:
            return null;
        }
      }

      protected setBackgroundImage(type: string, isWin: boolean) {
        switch (type) {
          case 'red':
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_bankerelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_bankerwin_png';
            }
            break;
          case 'blue':
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_playerelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_playerwin_png';
            }
            break;
          case 'green':
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_tieelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_tie_png';
            }
            break;
        }
      }

      public clearMessage() {
        egret.Tween.removeTweens(this);
        this._isAnimating = false;
        this.visible = true;
      }

      protected start(gameType: core.GameType, winType: number, winAmount: number) {
        egret.Tween.removeTweens(this);
        this._isAnimating = true;
        if (this._numlabel) {
          this._numlabel.text = ``;
          this._numlabel.visible = false;
        }
        const tween = egret.Tween.get(this)
          .call(() => {
            const message: string = i18n.t(utils.getWinMessageKey(gameType, winType));
            this.visible = true;
            this._label.visible = true;
            this._label.text = message;
          })
          .wait(this.duration);
        if (!isNaN(winAmount)) {
          tween
            .call(() => {
              const numStr: string = utils.formatNumber(winAmount, true);
              if (this._numlabel) {
                this._numlabel.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
                this._numlabel.visible = true;
                this._label.visible = false;
              } else {
                this._label.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
              }
            })
            .wait(this.duration);
        } else {
          tween.wait(this.duration);
        }
        tween.call(() => {
          this._isAnimating = false;
          this.visible = false;
        });
      }

      protected startDragonBoneAnim(gameType: core.GameType, winType: number, winAmount: number) {
        const isWin = !isNaN(winAmount) && winAmount > 0;
        const background = this.getBackground(gameType, winType, isWin);

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );
        this._display.animation.play('ani_result_win_b', 1);
      }
    }
  }
}
