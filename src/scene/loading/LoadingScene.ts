module scene {
    export class LoadingScene extends BaseScene {

        private textField: egret.TextField;

        public mount() {
            this.createView();
        }

        public destroy() {
            this.removeChildren();
        }

        private createView(): void {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 300;
            this.textField.width = 480;
            this.textField.height = 100;
            this.textField.textAlign = "center";
        }
    }
}