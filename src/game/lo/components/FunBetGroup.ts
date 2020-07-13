namespace we {
  export namespace lo {
    export class FunBetGroup extends core.BaseEUI {

      public groupType:string = null;
      public groupId:string = null;

      protected items: egret.DisplayObjectContainer;
      protected title: ui.RunTimeLabel;

        constructor() {
            super();
        }

        protected mount() {
          super.mount();
          
          for(var i of this.items.$children) {
            (i as FunBetItem).setupBetId(this.groupType, this.groupId);
          }

          let groupKey = this.groupType.replace('%id%', this.groupId);          
          this.title && (this.title.renderText = () => `${i18n.t('lo_fun_betgroup_' + groupKey)}`);
        }

        protected destroy() {
          super.destroy();
        }
    }
  }
}