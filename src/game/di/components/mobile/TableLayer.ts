// TypeScript file
namespace we {
  export namespace di {
    export class MobileTableLayer extends we.di.TableLayer {
      // group

      protected createMapping() {
        super.createMapping();
        this._groupHoverImageMapping = {};
        Object.keys(we.di.BETFIELD_IMAGE_MAPPING).map(value => {
          this._groupHoverImageMapping[value] = we.di.MOBILE_BETFIELD_IMAGE_MAPPING[value];
        });
      }

      public onRollover(fieldName: string) {
        const group = this._groupMapping[fieldName];
        const image = new eui.Image();
        image.name = 'image';
        image.alpha = 0.5;
        image.percentWidth = image.percentHeight = 100;
        image.source = this._groupHoverImageMapping[fieldName];
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

      public async flashFields(fieldName: string) {}
    }
  }
}
