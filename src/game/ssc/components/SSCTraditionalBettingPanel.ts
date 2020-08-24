// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingPanel extends ABettingPanel {
      // control by scene
      public _lblCurrentRound: ui.RunTimeLabel;

      protected _buttonGroup: eui.Group;

      protected _bigTagsGroup: eui.Group;
      protected _smallTagsGroup: eui.Group;

      protected bigTagsArray: any[];
      protected smallTagsArray: any[];

      protected bigTagNames: ui.RunTimeLabel[];
      protected smallTagNames: ui.RunTimeLabel[];

      protected currentBigTagIndex: number = 0;
      protected currentSmallTagIndex: number = 0;
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

      constructor(skin: string = null) {
        super(skin);
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
        this.currentBigTagIndex = 0;
        this.bigTagNames = [];

        for (let i = 0; i < Object.keys(SelectionMapping).length; i++) {
          const obj = SelectionMapping[Object.keys(SelectionMapping)[i]];

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
          bigTag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBigTagClicked, this);
        }

        this.setActiveBigTag();
        this.createSmallTags();
      }

      protected generateNoteData(): TradNoteData[] {
        return super.generateNoteData();
      }

      protected setActiveBigTag() {
        this.clearSmallTags();
        for (let i = 0; i < this.bigTagsArray.length; i++) {
          // const img = this.bigTagsArray[i].getChildAt(0) as eui.Image;
          // img.source = ImageMapping.BIGTAG_NORMAL;
          this.bigTagsArray[i].active = false;

          if (i === this.currentBigTagIndex) {
            this.bigTagsArray[i].active = true;
            // img.source = ImageMapping.BIGTAG_ACTIVE;
          }
        }
      }

      protected onBigTagClicked(e: egret.TouchEvent) {
        for (let i = 0; i < this.bigTagsArray.length; i++) {
          if (e.target === this.bigTagsArray[i]) {
            if (i === this.currentBigTagIndex) {
              return;
            }
            this.currentBigTagIndex = i;
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
        const currentBigTag = SelectionMapping[Object.keys(SelectionMapping)[this.currentBigTagIndex]];
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
          smallTag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSmallTagClicked, this);

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

      protected onSmallTagClicked(e: egret.TouchEvent) {
        for (let i = 0; i < this.smallTagsArray.length; i++) {
          if (e.target === this.smallTagsArray[i]) {
            if (i === this.currentSmallTagIndex) {
              return;
            }
            this.currentSmallTagIndex = i;
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
          if (i === this.currentSmallTagIndex) {
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

      protected createBetTable() {
        this.clearCurrentBettingTable();

        const currentBigTag = SelectionMapping[Object.keys(SelectionMapping)[this.currentBigTagIndex]];
        const config = currentBigTag['type'][Object.keys(currentBigTag['type'])[this.currentSmallTagIndex]];

        const bettingTable = new SSCTraditionalBettingTable(config);
        if (this._bettingControl) this._bettingControl.updateHighestWin(config);
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
        this.currentSmallTagIndex = 0;
        this._smallTagsGroup.removeChildren();
      }
    }
  }
}
