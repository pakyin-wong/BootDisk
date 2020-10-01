// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingPanel extends ABettingPanel {
      // control by scene
      protected _buttonGroup: eui.Group;

      protected _bigTagsGroup: eui.Group;
      protected _smallTagsGroup: eui.Group;

      protected bigTagsArray: any[] = [];
      protected smallTagsArray: any[] = [];

      protected bigTagNames: ui.RunTimeLabel[];
      protected smallTagNames: ui.RunTimeLabel[];
      // private currentBetTable;

      protected _buttons;

      private _multipleGroup: eui.Group;
      private _imgMultiple: ui.RoundRectShape;
      private _multipleValue: number;
      private _lblMultipleValue: ui.RunTimeLabel;
      private _lblMultipleTitle: ui.RunTimeLabel;
      private _buttonAdd;
      private _buttonMinus;

      private _dollarGroup: eui.Group;
      private _dollarValue: number;
      private _lblDollar: ui.RunTimeLabel;

      private _winInstructGroup: eui.Group;
      private _lblwinInstruct: ui.RunTimeLabel;

      protected _lblCurrentRound: ui.RunTimeLabel;
      protected _lblCurrentRoundState: ui.RunTimeLabel;

      protected _lblPrevRound: ui.RunTimeLabel;
      protected _lblLastRound: ui.RunTimeLabel;

      protected _lblResultBall0: ui.RunTimeLabel;
      protected _lblResultBall1: ui.RunTimeLabel;
      protected _lblResultBall2: ui.RunTimeLabel;
      protected _lblResultBall3: ui.RunTimeLabel;
      protected _lblResultBall4: ui.RunTimeLabel;

      protected _lblLastBall0: ui.RunTimeLabel;
      protected _lblLastBall1: ui.RunTimeLabel;
      protected _lblLastBall2: ui.RunTimeLabel;
      protected _lblLastBall3: ui.RunTimeLabel;
      protected _lblLastBall4: ui.RunTimeLabel;

      protected _lblPrevBall0: ui.RunTimeLabel;
      protected _lblPrevBall1: ui.RunTimeLabel;
      protected _lblPrevBall2: ui.RunTimeLabel;
      protected _lblPrevBall3: ui.RunTimeLabel;
      protected _lblPrevBall4: ui.RunTimeLabel;

      constructor(skin: string = null) {
        super(skin);
        this._currentKey = 'lo';
        this._currentMap = we[this._currentKey].SelectionMapping;
        this.initSkin();
      }

      protected initSkin() {
        this.skinName = 'skin_desktop.lo.SSCTraditionalBettingPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.initComponents();
      }

      protected mount() {}

      protected initComponents() {
        super.initComponents();
        this.createBigTags();
        // this.createSmallTags();
        // this.initCurrentButtonPanel();
      }

      public onInputChanged() {
        super.onInputChanged();
      }

      // Big Tags Related
      protected createBigTags() {
        this.bigTagsArray = [];
        this._currentBigTagIndex = 0;
        this.bigTagNames = [];

        for (let i = 0; i < Object.keys(this._currentMap).length; i++) {
          const obj = this._currentMap[Object.keys(this._currentMap)[i]];

          const bigTagGroup: eui.Group = new eui.Group();
          bigTagGroup.width = 107.7;
          bigTagGroup.height = 60;
          // bigTagGroup.name = obj.name;
          bigTagGroup.touchEnabled = true;
          bigTagGroup.touchChildren = true;

          const bigTag: ui.RoundRectButton = new ui.RoundRectButton();
          bigTag.width = 107.7;
          bigTag.height = 60;
          bigTag.cornerTL_TR_BL_BR = '0,0,0,0';
          bigTag.stroke = 1;
          bigTag.fillAlpha = 0;
          bigTag.strokeColor = 0x303749;

          bigTag.strokeAlpha_click = 1;
          bigTag.strokeColor_click = 0x303749;
          bigTag.stroke_click = 2;
          bigTag.fillAlpha_click = 0.4;
          bigTag.fillColor_click = '0x4C586E';

          bigTag.stroke_active = 1;
          bigTag.strokeColor_active = 0x214a72;
          bigTag.strokeAlpha_active = 1;
          bigTag.fillAlpha_active = 1;
          bigTag.fillColor_active = '0x1b416e';

          bigTag.strokeAlpha_hover = 1;
          bigTag.strokeColor_hover = 0x303749;
          bigTag.stroke_hover = 2;
          bigTag.fillAlpha_hover = 0.2;
          bigTag.fillColor_hover = '0x4C586E';

          bigTag.name = obj.name;
          bigTag.touchEnabled = true;
          bigTag.touchChildren = false;
          bigTagGroup.addChild(bigTag);

          const lbl: ui.RunTimeLabel = new ui.RunTimeLabel();
          lbl.renderText = () => `${i18n.t('lo_trad.bigTag.' + bigTag.name)}`;
          // lbl.text = obj['name'];
          lbl.size = 20;
          lbl.textAlign = 'center';
          lbl.verticalAlign = 'middle';
          lbl.width = 107.7;
          lbl.height = 60;
          lbl.touchEnabled = false;
          bigTagGroup.addChild(lbl);
          this.bigTagNames.push(lbl);

          this.bigTagsArray.push(bigTag);
          this._bigTagsGroup.addChild(bigTagGroup);
          this._bigTagsGroup.touchChildren = true;
          bigTagGroup.x = i * bigTagGroup.width;
          bigTagGroup.y = 0;
          utils.addButtonListener(bigTag, this.onBigTagClicked, this);
          // bigTag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBigTagClicked, this);
        }

        this.setActiveBigTag();
        this.createSmallTags();
      }

      protected setActiveBigTag() {
        this.clearSmallTags();
        for (let i = 0; i < this.bigTagsArray.length; i++) {
          // const img = this.bigTagsArray[i].getChildAt(0) as eui.Image;
          // img.source = ImageMapping.BIGTAG_NORMAL;
          this.bigTagsArray[i].active = false;

          if (i === this._currentBigTagIndex) {
            this.bigTagsArray[i].active = true;
            // img.source = ImageMapping.BIGTAG_ACTIVE;
          }
        }
      }

      protected onBigTagClicked(e) {
        for (let i = 0; i < this.bigTagsArray.length; i++) {
          if (e.target === this.bigTagsArray[i]) {
            if (i === this._currentBigTagIndex) {
              return;
            }
            this._currentBigTagIndex = i;
            break;
          }
        }
        this.setActiveBigTag();
        this.createSmallTags();
      }
      // End of Big Tags related

      // Small Tags related
      protected createSmallTags() {
        // this.clearSmallTags();
        this.smallTagsArray = [];
        this.smallTagNames = [];
        const currentBigTag = this._currentMap[Object.keys(this._currentMap)[this._currentBigTagIndex]];
        const smallTagsHeight = 57;
        const lastRowItemIndex = -1;
        const offset = 0;
        for (let i = 0; i < Object.keys(currentBigTag['type']).length; i++) {
          const currentSmallTag = currentBigTag['type'][Object.keys(currentBigTag['type'])[i]];
          const smallTag = new eui.Group();
          //  smallTag.width = env.language === 'en'? SmallTags.LABELWIDTH_EN + 40 : SmallTags.LABELWIDTH_CN + 40;
          // smallTag.width = env.language === 'en' ? SmallTags.LABELWIDTH_EN : SmallTags.LABELWIDTH_EN;
          smallTag.height = 57;
          smallTag.touchEnabled = true;
          smallTag.touchChildren = false;

          const lbl = new ui.RunTimeLabel();
          lbl.renderText = () => `${i18n.t('lo_trad.smallTag.' + currentSmallTag['name'])}`;
          // lbl.text = currentSmallTag['name'];
          lbl.alpha = 0.7;
          lbl.textAlign = 'center';
          lbl.verticalAlign = 'middle';

          // lbl.width = env.language === 'en'? SmallTags.LABELWIDTH_EN : SmallTags.LABELWIDTH_CN;
          lbl.width = env.language === 'en' ? SmallTags.LABELWIDTH_EN : SmallTags.LABELWIDTH_EN;
          lbl.height = 57;
          lbl.size = 18;
          this.smallTagNames.push(lbl);

          smallTag.addChild(lbl);
          this._smallTagsGroup.addChild(smallTag);
          this.smallTagsArray.push(smallTag);
          smallTag.x = 24 + offset + i * smallTag.width;
          smallTag.y = 0;
          utils.addButtonListener(smallTag, this.onSmallTagClicked, this);
          // smallTag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSmallTagClicked, this);

          // if (currentBigTag['seperateLine']) {
          //   for (let k = 0; k < currentBigTag['seperateLine'].length; k++) {
          //     if (currentBigTag.seperateLine[k] === i) {
          //       const shape = new egret.Shape();
          //       shape.x = offset + 40 + (i + 1) * smallTag.width;
          //       shape.graphics.beginFill(0xffffff, 0.7);
          //       shape.graphics.drawRect(0, 0, 1, 30);
          //       shape.graphics.endFill();
          //       this._smallTagsGroup.addChild(shape);
          //     }
          //   }
          // }

          // if(smallTag.x > this._smallTagsGroup.width)
          // {
          //   if(lastRowItemIndex < 0)
          //     lastRowItemIndex = i;
          //   this._smallTagsGroup.height = smallTagsHeight * 2;
          //   smallTag.x = 24 + (i - lastRowItemIndex) * smallTag.width;
          //   smallTag.y = smallTagsHeight;
          // }
        }

        // let layout = new eui.HorizontalLayout();
        // layout.gap = 3;
        // layout.paddingLeft = 24;
        // this._smallTagsGroup.layout = layout;
        this.setActiveSmallTag();
      }

      protected onSmallTagClicked(e) {
        for (let i = 0; i < this.smallTagsArray.length; i++) {
          if (e.target === this.smallTagsArray[i]) {
            if (i === this._currentSmallTagIndex) {
              return;
            }
            this._currentSmallTagIndex = i;
          }
        }
        this.setActiveSmallTag();
      }

      protected setActiveSmallTag() {
        for (let i = 0; i < this.smallTagsArray.length; i++) {
          const lbl = this.smallTagsArray[i].getChildAt(0) as ui.RunTimeLabel;
          lbl.alpha = 0.7;
          lbl.textFlow = <egret.ITextElement[]>[
            {
              text: lbl.text,
              style: { bold: false, underline: false },
            },
          ];
          if (i === this._currentSmallTagIndex) {
            lbl.alpha = 1;
            lbl.textFlow = <egret.ITextElement[]>[
              {
                text: lbl.text,
                style: { bold: true, underline: true },
              },
            ];
          }
        }
        this.createBetTable();
      }

      protected updateText() {
        for (let i = 0; i < this.bigTagsArray.length; i++) {
          if (this.bigTagNames[i]) {
            this.bigTagNames[i].renderText = () => `${i18n.t('lo_trad.bigTag.' + this.bigTagsArray[i].name)}`;
          }
        }

        for (let i = 0; i < this.smallTagsArray.length; i++) {
          if (this.smallTagNames[i]) {
            this.smallTagNames[i].renderText = () => `${i18n.t('lo_trad.smallTag.' + this.smallTagsArray[i].name)}`;
          }
        }
      }

      public updateBetInfo(data) {
        super.updateBetInfo(data);
        this._lblCurrentRound.renderText = () => `${data.gameroundid}`;
        switch (data.state) {
          case core.GameState.DEAL:
          case core.GameState.FINISH:
            this._lblCurrentRoundState.renderText = () => `${data.gameroundid + i18n.t('lo_fun_drawingRound')}`;
            this._lblResultBall0.renderText = () => (data.ball1 >= 0 ? `${data.ball1}` : '-');
            this._lblResultBall1.renderText = () => (data.ball2 >= 0 ? `${data.ball2}` : '-');
            this._lblResultBall2.renderText = () => (data.ball3 >= 0 ? `${data.ball3}` : '-');
            this._lblResultBall3.renderText = () => (data.ball4 >= 0 ? `${data.ball4}` : '-');
            this._lblResultBall4.renderText = () => (data.ball5 >= 0 ? `${data.ball5}` : '-');
            break;
          default:
            this._lblCurrentRoundState.renderText = () => `${i18n.t('lo_fun_lastRound')}`;
        }
      }

      public updateBetTableInfo(info) {
        super.updateBetTableInfo(info);
        if (!info.gamestatistic) {
          return;
        }
        if (info.gamestatistic) {
          if (info.gamestatistic.loresults) {
            const data = info.gamestatistic.loresults;
            let index = data.length - 1;

            this._lblCurrentRoundState.renderText = () => `${data[index].Roundnumber + i18n.t('lo_fun_drawingRound')}`;
            this._lblResultBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
            this._lblResultBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
            this._lblResultBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
            this._lblResultBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
            this._lblResultBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');

            if (data.length >= 2) {
              index = data.length - 2;

              this._lblLastRound.renderText = () => `${data[index].Roundnumber}`;
              this._lblLastBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
              this._lblLastBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
              this._lblLastBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
              this._lblLastBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
              this._lblLastBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            }
            if (data.length >= 3) {
              index = data.length - 3;

              this._lblPrevRound.renderText = () => `${data[index].Roundnumber}`;
              this._lblPrevBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
              this._lblPrevBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
              this._lblPrevBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
              this._lblPrevBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
              this._lblPrevBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            }
          }
        }
      }

      protected createBetTable() {
        this.clearCurrentBettingTable();

        const currentBigTag = this._currentMap[Object.keys(this._currentMap)[this._currentBigTagIndex]];
        const config = currentBigTag['type'][Object.keys(currentBigTag['type'])[this._currentSmallTagIndex]];

        const bettingTable = new SSCTraditionalBettingTable(config);
        if (this._bettingControl) {
          this._bettingControl.updateHighestWin(config);
        }
        this._currentBettingTable = bettingTable;
        this.initCurrentBettingTable();
        this._currentBettingTable.init();
      }

      protected clearCurrentBettingTable() {
        super.clearCurrentBettingTable();
        if (this._currentBettingTable) {
          this._currentBettingTable.parent.removeChild(this._currentBettingTable);
        }
      }

      public refreshCurrentBettingTable() {
        this.createBetTable();
      }
      protected initCurrentBettingTable() {
        super.initCurrentBettingTable();
        this._buttonGroup.addChild(this._currentBettingTable);
        this._currentBettingTable.x = this._currentBettingTable.y = 0;
        this._buttonGroup.touchChildren = true;
      }

      protected clearSmallTags() {
        this._currentSmallTagIndex = 0;
        if (this.smallTagsArray.length > 0) {
          for (let i = 0; i < this.smallTagsArray.length; i++) {
            utils.removeButtonListener(this.smallTagsArray[i], this.onSmallTagClicked, this);
          }
        }

        this._smallTagsGroup.removeChildren();
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        for (let i = 0; i < this.bigTagsArray.length; i++) {
          utils.removeButtonListener(this.bigTagsArray[i], this.onBigTagClicked, this);
        }

        for (let i = 0; i < this.smallTagsArray.length; i++) {
          utils.removeButtonListener(this.smallTagsArray[i], this.onSmallTagClicked, this);
        }
      }
    }
  }
}
