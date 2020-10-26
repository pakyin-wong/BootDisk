// TypeScript file
namespace we {
  export namespace lo {
    export class SSCMobileBallRowInput extends AInputComponent {
      private _bg: ui.RoundRectShape;
      private _title: ui.RunTimeLabel;
      private _ballsGroup: eui.Group;
      private _content: eui.Group;

      private _optionPanel: SSCTraditionalBettingOptionButtonRow;

      //   private _randomPanel: SSCTraditionalBettingRandomPanel;
      private _balls: SSCBallButton[];

      private _optionMenu: eui.Group;
      private _top: eui.Group;
      private _separateLine: eui.Rect;

      constructor(index: number, config: any) {
        super(index, config);

        this.initSkin();
        this.init();
      }

      protected initSkin() {
        switch (this._config.theme) {
          case InputComponentTheme.ROW:
          case InputComponentTheme.ROW_WITH_OPTION:
          case InputComponentTheme.ROWS:
            this.skinName = 'skin_mobile.lo.SSCBallButtonRow';
            break;
        }
      }

      protected init() {
        this._data = '';
        this._balls = [];

        if (this._config.title && this._title) {
          this._title.renderText = () => `${i18n.t('lo_trad.inputTitle.' + this._config.title)}`;
        } else {
          if (this._title) {
            this._title.renderText = () => `${''}`;
          }
        }

        for (let i = 0; i < this._config.data.length; i++) {
          const ball = new SSCBallButton(this._config.data[i]);
          ball.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallClicked, this);
          this._balls.push(ball);
          this._ballsGroup.addChild(ball);
        }

        if (this._config.theme === InputComponentTheme.ROW_WITH_OPTION) {
          this._optionPanel = new SSCTraditionalBettingOptionButtonRow();
          for (let i = 0; i < this._optionPanel._buttonGroup.numChildren; i++) {
            this._optionPanel._buttonGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionMenuClicked, this);
          }
          this._optionMenu.addChild(this._optionPanel);
        }

        if (this._config.theme !== InputComponentTheme.ROW_WITH_OPTION && !this._config.title) {
          this._top.height = 0;
          this._separateLine.height = 0;
        }
        this._bg.height = this._content.height;
        this._bg.refresh();
      }

      protected onOptionMenuClicked(e: egret.TouchEvent) {
        switch (e.target) {
          case this._optionPanel._allButton:
            for (let i = 0; i < this._balls.length; i++) {
              (this._balls[i] as SSCBallButton).toggleActive(true);
            }
            break;
          case this._optionPanel._oddButton:
            for (let i = 0; i < this._balls.length; i++) {
              if (Math.abs(parseInt(this._balls[i].betValue, 10) % 2) === 1) {
                (this._balls[i] as SSCBallButton).toggleActive(true);
              } else {
                (this._balls[i] as SSCBallButton).toggleActive(false);
              }
            }
            break;
          case this._optionPanel._evenButton:
            for (let i = 0; i < this._balls.length; i++) {
              if (parseInt(this._balls[i].betValue, 10) % 2 === 0) {
                (this._balls[i] as SSCBallButton).toggleActive(true);
              } else {
                (this._balls[i] as SSCBallButton).toggleActive(false);
              }
            }
            break;
          case this._optionPanel._bigButton:
            for (let i = 0; i < this._balls.length; i++) {
              if (i <= this._balls.length / 2 - 1) {
                (this._balls[i] as SSCBallButton).toggleActive(false);
              } else {
                (this._balls[i] as SSCBallButton).toggleActive(true);
              }
            }
            break;
          case this._optionPanel._smallButton:
            for (let i = 0; i < this._balls.length; i++) {
              if (i <= this._balls.length / 2 - 1) {
                (this._balls[i] as SSCBallButton).toggleActive(true);
              } else {
                (this._balls[i] as SSCBallButton).toggleActive(false);
              }
            }
            break;
          case this._optionPanel._clearButton:
            for (let i = 0; i < this._balls.length; i++) {
              (this._balls[i] as SSCBallButton).toggleActive(false);
            }
            break;
        }
        this.updateData();
      }

      protected onBallClicked(e: egret.TouchEvent) {
        (e.target as SSCBallButton).toggleActive();
        this.updateData();
      }

      protected updateText() {
        if (this._config.title && this._title) {
          this._title.renderText = () => `${i18n.t('lo_trad.inputTitle.' + this._config.title)}`;
        } else {
          this._title.renderText = () => '';
        }

        if (this._optionPanel) {
          this._optionPanel.updateText();
        }
      }

      protected updateData() {
        this._data = '';

        switch (this._config.dataType) {
          case InputDataType.STRING:
            for (let i = 0; i < this._balls.length; i++) {
              if (this._balls[i].isActive) {
                this._data += this._balls[i].betValue;
              }
            }
            break;
          case InputDataType.SEPARATOR:
            for (let i = 0; i < this._balls.length; i++) {
              if (this._balls[i].isActive) {
                if (this._data === '') {
                  this._data += this._balls[i].betValue;
                } else {
                  this._data += '|' + this._balls[i].betValue;
                }
                // if (i === this._balls.length - 1) {
                // this._data += this._balls[i].betValue;
                // } else {
                // this._data += this._balls[i].betValue + '|';
                // }
              }
            }
            break;
          case InputDataType.ARRAY:
            this._data = [];
            for (let i = 0; i < this._balls.length; i++) {
              if (this._balls[i].isActive) {
                this._data.push(this._balls[i].betValue);
              }
            }
            break;
        }
        this.dispatchEventWith(egret.Event.CHANGE, false, { index: this._index, data: this._data });
      }
    }
  }
}
