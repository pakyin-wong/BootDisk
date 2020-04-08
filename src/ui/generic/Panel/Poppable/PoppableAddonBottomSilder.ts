namespace we {
  export namespace ui {
    export class PoppableAddonBottomSilder extends PoppableAddon {
      public onOrientationChange() {
        this.updateContentPos();
        if (this.isShow || this.target.content.visible) {
          this.hide(true);
        }
      }

      protected async onShowAnimation() {
        const content = this.target.content;

        // Set attributes for animating
        content.$y = this.target.stage.stageHeight;

        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ $y: this._contentPos.y }, 200)
            .call(resolve);
        });
      }

      protected async onHideAnimation() {
        const content = this.target.content;
        // Set attributes for animating
        content.visible = true;

        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ $y: this.target.stage.stageHeight }, 200)
            .call(resolve);
        });
      }
    }
  }
}
