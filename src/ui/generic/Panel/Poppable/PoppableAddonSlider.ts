namespace we {
  export namespace ui {
    export class PoppableAddonSilder extends PoppableAddon {
      protected async onShowAnimation() {
        const content = this.target.content;

        // Set attributes for animating
        content.$x = -1 * content.width;

        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ $x: this._contentPos.x }, 200)
            .call(resolve);
        });
      }

      protected async onHideAnimation() {
        const content = this.target.content;
        // Set attributes for animating
        content.visible = true;

        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ $x: -1 * content.width }, 200)
            .call(resolve);
        });
      }
    }
  }
}
