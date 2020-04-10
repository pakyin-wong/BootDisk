namespace we {
  export namespace ba {
    export class FlipCard extends eui.Component {
      protected debugShape: egret.Shape;
      protected cardWidth: number;
      protected cardHeight: number;
      protected cardFace: FrontCard;
      protected cardBack: MaskedCard;
      protected cardFaceMask: eui.Rect;
      protected cardBackMask: eui.Rect;
      protected touchX: number;
      protected touchY: number;

      protected itemStage: egret.Stage;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;
      }

      protected createChildren() {
        super.createChildren();
        // this.skinName = utils.getSkinByClassname('ba.CardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();

        //const bg = new eui.Rect(this.cardWidth, this.cardHeight, 0x0000ff);
        //this.addChild(bg);

        this.cardBack = new MaskedCard(this.cardWidth, this.cardHeight);
        this.addChild(this.cardBack);

        this.cardFace = new FrontCard(this.cardWidth, this.cardHeight);
        this.addChild(this.cardFace);


        this.debugShape = new egret.Shape();
        this.addChild(this.debugShape);
      }

      public initCard() {
        this.cardBack.initCard();
        this.cardFace.initCard();

        this.cardFaceMask = new eui.Rect(this.cardWidth, this.cardHeight, 0xff0000);
        //this.cardFace.cardMask.height = 0;
        //this.cardFace.mask = this.cardFaceMask;
        //this.addChild(this.cardFaceMask);

        this.cardBackMask = new eui.Rect(this.cardWidth, this.cardHeight, 0x00ff00);
        //this.cardBack.mask = this.cardBackMask;
        //this.addChild(this.cardBackMask);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
      }

      protected onTouchBegin(e: egret.TouchEvent) {
        if (this.stage) {
          this.itemStage = this.stage;
          const tx = this.touchX = e.localX;
          const ty = this.touchY = e.localY;
          const cx = this.cardWidth / 2;
          const cy = this.cardHeight / 2;

          //calculate the start point at position x=0, assume intersection on the left side
          //const px = 0;

          //calculate the start point at position x=this.cardWidth, assume intersection on the right side
          const px = this.cardWidth;


          let py = ((ty - cy) / (tx - cx) * (px - cx)) + cy;
          if (py < 0)
            py = 0;
          if (py > this.cardHeight)
            py = this.cardHeight;

          //compute midmpoint M and slope m of PT
          const mx = (tx + px) / 2;
          const my = (ty + py) / 2;
          const m = (py - ty) / (px - tx);

          //compute perpendicular line intersection p1, p2, where p1.x <p2.x
          const k = -1 / m;
          //line equation = y-my = k* (x-mx);

          //test for top intersection
          const pty = 0;
          const ptx = ((pty - my) / k) + mx;

          //test for left intersection
          const plx = 0;
          const ply = k * (plx - mx) + my;

          //test for right intersection
          const prx = this.cardWidth;
          const pry = k * (prx - mx) + my;

          //test for bottom intersection
          const pby = this.cardHeight;
          const pbx = ((pby - my) / k) + mx;

          console.log(ptx, pty, plx, ply, pbx, pby);

          //draw
          const gr = this.debugShape.graphics;
          gr.clear();
          gr.beginFill(0xff0000);
          gr.drawCircle(tx, ty, 8);
          gr.endFill();

          gr.beginFill(0x00ff00);
          gr.drawCircle(cx, cy, 8);
          gr.endFill();

          gr.beginFill(0x0000ff);
          gr.drawCircle(px, py, 8);
          gr.endFill();

          gr.beginFill(0xcccccc);
          gr.drawCircle(mx, my, 8);
          gr.endFill();

          gr.beginFill(0xffff00);
          gr.drawCircle(ptx, pty, 8);
          gr.endFill();

          gr.beginFill(0x00ffff);
          gr.drawCircle(prx, pry, 8);
          gr.endFill();

          gr.beginFill(0xff00ff);
          gr.drawCircle(pbx, pby, 8);
          gr.endFill();


          this.cardFace.x = pbx;
          this.cardFace.y = pby;

          this.cardFace.cardImage.x = pbx - this.cardWidth;
          this.cardFace.rotation = Math.atan(m) * 180 / Math.PI / 2;




          if (this.touchY > this.cardHeight * 0.9) {
            this.itemStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);


            this.itemStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
          }
        }
      }
      protected onTouchMove(e: egret.TouchEvent) {
        const moveX = e.localX;
        const moveY = e.localY;
        const angleA = Math.atan2(moveX, moveY);
        //this.cardFace.cardImage.rotation = -angleA * 180 / Math.PI;
        console.log(this.cardFace.cardImage.rotation);
        const a = true;
        if (a) {
          return;
        }

        const localPos = this.globalToLocal(e.stageX, e.stageY);
        const yDiff: number = this.touchY - localPos.y;
        if (yDiff < 0) {
          //this.cardFaceMask.height = 0;
          //this.cardFace.cardMask.height = 0;
        } else {
          const hShow: number = this.cardHeight - yDiff;
          //this.cardBackMask.height = this.cardHeight - yDiff * 0.5;
          //this.cardBack.cardMask.height = this.cardHeight - yDiff * 0.5;

          this.cardFace.y = this.cardFaceMask.y = this.cardHeight - yDiff;
          //this.cardFaceMask.height = yDiff * 0.5;
          //this.cardFace.cardMask.height = yDiff * 0.5;
        }
      }


      protected onTouchEnd(e: egret.TouchEvent) {
        if (this.itemStage) {
          if (this.itemStage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            this.itemStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
          }
          if (this.itemStage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            this.itemStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
          }
        }
      }
    }
  }
}
