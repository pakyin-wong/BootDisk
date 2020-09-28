namespace we {
  export namespace di {
    export class DiBeadRoadIcon extends ba.BARoadIconBase {
      private itemYOffset: number; // Y offset of each components
      private textOffset: number; // Y offset of each components
      private itemColors: any; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
      private iconHightLight: egret.Shape;
      private sizeText: egret.TextField;
      private oddText: egret.TextField;
      private totalText: egret.TextField;

      protected dice: number[];

      protected total: number; // total=d1+d2+d3
      protected odd: number; // odd=1(odd) 2(even)
      protected diceSize: number; // size=1(small) 2(big)
      protected tie: number; // tie=0(not tie) 1(tie)

      protected diceImage1: eui.Image;
      protected diceImage2: eui.Image;
      protected diceImage3: eui.Image;

      protected group: eui.Group;
      protected diceDisplaySize: number;
      protected highlightRadius: number;
      protected textPadding: number;

      protected layout: number; // layout 0 = inGame.Size, layout 1 = inGame.Odd, layout 3 = side bar/lobby

      public constructor(
        width: number,
        height: number,
        itemColors: any,
        size: number = 30,
        diceDisplaySize: number = 30,
        itemYOffset: number = 6,
        textPadding: number = 1,
        highlightRadius: number = 8
      ) {
        super(size);
        this.width = width;
        this.height = height;
        this.diceDisplaySize = diceDisplaySize;
        this.highlightRadius = highlightRadius;
        this.textPadding = textPadding;
        this.itemYOffset = itemYOffset;
        this.itemColors = itemColors;
        this.initGraphics();
        this.setByObject({});
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        // i18n.t('baccarat.playerShort')
        if (this.tie) {
          this.sizeText.text = i18n.t('dice.tripleShort');
          this.oddText.text = i18n.t('dice.tripleShort');

          this.sizeText.textColor = this.itemColors[1];
          this.oddText.textColor = this.itemColors[1];
        } else {
          this.sizeText.textColor = this.diceSize === 1 ? this.itemColors[2] : this.itemColors[0];
          this.oddText.textColor = this.odd === 1 ? this.itemColors[2] : this.itemColors[0];

          this.sizeText.text = this.diceSize === 1 ? i18n.t('dice.smallShort') : i18n.t('dice.bigShort');
          this.oddText.text = this.odd === 1 ? i18n.t('dice.oddShort') : i18n.t('dice.evenShort');
        }

        this.totalText.text = this.total + '';
        if (this.layout === 1) {
          this.totalText.textColor = this.oddText.textColor;
        } else {
          this.totalText.textColor = this.sizeText.textColor;
        }
      }

      protected initGraphics() {
        this.sizeText = new ui.Label();
        this.oddText = new ui.Label();
        this.totalText = new ui.Label();
        this.iconHightLight = new egret.Shape();

        this.diceImage1 = new eui.Image();
        this.diceImage2 = new eui.Image();
        this.diceImage3 = new eui.Image();

        this.group = new eui.Group();
        this.group.verticalCenter = 0;
        this.group.horizontalCenter = 0;
        const layout = new eui.VerticalLayout();
        layout.gap = this.itemYOffset;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.group.layout = layout;

        this.addChild(this.iconHightLight);
        this.addChild(this.group);
        this.group.addChild(this.diceImage1);
        this.group.addChild(this.diceImage2);
        this.group.addChild(this.diceImage3);
        this.group.addChild(this.sizeText);
        this.group.addChild(this.oddText);
        this.group.addChild(this.totalText);

        // const iconSize = this.size;
        // const displaySize = iconSize * 0.64;
        // const spacing: number = displaySize + this.itemYOffset;

        this.diceImage1.width = this.diceImage1.height = this.diceDisplaySize;
        this.diceImage2.width = this.diceImage2.height = this.diceDisplaySize;
        this.diceImage3.width = this.diceImage3.height = this.diceDisplaySize;
        // this.diceImage1.x = this.diceImage2.x = this.diceImage3.x = iconSize * 0.18;

        // draw the hightlight
        // this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
        // this.iconHightLight.graphics.beginFill(this.itemColors[3], this.itemColors[4]);
        this.iconHightLight.graphics.beginFill(0xededed, 1);
        this.iconHightLight.graphics.drawRoundRect(0, 0, this.width, this.height, this.highlightRadius, this.highlightRadius);
        this.iconHightLight.graphics.endFill();
        this.iconHightLight.visible = false;

        this.sizeText.textAlign = egret.HorizontalAlign.CENTER;
        this.sizeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.sizeText.textColor = 0xffffff; // colors[2];
        this.sizeText.text = '2';
        // this.sizeText.width = iconSize;
        this.sizeText.height = this.size + this.textPadding * 2;
        this.sizeText.size = this.size;
        // this.iconText.fontFamily = 'Times New Roman';

        this.oddText.textAlign = egret.HorizontalAlign.CENTER;
        this.oddText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.oddText.textColor = 0xffffff; // colors[2];
        this.oddText.text = '2';
        // this.oddText.width = iconSize;
        this.oddText.height = this.size + this.textPadding * 2;
        this.oddText.size = this.size;
        // this.oddText.fontFamily = 'Barlow';

        this.totalText.textAlign = egret.HorizontalAlign.CENTER;
        this.totalText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.totalText.textColor = 0xffffff; // colors[2];
        this.totalText.text = '2';
        // this.totalText.width = iconSize;
        this.totalText.height = this.size + this.textPadding * 2;
        this.totalText.size = this.size;
        // this.iconText.fontFamily = 'Times New Roman';
      }

      // layout 0 = inGame.Size, layout 1 = inGame.Odd, layout 3 = side bar/lobby
      public setLayout(layout: number) {
        this.layout = layout;

        const iconSize = this.size;
        // const displaySize = iconSize * 0.64;
        const spacing: number = this.diceDisplaySize + this.itemYOffset;

        if (this.layout === 0) {
          // size
          // this.sizeText.visible = true;
          // this.oddText.visible = false;

          // this.diceImage1.visible = true;
          // this.diceImage2.visible = true;
          // this.diceImage3.visible = true;
          // this.totalText.visible = true;
          if (this.oddText.parent) this.oddText.parent.removeChild(this.oddText);
          this.group.addChildAt(this.totalText, 0);
          this.group.addChildAt(this.diceImage3, 0);
          this.group.addChildAt(this.diceImage2, 0);
          this.group.addChildAt(this.diceImage1, 0);
          this.group.addChildAt(this.sizeText, 0);

          // this.sizeText.y = this.itemYOffset;
          // this.diceImage1.y = spacing * 1;
          // this.diceImage2.y = spacing * 2;
          // this.diceImage3.y = spacing * 3;
          // this.totalText.y = spacing * 4;
        } else if (this.layout === 1) {
          // odd
          // this.sizeText.visible = false;
          // this.oddText.visible = true;

          // this.diceImage1.visible = true;
          // this.diceImage2.visible = true;
          // this.diceImage3.visible = true;
          // this.totalText.visible = true;

          // this.oddText.y = this.itemYOffset;
          // this.diceImage1.y = spacing * 1;
          // this.diceImage2.y = spacing * 2;
          // this.diceImage3.y = spacing * 3;
          // this.totalText.y = spacing * 4;

          if (this.sizeText.parent) this.sizeText.parent.removeChild(this.sizeText);
          this.group.addChildAt(this.totalText, 0);
          this.group.addChildAt(this.diceImage3, 0);
          this.group.addChildAt(this.diceImage2, 0);
          this.group.addChildAt(this.diceImage1, 0);
          this.group.addChildAt(this.oddText, 0);
        } else {
          // side bar/lobby
          // this.sizeText.visible = true;
          // this.oddText.visible = false;

          // this.diceImage1.visible = true;
          // this.diceImage2.visible = true;
          // this.diceImage3.visible = true;
          // this.totalText.visible = true;

          // this.diceImage1.y = this.itemYOffset;
          // this.diceImage2.y = spacing * 1 + this.itemYOffset;
          // this.diceImage3.y = spacing * 2 + this.itemYOffset;
          // this.totalText.y = spacing * 3 + this.itemYOffset;
          // this.sizeText.y = spacing * 4;

          if (this.oddText.parent) this.oddText.parent.removeChild(this.oddText);
          this.group.addChildAt(this.sizeText, 0);
          this.group.addChildAt(this.totalText, 0);
          this.group.addChildAt(this.diceImage3, 0);
          this.group.addChildAt(this.diceImage2, 0);
          this.group.addChildAt(this.diceImage1, 0);
        }
        this.changeLang();
      }

      public setByObject(value: any) {
        this.reset();
        this.value = value;
        if (this.value.dice) {
          this.group.visible = true;
          this.dice = value.dice;
          this.total = this.dice.reduce((a, b) => a + b, 0);
          this.tie = this.dice.every((val, i, arr) => val === arr[0]) ? 1 : 0;
          this.diceSize = this.total > 10 ? 2 : 1;
          this.odd = this.total % 2 ? 1 : 2;

          this.diceImage1.source = 'd_sic_history_lv2_dice-' + this.dice[0] + '_png';
          this.diceImage2.source = 'd_sic_history_lv2_dice-' + this.dice[1] + '_png';
          this.diceImage3.source = 'd_sic_history_lv2_dice-' + this.dice[2] + '_png';

          this.setLayout(this.layout);
        } else {
          this.group.visible = false;
        }
      }

      public showHighLight() {
        if (this.value) {
          this.iconHightLight.visible = true;
        }
      }

      public reset() {
        this.value = null;

        // this.sizeText.visible = false;
        // this.oddText.visible = false;

        // this.sizeText.visible = false;
        // this.diceImage1.visible = false;
        // this.diceImage2.visible = false;
        // this.diceImage3.visible = false;
        // this.totalText.visible = false;
      }

      public dispose() {
        super.dispose();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      public addToLayer(staticLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = false;
        staticLayer.addChild(this);
      }
    }
  }
}
