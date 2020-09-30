namespace we {
  export namespace di {
    export class TableLayer extends we.ui.TableLayer {
      // group
      protected _odd_group: eui.Group;
      protected _even_group: eui.Group;
      protected _big_group: eui.Group;
      protected _small_group: eui.Group;
      protected _sum_4_group: eui.Group;
      protected _sum_5_group: eui.Group;
      protected _sum_6_group: eui.Group;
      protected _sum_7_group: eui.Group;
      protected _sum_8_group: eui.Group;
      protected _sum_9_group: eui.Group;
      protected _sum_10_group: eui.Group;
      protected _sum_11_group: eui.Group;
      protected _sum_12_group: eui.Group;
      protected _sum_13_group: eui.Group;
      protected _sum_14_group: eui.Group;
      protected _sum_15_group: eui.Group;
      protected _sum_16_group: eui.Group;
      protected _sum_17_group: eui.Group;
      protected _triple_1_group: eui.Group;
      protected _triple_2_group: eui.Group;
      protected _triple_3_group: eui.Group;
      protected _triple_4_group: eui.Group;
      protected _triple_5_group: eui.Group;
      protected _triple_6_group: eui.Group;
      protected _triple_all_group: eui.Group;
      protected _double_1_group: eui.Group;
      protected _double_2_group: eui.Group;
      protected _double_3_group: eui.Group;
      protected _double_4_group: eui.Group;
      protected _double_5_group: eui.Group;
      protected _double_6_group: eui.Group;
      protected _combine_1_2_group: eui.Group;
      protected _combine_1_3_group: eui.Group;
      protected _combine_1_4_group: eui.Group;
      protected _combine_1_5_group: eui.Group;
      protected _combine_1_6_group: eui.Group;
      protected _combine_2_3_group: eui.Group;
      protected _combine_2_4_group: eui.Group;
      protected _combine_2_5_group: eui.Group;
      protected _combine_2_6_group: eui.Group;
      protected _combine_3_4_group: eui.Group;
      protected _combine_3_5_group: eui.Group;
      protected _combine_3_6_group: eui.Group;
      protected _combine_4_5_group: eui.Group;
      protected _combine_4_6_group: eui.Group;
      protected _combine_5_6_group: eui.Group;
      protected _specific_group: eui.Group;
      protected _specific_1_group: eui.Group;
      protected _specific_2_group: eui.Group;
      protected _specific_3_group: eui.Group;
      protected _specific_4_group: eui.Group;
      protected _specific_5_group: eui.Group;
      protected _specific_6_group: eui.Group;
      protected _specific_1_dice: eui.Image;
      protected _specific_2_dice: eui.Image;
      protected _specific_3_dice: eui.Image;
      protected _specific_4_dice: eui.Image;
      protected _specific_5_dice: eui.Image;
      protected _specific_6_dice: eui.Image;

      protected _groupMapping: {};
      protected _groupHoverImageMapping: {};

      protected _bigrow_1: eui.Group;
      protected _bigrow_2: eui.Group;
      protected _bigrow_3: eui.Group;
      protected _label_group_1: eui.Group;
      protected _label_group_2: eui.Group;
      protected _label_group_3: eui.Group;
      protected _specific_odd_group: eui.Group;
      protected _specific_row_bg: eui.Image;
      protected _specific_row_bg_odd: eui.Image;

      protected _small_label: ui.RunTimeLabel;
      protected _odd_label: ui.RunTimeLabel;
      protected _even_label: ui.RunTimeLabel;
      protected _big_label: ui.RunTimeLabel;
      protected _single_label: ui.RunTimeLabel;
      protected _double_label: ui.RunTimeLabel;
      protected _triple_label: ui.RunTimeLabel;

      constructor() {
        super();
        this._betField = ro.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._groupMapping = {};
        this._groupMapping[di.BetField.ODD] = this._odd_group;
        this._groupMapping[di.BetField.EVEN] = this._even_group;
        this._groupMapping[di.BetField.BIG] = this._big_group;
        this._groupMapping[di.BetField.SMALL] = this._small_group;
        this._groupMapping[di.BetField.SUM_4] = this._sum_4_group;
        this._groupMapping[di.BetField.SUM_5] = this._sum_5_group;
        this._groupMapping[di.BetField.SUM_6] = this._sum_6_group;
        this._groupMapping[di.BetField.SUM_7] = this._sum_7_group;
        this._groupMapping[di.BetField.SUM_8] = this._sum_8_group;
        this._groupMapping[di.BetField.SUM_9] = this._sum_9_group;
        this._groupMapping[di.BetField.SUM_10] = this._sum_10_group;
        this._groupMapping[di.BetField.SUM_11] = this._sum_11_group;
        this._groupMapping[di.BetField.SUM_12] = this._sum_12_group;
        this._groupMapping[di.BetField.SUM_13] = this._sum_13_group;
        this._groupMapping[di.BetField.SUM_14] = this._sum_14_group;
        this._groupMapping[di.BetField.SUM_15] = this._sum_15_group;
        this._groupMapping[di.BetField.SUM_16] = this._sum_16_group;
        this._groupMapping[di.BetField.SUM_17] = this._sum_17_group;
        this._groupMapping[di.BetField.TRIPLE_1] = this._triple_1_group;
        this._groupMapping[di.BetField.TRIPLE_2] = this._triple_2_group;
        this._groupMapping[di.BetField.TRIPLE_3] = this._triple_3_group;
        this._groupMapping[di.BetField.TRIPLE_4] = this._triple_4_group;
        this._groupMapping[di.BetField.TRIPLE_5] = this._triple_5_group;
        this._groupMapping[di.BetField.TRIPLE_6] = this._triple_6_group;
        this._groupMapping[di.BetField.TRIPLE_ALL] = this._triple_all_group;
        this._groupMapping[di.BetField.DOUBLE_1] = this._double_1_group;
        this._groupMapping[di.BetField.DOUBLE_2] = this._double_2_group;
        this._groupMapping[di.BetField.DOUBLE_3] = this._double_3_group;
        this._groupMapping[di.BetField.DOUBLE_4] = this._double_4_group;
        this._groupMapping[di.BetField.DOUBLE_5] = this._double_5_group;
        this._groupMapping[di.BetField.DOUBLE_6] = this._double_6_group;
        this._groupMapping[di.BetField.COMBINE_1_2] = this._combine_1_2_group;
        this._groupMapping[di.BetField.COMBINE_1_3] = this._combine_1_3_group;
        this._groupMapping[di.BetField.COMBINE_1_4] = this._combine_1_4_group;
        this._groupMapping[di.BetField.COMBINE_1_5] = this._combine_1_5_group;
        this._groupMapping[di.BetField.COMBINE_1_6] = this._combine_1_6_group;
        this._groupMapping[di.BetField.COMBINE_2_3] = this._combine_2_3_group;
        this._groupMapping[di.BetField.COMBINE_2_4] = this._combine_2_4_group;
        this._groupMapping[di.BetField.COMBINE_2_5] = this._combine_2_5_group;
        this._groupMapping[di.BetField.COMBINE_2_6] = this._combine_2_6_group;
        this._groupMapping[di.BetField.COMBINE_3_4] = this._combine_3_4_group;
        this._groupMapping[di.BetField.COMBINE_3_5] = this._combine_3_5_group;
        this._groupMapping[di.BetField.COMBINE_3_6] = this._combine_3_6_group;
        this._groupMapping[di.BetField.COMBINE_4_5] = this._combine_4_5_group;
        this._groupMapping[di.BetField.COMBINE_4_6] = this._combine_4_6_group;
        this._groupMapping[di.BetField.COMBINE_5_6] = this._combine_5_6_group;
        this._groupMapping[di.BetField.SPECIFIC_1] = this._specific_1_group;
        this._groupMapping[di.BetField.SPECIFIC_2] = this._specific_2_group;
        this._groupMapping[di.BetField.SPECIFIC_3] = this._specific_3_group;
        this._groupMapping[di.BetField.SPECIFIC_4] = this._specific_4_group;
        this._groupMapping[di.BetField.SPECIFIC_5] = this._specific_5_group;
        this._groupMapping[di.BetField.SPECIFIC_6] = this._specific_6_group;

        this._groupHoverImageMapping = {};
        Object.keys(we.di.BETFIELD_IMAGE_MAPPING).map(value => {
          this._groupHoverImageMapping[value] = we.di.BETFIELD_IMAGE_MAPPING[value];
        });

        this._small_label.renderText = () => i18n.t('dice.small');
        this._odd_label.renderText = () => i18n.t('dice.odd');
        this._even_label.renderText = () => i18n.t('dice.even');
        this._big_label.renderText = () => i18n.t('dice.big');
        if (this._single_label) {
          this._single_label.renderText = () => i18n.t('dice.single');
        }
        if (this._double_label) {
          this._double_label.renderText = () => i18n.t('dice.double');
        }
        if (this._triple_label) {
          this._triple_label.renderText = () => i18n.t('dice.triple');
        }
      }

      public onRollover(fieldName: string) {
        const group = this._groupMapping[fieldName];
        const image = new eui.Image();
        image.name = 'image';
        image.source = this._groupHoverImageMapping[fieldName];
        image.width = group.width;
        image.height = group.height;
        group.addChildAt(image, 0);
      }

      public onRollout(fieldName: string) {
        const group = this._groupMapping[fieldName];
        if (!group) {
          return;
        }
        const image = group.getChildByName('image');
        if (image) {
          group.removeChild(image);
        }
      }

      public clearAllHighlights() {
        Object.keys(di.BetField).map(value => {
          this.onRollout(value);
        });
      }

      public async animateToState(collapsed: boolean) {
        const time = 3000;
        const tweenPromises = [];

        egret.Tween.removeTweens(this);
        Object.keys(this).map(value => {
          if (this[value] instanceof egret.DisplayObject && this[value] !== this.parent) {
            egret.Tween.removeTweens(this[value]);
          }
        });

        for (let i = 1; i <= 3; i += 1) {
          const promise = new Promise(resolve => {
            egret.Tween.get(this[`_label_group_${i}`])
              .to({ scaleY: collapsed ? 0 : 1 }, 125)
              .call(resolve);
          });
          tweenPromises.push(promise);
        }
        const border = 2;
        const sizeTransform = {};
        // row 1
        sizeTransform['_bigrow_1'] = [
          { height: 143 }, // collapse
          { height: 150 }, // expand
        ];
        // row 2
        sizeTransform['_bigrow_2'] = [
          { height: 64, y: 144 }, // collapse
          { height: 67, y: 179 }, // expand
        ];
        // row 3
        sizeTransform['_bigrow_3'] = [
          { height: 64, y: 209 }, // collapse
          { height: 109, y: 273 }, // expand
        ];
        // perform first 3 row transform
        Object.keys(sizeTransform).forEach(group => {
          const promise = new Promise(resolve => {
            egret.Tween.get(this[group])
              .to(collapsed ? sizeTransform[group][0] : sizeTransform[group][1], 125)
              .call(resolve);
          });
          tweenPromises.push(promise);
        });

        // transform dices in row 3
        this._bigrow_3.$children.forEach(child => {
          if (!(child instanceof eui.Group)) {
            return;
          }
          const innerGroup = child.$children[0] as eui.Group;
          innerGroup.layout = collapsed ? new eui.HorizontalLayout() : new eui.VerticalLayout();
          innerGroup.scaleX = collapsed ? 0.75 : 1;
          innerGroup.scaleY = collapsed ? 0.75 : 1;
          logger.l(utils.LogTarget.DEBUG, innerGroup);
        });
        // transform last row
        (() => {
          /*
          for (let i = 1; i <= 6; i += 1) {
            const promise = new Promise(resolve => {
              egret.Tween.get(this[`_specific_${i}_group`])
                .to(
                {
                  width: collapsed ? 228 : 197,
                  height: collapsed ? 64 : 68,
                  x: (collapsed ? 0 : 196) + (collapsed ? 228 : 197) * (i - 1) + border,
                  y: collapsed ? 274 : 411,
                },
                125
                )
                .call(resolve);
            });
            tweenPromises.push(promise);
          }
          */
          const promise = new Promise(resolve => {
            egret.Tween.get(this[`_specific_group`])
              .to(
                {
                  scaleX: collapsed ? 1.166 : 1,
                  // width: collapsed ? 1384 : 1186,
                  height: collapsed ? 64 : 68,

                  x: collapsed ? 2 : 199,
                  y: collapsed ? 274 : 411,
                },
                125
              )
              .call(resolve);
          });
          tweenPromises.push(promise);
        })();
        (() => {
          for (let i = 1; i < 7; i++) {
            const promise = new Promise(resolve => {
              egret.Tween.get(this[`_specific_${i}_dice`])
                .to(
                  {
                    scaleX: collapsed ? 0.858 : 1,
                  },
                  125
                )
                .call(resolve);
            });
            tweenPromises.push(promise);
          }
        })();
        (() => {
          const promise = new Promise(resolve => {
            egret.Tween.get(this._specific_odd_group)
              .to(
                {
                  width: collapsed ? 0 : 196,
                  height: collapsed ? 65 : 68,
                  y: collapsed ? 274 : 411,
                  visible: collapsed ? false : true,
                },
                125
              )
              .call(resolve);
          });
          tweenPromises.push(promise);
        })();
        // transform last row bg odd
        (() => {
          const promise = new Promise(resolve => {
            egret.Tween.get(this._specific_row_bg_odd)
              .to(
                {
                  width: collapsed ? 0 : 199,
                  height: collapsed ? 65 : 68,
                  visible: collapsed ? false : true,
                  y: collapsed ? 274 : 411,
                },
                125
              )
              .call(resolve);
          });
          tweenPromises.push(promise);
        })();
        // transform last row bg
        (() => {
          const promise = new Promise(resolve => {
            egret.Tween.get(this._specific_row_bg)
              .to(
                {
                  x: collapsed ? 2 : 199,
                  y: collapsed ? 274 : 411,
                  width: collapsed ? 1384 : 1187,
                  height: collapsed ? 65 : 68,
                },
                125
              )
              .call(resolve);
          });
          tweenPromises.push(promise);
        })();
        // transform this.height lastly
        (() => {
          const promise = new Promise(resolve => {
            egret.Tween.get(this)
              .to({ height: collapsed ? 338 : 473, anchorOffsetY: collapsed ? -(473 - 338) : 0 }, 125)
              .call(resolve);
          });
          tweenPromises.push(promise);
        })();
        // draw border corner radius
        let shape: egret.Shape = <egret.Shape> this.getChildByName('corner');
        if (shape) {
          this.removeChild(shape);
        }
        shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, 1386, collapsed ? 338 : 473, 48, 48);
        shape.graphics.endFill();
        this.addChild(shape);
        this.mask = shape;
        await Promise.all(tweenPromises);
      }

      public async flashFields(fieldName: we.data.GameData) {
        const winningFields = di.getWinningFields(fieldName);
        const initRectPromises = [];
        // init dim rects
        for (const field of Object.keys(this._groupMapping)) {
          const group = this._groupMapping[field];
          const isWin = winningFields.indexOf(field) >= 0;
          // try remove existing
          let rect = group.getChildByName('dim');
          if (rect) {
            group.removeChild(rect);
          }
          rect = new eui.Rect();
          rect.name = 'dim';
          rect.alpha = 0;
          rect.fillColor = isWin ? 0xffffff : 0x000000;
          rect.percentWidth = 100;
          rect.percentHeight = 100;
          group.addChildAt(rect, 0);
          const promise = new Promise(resolve => {
            if (rect) {
              egret.Tween.get(rect)
                .to({ alpha: isWin ? 0 : 0.25 }, 125)
                .call(resolve);
            }
          });
          initRectPromises.push(promise);
        }
        await Promise.all(initRectPromises);
        // start flashing
        let run = 1;
        const tick = async () => {
          // end flashing
          if (run >= 6) {
            const fadeOutPromises = [];
            for (const field of Object.keys(this._groupMapping)) {
              const group = this._groupMapping[field];
              const isWin = winningFields.indexOf(field) >= 0;
              const rect = group.getChildByName('dim');
              const promise = new Promise(resolve => {
                if (rect) {
                  egret.Tween.get(rect)
                    .to({ alpha: 0 }, 125)
                    .call(() => {
                      if (rect && group.contains(rect)) {
                        group.removeChild(rect);
                      }
                      resolve();
                    });
                }
              });
              fadeOutPromises.push(promise);
            }
            await Promise.all(fadeOutPromises);
            return;
          }
          const tickFlashPromises = [];
          for (const field of winningFields) {
            const group = this._groupMapping[field];
            const rect = group.getChildByName('dim');
            const prom = new Promise(resolve => {
              const alpha = run % 2 === 1 ? 0.25 : 0;
              if (rect) {
                egret.Tween.get(rect)
                  .to({ alpha }, 125)
                  .call(resolve);
              }
            });
            tickFlashPromises.push(prom);
          }
          await Promise.all(tickFlashPromises);
          run += 1;
          setTimeout(tick, 300);
        };
        setTimeout(tick, 300);
      }
    }
  }
}
