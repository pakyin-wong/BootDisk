// TypeScript file
namespace we {
  export namespace ui {
    export class ImageSliderBullet extends eui.Group {
      protected _imageSlider: ImageSlider;
      protected _selectedIndex: number = 0;

      public BulletItemClass: any;
      public BulletItemSkinname: string = 'SliderBulletItemSkin';

      protected _bullets: ImageSliderBulletItem[] = [];

      constructor() {
        super();
        this.BulletItemClass = ImageSliderBulletItem;
      }

      protected childrenCreated() {
        super.childrenCreated();
        const hLayout = new eui.HorizontalLayout();
        hLayout.gap = 6;
        this.layout = hLayout;
        this.refresh();
      }

      public set imageSlider(val: ImageSlider) {
        this._imageSlider = val;
      }
      public get imageSlider(): ImageSlider {
        return this.imageSlider;
      }

      public refresh() {
        if (!this._imageSlider) return;
        // update bullet count if count is not equal to slideCount
        if (this._bullets.length !== this._imageSlider.slideCount) {
          this.removeChildren();
          this._bullets = Array.apply(null, {length: this._imageSlider.slideCount}).map((d, idx)=> {
            const bullet = new this.BulletItemClass(idx, this._imageSlider);
            bullet.skinName = this.BulletItemSkinname;
            this.addChild(bullet);
            return bullet;
          });
        }
        this._imageSlider.slides.map((slide: core.IRemoteResourceItem, idx)=>{
          const bullet = this._bullets[idx];
          bullet.enabled = slide.loaded;
          bullet.selected = this._imageSlider.selectedIndex === idx;
        });
      }
    }

    export class ImageSliderBulletItem extends eui.Component {
      protected _enabled: boolean = false;
      protected _selected: boolean = false;
      protected _body: eui.Component;

      protected _index: number;
      protected _imageSlider: ImageSlider;
      protected _colorAttr: string = ''; 

      public selectedColor: number = 0xb58965;
      public normalColor: number = 0x979797;
      public disabledColor: number = 0xa7a7a7;

      constructor(idx: number, imageSlider: ImageSlider) {
        super();
        this._index = idx;
        this._imageSlider = imageSlider;
      }

      protected childrenCreated() {
        super.childrenCreated();
        const attrs = ['color','fillColor'];
        if (this._body) {
          for (const attr of attrs) {
            if (this._body[attr] !== undefined) {
              this._colorAttr = attr;
              break;
            }
          }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
      }

      protected onTap(evt: egret.TouchEvent) {
        if (this.enabled) {
          this._imageSlider.selectedIndex = this._index;
        }
      }

      public $setEnabled(val: boolean) {
        const result = super.$setEnabled(val);
        if (this._body) {
          this._body[this._colorAttr] = this.enabled? this._selected? this.selectedColor: this.normalColor: this.disabledColor;
        }
        return result;
      }

      public $setSelected(val: boolean) {
        this._selected = val;
        if (this._body) {
          this._body[this._colorAttr] = this.enabled? this._selected? this.selectedColor: this.normalColor: this.disabledColor;
        }
      }

      public get selected(): boolean {
        return this._selected;
      }

      public set selected(val: boolean) {
        this.$setSelected(val);
      }
    }
  }
}