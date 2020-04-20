namespace we {
  export namespace ba {
    export class FlipCard extends eui.Component {
      protected debugShape: egret.Shape;
      protected cardWidth: number;
      protected cardHeight: number;
      protected cardFace: CardImage;
      protected cardBack: CardImage;
      protected cardFinal: CardImage;
      protected cardBackMask: eui.Rect;

      protected cardFaceShadowMask: CardShape;
      protected cardFaceShadow: egret.Shape; // a shape that has gradient shadow
      protected cardBackShadowMask: CardShape;
      protected cardBackShadow: egret.Shape; // a shape that has gradient shadow

      protected itemStage: egret.Stage;

      protected isTouched: boolean;
      protected isUpdating: boolean; // flag if the card point is updating
      protected previousTime: number;
      protected _s: egret.Point; // start point
      protected _finalT: egret.Point; // final point
      protected _t: egret.Point; // current point
      // protected _mps: egret.Point[];

      protected freezeX: boolean;
      protected freezeY: boolean;

      protected backImgSrc: string;
      protected faceImgSrc: string;
      protected finalImgSrc: string;
      protected initedComponents: boolean; // flag that the children are created

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;
        this._t = egret.Point.create(0, 0);
        this._finalT = egret.Point.create(0, 0);
        // this._mps = /[];
      }

      protected createChildren() {
        super.createChildren();
        // this.skinName = utils.getSkinByClassname('ba.CardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();

        // const bg = new eui.Rect(this.cardWidth, this.cardHeight, 0x0000ff);
        // this.addChild(bg);

        this.cardBack = new CardImage(this.cardWidth, this.cardHeight);
        this.addChild(this.cardBack);

        this.cardBackShadow = new egret.Shape();
        this.cardBackShadow.visible = false;
        const gr2 = this.cardBackShadow.graphics;
        const matrix2 = new egret.Matrix();
        matrix2.createGradientBox(this.cardWidth * 0.05, this.cardHeight * 1.5, 0, 0, 0);
        gr2.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000, 0x000000], [0.7, 0.7, 0], [0, 200, 255], matrix2);
        gr2.drawRect(0, -this.cardHeight * 1.5, this.cardWidth * 0.05, this.cardHeight * 3);
        gr2.endFill();
        this.addChild(this.cardBackShadow);

        this.cardBackShadowMask = new CardShape(this.cardWidth, this.cardHeight);
        this.cardBackShadowMask.visible = false;
        this.addChild(this.cardBackShadowMask);

        this.cardFace = new CardImage(this.cardWidth, this.cardHeight);
        this.addChild(this.cardFace);

        this.cardFaceShadow = new egret.Shape();
        this.cardFaceShadow.visible = false;
        const gr = this.cardFaceShadow.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(this.cardWidth * 0.05, this.cardHeight * 1.5, 0, 0, 0);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000], [0.8, 0], [0, 255], matrix);
        gr.drawRect(0, -this.cardHeight * 1.5, this.cardWidth * 0.05, this.cardHeight * 3);
        gr.endFill();
        this.addChild(this.cardFaceShadow);

        this.cardFaceShadowMask = new CardShape(this.cardWidth, this.cardHeight);
        this.cardFaceShadowMask.visible = false;
        this.addChild(this.cardFaceShadowMask);

        this.cardFinal = new CardImage(this.cardWidth, this.cardHeight);
        this.cardFinal.visible = false;
        this.addChild(this.cardFinal);

        this.debugShape = new egret.Shape();
        this.addChild(this.debugShape);

        this.initedComponents = true;
        this.setCardImage(this.backImgSrc, this.faceImgSrc, this.finalImgSrc);
      }

      protected update() {
        const currentTime = egret.getTimer();
        const dt = currentTime - this.previousTime;
        this.previousTime = currentTime;
        if (!this._s) {
          this.isUpdating = false;
          return;
        }
        this.isUpdating = true;
        const finalThresholdX = this.cardWidth * 1.15;
        const finalThresholdY = this.cardHeight * 1.15;
        if (Math.abs(this._s.x - this._finalT.x) > finalThresholdX || Math.abs(this._s.y - this._finalT.y) > finalThresholdY) {
          this.showFinal();
          this._finalT.setTo(this._s.x, this._s.y);
          this._t.setTo(this._s.x, this._s.y + 1);
        }

        // update _t
        if (egret.Point.distance(this._t, this._finalT) > 3) {
          this._t = egret.Point.interpolate(this._t, this._finalT, 1 - dt * 0.01);
          this.updateCard();
        } else {
          if (!this._t.equals(this._finalT)) {
            this._t.setTo(this._finalT.x, this._finalT.y);
            this.updateCard();
          }
          if (!this.isTouched) {
            this.isUpdating = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
          }
        }
      }

      public setCardImage(backImg, faceImg, finalImg) {
        this.backImgSrc = backImg;
        this.faceImgSrc = faceImg;
        this.finalImgSrc = finalImg;
        if (this.initedComponents) {
          this.cardBack.setCardImage(this.backImgSrc);
          this.cardFace.setCardImage(this.faceImgSrc);
          this.cardFinal.setCardImage(this.finalImgSrc);
          this.reset();
        }
      }

      public showFinal() {
        this.clearUserEvents();
        this.cardFace.visible = false;
        this.cardBack.visible = false;
        this.cardFinal.visible = true;

        this.dispatchEvent(new egret.Event('CardFlipped'));

        // auto reset for this moment
        setTimeout(() => {
          this.reset();
        }, 4000);
      }

      public clearUserEvents() {
        this.onTouchEnd(null); // remove all touch events
        this.onOut(null); // remove mouse move event
        if (this.hasEventListener(mouse.MouseEvent.ROLL_OVER)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
        }
        if (this.hasEventListener(mouse.MouseEvent.ROLL_OUT)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
      }

      public reset() {
        this.clearUserEvents();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);

        this.cardFace.visible = false;
        this.cardFinal.visible = false;
        this.cardBack.visible = true;
      }

      private onOver(event: mouse.MouseEvent) {
        mouse.setMouseMoveEnabled(true);
        if (this.stage) {
          this.itemStage = this.stage;
          this.itemStage.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
        }
      }

      private onMove(event: egret.TouchEvent) {
        const pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        const posX: number = pt.x;
        const posY: number = pt.y;
        const threshold: number = this.cardWidth * 0.2;
        if (posX >= 0 && posY >= 0 && posX <= this.cardWidth && posY <= this.cardHeight) {
          if (
            (posX < threshold && posY < threshold) ||
            (posX < threshold && posY > this.cardHeight - threshold) ||
            (posX > this.cardWidth - threshold && posY < threshold) ||
            (posX > this.cardWidth - threshold && posY > this.cardHeight - threshold)
          ) {
            console.log('on touch corner');
          }
        }
      }

      private onOut(event: mouse.MouseEvent) {
        mouse.setMouseMoveEnabled(false);
        if (this.itemStage) {
          if (this.itemStage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
            this.itemStage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
          }
        }
      }

      protected onTouchBegin(e: egret.TouchEvent) {
        if (this.stage) {
          this.itemStage = this.stage;

          if (this.isUpdating) {
            // resume the touch move event if the card is still updating after a touch end
            if (this._s) {
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
              this.isTouched = true;
              this.onTouchMove(e);
            }
          } else {
            const m = new egret.Matrix();
            m.identity();
            m.rotate((-this.rotation * Math.PI) / 180);
            const x = e.stageX - this.x;
            const y = e.stageY - this.y;
            // this._finalT.setTo(y, -x);
            // console.log(x, y);
            m.transformPoint(x, y, this._finalT);
            if (this._s) {
              egret.Point.release(this._s);
            }
            this._s = this.computeS(this._finalT);
            if (this._s) {
              this._t.setTo(this._s.x, this._s.y);
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
              this.itemStage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);

              this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
              this.previousTime = egret.getTimer();

              this.isTouched = true;
              this.onTouchMove(e);
            }
          }
        }
      }
      protected onTouchMove(e: egret.TouchEvent) {
        // this._finalT.setTo(e.stageX - this.x, e.stageY - this.y);
        const m = new egret.Matrix();
        m.identity();
        m.rotate((-this.rotation * Math.PI) / 180);
        const x = e.stageX - this.x;
        const y = e.stageY - this.y;
        // this._finalT.setTo(y, -x);

        m.transformPoint(x, y, this._finalT);
        // console.log(x, y, this._finalT.x, this._finalT.y);

        // console.log(this._finalT.x, this._finalT.y);
        // this._finalT.setTo(e.localX, e.localY);
        const minX = this._s.x === 0 ? this.cardWidth * 0.1 : -this.cardWidth * 0.8;
        const maxX = this._s.x === this.cardWidth ? this.cardWidth * 0.9 : 1.8 * this.cardWidth;
        const minY = this._s.y === 0 ? this.cardHeight * 0.1 : -this.cardHeight * 0.5;
        const maxY = this._s.y === this.cardHeight ? this.cardHeight * 0.9 : 1.5 * this.cardHeight;
        utils.clampPoint(this._finalT, minX, minY, maxX, maxY);
        if (this.freezeX) {
          this._finalT.x = this._s.x;
        }
        if (this.freezeY) {
          this._finalT.y = this._s.y;
        }
      }

      protected onTouchEnd(e: egret.TouchEvent) {
        if (this._s) {
          this._finalT.setTo(this._s.x, this._s.y);
        }
        this.isTouched = false;
        if (this.itemStage) {
          if (this.itemStage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            this.itemStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
          }
          if (this.itemStage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            this.itemStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
          }
          if (this.itemStage.hasEventListener(egret.TouchEvent.TOUCH_CANCEL)) {
            this.itemStage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
          }
        }
      }

      protected updateCard() {
        const s = this._s;
        const t = this._t;
        const p1 = new egret.Point(0, 0);
        const p2 = new egret.Point(0, 0);
        const p3 = new egret.Point(0, 0);
        const p4 = new egret.Point(0, 0);
        this.computeP1P2(s, t, p1, p2);

        if (!p1.equals(p2)) {
          this.computeCardBackMask(p1, p2);

          const pdy = p2.y - p1.y;
          const pdx = p2.x - p1.x;
          const angle = pdx === 0 ? 90 : utils.rad2deg(Math.atan(pdy / pdx));
          this.computeP3P4(p1, p2, p3, p4);
          this.cardFace.visible = true;
          this.cardFace.anchorOffsetX = p3.x;
          this.cardFace.anchorOffsetY = p3.y;
          this.cardFace.x = p1.x;
          this.cardFace.y = p1.y;
          this.cardFace.rotation = 180 + 2 * angle;

          this.cardFaceShadowMask.anchorOffsetX = p3.x;
          this.cardFaceShadowMask.anchorOffsetY = p3.y;
          this.cardFaceShadowMask.x = p1.x;
          this.cardFaceShadowMask.y = p1.y;
          this.cardFaceShadowMask.rotation = 180 + 2 * angle;

          this.cardFaceShadow.visible = true;
          this.cardFaceShadow.x = p1.x;
          this.cardFaceShadow.y = p1.y;
          this.cardFaceShadow.rotation = angle - 90;

          if (Math.abs(this.cardFaceShadow.rotation) % 90 === 0) {
            this.cardFaceShadow.mask = null;
          } else {
            this.cardFaceShadow.mask = this.cardFaceShadowMask;
          }

          this.cardBackShadow.visible = true;
          this.cardBackShadow.x = p1.x;
          this.cardBackShadow.y = p1.y;
          this.cardBackShadow.rotation = angle - 90;
          this.cardBackShadow.mask = this.cardBackShadowMask;

          // at some position, the shadow need to rotate 180
          if (pdx > 0 || (pdy >= 0 && pdx >= 0)) {
            this.cardFaceShadow.rotation += 180;
            this.cardBackShadow.rotation += 180;
          }
        } else {
          this.cardFace.visible = false;
          if (this.cardBackMask) {
            if (this.cardBackMask.parent) {
              this.cardBackMask.parent.removeChild(this.cardBackMask);
            }
          }
          this.mask = null;
          this.cardFaceShadow.mask = null;
          this.cardFaceShadow.visible = false;
          this.cardBackShadow.mask = null;
          this.cardBackShadow.visible = false;
        }

        this.drawDebugShape(s, t, p1, p2);
      }

      protected computeS(t: egret.Point): egret.Point {
        this.freezeX = false;
        this.freezeY = false;
        const threshold = this.cardWidth * 0.2;
        if (t.x < threshold && t.y > this.cardHeight - threshold) {
          // return left corner
          return egret.Point.create(0, this.cardHeight);
        } else if (t.x > this.cardWidth - threshold && t.y > this.cardHeight - threshold) {
          // return right corner
          return egret.Point.create(this.cardWidth, this.cardHeight);
        }
        if (t.x < threshold && t.y < threshold) {
          // return left upper corner
          return egret.Point.create(0, 0);
        } else if (t.x > this.cardWidth - threshold && t.y < threshold) {
          // return right upper corner
          return egret.Point.create(this.cardWidth, 0);
        } else if (t.x < threshold) {
          // return point by projecting t to left edge
          this.freezeY = true;
          return egret.Point.create(0, t.y);
        } else if (t.x > this.cardWidth - threshold) {
          // return point by projecting t to right edge
          this.freezeY = true;
          return egret.Point.create(this.cardWidth, t.y);
        } else if (t.y < threshold) {
          // return point by project t to bottom edge
          this.freezeX = true;
          return egret.Point.create(t.x, 0);
        } else if (t.y > this.cardHeight - threshold) {
          // return point by project t to bottom edge
          this.freezeX = true;
          return egret.Point.create(t.x, this.cardHeight);
        }
        return null;
      }

      protected computeP1P2(s: egret.Point, t: egret.Point, p1: egret.Point, p2: egret.Point) {
        const m = egret.Point.interpolate(s, t, 0.5);
        const dy = t.y - s.y;
        const dx = t.x - s.x;
        if (dx === 0 && dy === 0) {
          return;
        }
        const slope = dx !== 0 ? dy / dx : Infinity * dy;
        const pSlope = -dx / dy;

        const ps = [p1, p2];
        let idx = 0;

        const y1 = m.y - pSlope * m.x;
        if (y1 >= 0 && y1 <= this.cardHeight) {
          ps[idx].setTo(0, y1);
          idx++;
        }
        const y2 = m.y + pSlope * (this.cardWidth - m.x);
        if (y2 >= 0 && y2 <= this.cardHeight) {
          ps[idx].setTo(this.cardWidth, y2);
          idx++;
        }
        if (idx < 2) {
          const x1 = m.x + slope * m.y;
          if (x1 >= 0 && x1 <= this.cardWidth) {
            ps[idx].setTo(x1, 0);
            idx++;
          }
        }
        if (idx < 2) {
          const x2 = m.x - slope * (this.cardHeight - m.y);
          if (x2 >= 0 && x2 <= this.cardWidth) {
            ps[idx].setTo(x2, this.cardHeight);
            idx++;
          }
        }

        if (idx === 2) {
          // sort p1 and p2 using dot product
          const st = t.subtract(s);
          const o = egret.Point.interpolate(p1, p2, 0.5);
          const op1 = p1.subtract(o);
          const t_cross_p1 = utils.cross(st, op1);
          if (t_cross_p1 < 0) {
            const temp: egret.Point = p1.clone();
            p1.setTo(p2.x, p2.y);
            p2.setTo(temp.x, temp.y);
            egret.Point.release(temp);
          }
        }
      }

      protected computeP3P4(p1: egret.Point, p2: egret.Point, p3: egret.Point, p4: egret.Point) {
        p3.setTo(this.cardWidth - p1.x, p1.y);
        p4.setTo(this.cardWidth - p2.x, p2.y);
      }

      protected computeCardBackMask(p1: egret.Point, p2: egret.Point) {
        if (this.cardBackMask) {
          if (this.cardBackMask.parent) {
            this.cardBackMask.parent.removeChild(this.cardBackMask);
          }
        }
        this.cardBackMask = this.computeMask(p1, p2);
        // this.cardBack.mask = this.cardBackMask;
        // this.cardBack.addChild(this.cardBackMask);

        this.mask = this.cardBackMask;
        this.addChild(this.cardBackMask);
      }

      protected computeMask(p1: egret.Point, p2: egret.Point) {
        const tl = egret.Point.create(0, 0);
        const bl = egret.Point.create(0, this.cardHeight);
        const tr = egret.Point.create(this.cardWidth, 0);
        const br = egret.Point.create(this.cardWidth, this.cardHeight);

        const p1p2 = p2.subtract(p1);
        p1p2.normalize(1);

        const p1tl = tl.subtract(p1);
        const p1tr = tr.subtract(p1);
        const p1br = br.subtract(p1);
        const p1bl = bl.subtract(p1);

        // const tlcross = utils.cross(p1p2, p1tl);
        // const trcross = utils.cross(p1p2, p1tr);
        // const brcross = utils.cross(p1p2, p1br);
        // const blcross = utils.cross(p1p2, p1bl);

        // this._mps = [];
        // const ps = [tl, tr, br, bl];
        // const values = [tlcross, trcross, brcross, blcross];

        // for (const index in values) {
        //   if (values[index] >= 0) {
        //     this._mps.push(ps[index]);
        //   }
        // }

        // this._mps.sort((a, b) => {
        //   const p1a = a.subtract(p1);
        //   const p1b = b.subtract(p1);
        //   const adot = utils.dot(p1a, p1p2);
        //   const bdot = utils.dot(p1b, p1p2);
        //   return adot > bdot ? 1 : -1;
        // });
        const tldot = utils.dot(p1tl, p1p2);
        const bldot = utils.dot(p1bl, p1p2);
        const trdot = utils.dot(p1tr, p1p2);
        const brdot = utils.dot(p1br, p1p2);

        let maxValue = tldot;
        let minValue = tldot;

        const dotValues = [bldot, trdot, brdot];
        for (const value of dotValues) {
          maxValue = Math.max(maxValue, value);
          minValue = Math.min(minValue, value);
        }
        const maskWidth = maxValue - minValue;
        const maskHeight = this.cardHeight * 1.5;
        let maskPoint = p1p2.clone();
        maskPoint.normalize(minValue);
        maskPoint = maskPoint.add(p1);
        // console.log(maskPoint);

        const mask = new eui.Rect(maskWidth, maskHeight, 0x00ff00);
        mask.fillColor = 0xffff00;
        mask.alpha = 0.5;
        mask.x = maskPoint.x;
        mask.y = maskPoint.y;
        if (p1p2.x === 0) {
          mask.rotation = p1p2.y > 0 ? 90 : 270;
        } else {
          const slope = p1p2.y / p1p2.x;
          mask.rotation = utils.rad2deg(Math.atan(slope));
          mask.rotation = (p1p2.x < 0 ? 180 : 0) + mask.rotation;
        }
        return mask;
      }

      protected drawDebugShape(s: egret.Point, t: egret.Point, p1: egret.Point, p2: egret.Point) {
        const gr = this.debugShape.graphics;
        gr.clear();
        gr.beginFill(0x00ff00);
        gr.drawCircle(s.x, s.y, 8);
        gr.endFill();

        gr.beginFill(0x0000ff);
        gr.drawCircle(t.x, t.y, 8);
        gr.endFill();

        gr.beginFill(0xffff00);
        gr.drawCircle(p1.x, p1.y, 8);
        gr.endFill();

        gr.beginFill(0x00ffff);
        gr.drawCircle(p2.x, p2.y, 8);
        gr.endFill();

        // for (const p of this._mps) {
        //   gr.beginFill(0xff0000);
        //   gr.drawCircle(p.x, p.y, 8);
        //   gr.endFill();
        // }
      }
    }
  }
}
