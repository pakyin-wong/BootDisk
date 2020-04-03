namespace we {
  export namespace ui {
    export class PoppableAddonSilder extends PoppableAddon {
      // protected async onShowAnimation() {
      //   const content = this.target.content;

      //   // Set attributes for animating
      //   content.$x = -1 * content.width;

      //   await new Promise((resolve, reject) => {
      //     egret.Tween.get(content)
      //       .to({ $x: this._contentPos.x }, 200)
      //       .call(resolve);
      //   });
      // }

      protected async onShowAnimation() {
        const content = this.target.content;

        if (env.orientation === egret.OrientationMode.PORTRAIT) {
          // Set attributes for animating
          content.$x = -1 * content.width;

          await new Promise((resolve, reject) => {
            egret.Tween.get(content).to({ $x: this._contentPos.x }, 200).call(resolve);
          });
        } else {
          // Set attributes for animating
          content.$y = content.height;

          await new Promise((resolve, reject) => {
            egret.Tween.get(content).to({ $y: this._contentPos.y }, 500).call(resolve);
          });
        }
      }

      // protected async onHideAnimation() {
      //   const content = this.target.content;
      //   // Set attributes for animating
      //   content.visible = true;

      //   await new Promise((resolve, reject) => {
      //     egret.Tween.get(content)
      //       .to({ $x: -1 * content.width }, 200)
      //       .call(resolve);
      //   });
      // }

      protected async onHideAnimation() {
        const content = this.target.content;
        // Set attributes for animating
        content.visible = true;
        if (env.orientation === egret.OrientationMode.PORTRAIT) {
          await new Promise((resolve, reject) => {
            egret.Tween.get(content)
              .to({ $x: -1 * content.width }, 200)
              .call(resolve);
          });
        } else {
          await new Promise((resolve, reject) => {
            egret.Tween.get(content).to({ $y: content.height }, 500).call(resolve);
          });
        }
      }
    }
  }
}
