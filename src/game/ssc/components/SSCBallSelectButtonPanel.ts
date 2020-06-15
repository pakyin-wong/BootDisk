// TypeScript file
namespace we {
  export namespace ssc {
    export class SSCBallSelectButtonPanel extends we.ui.Panel {
        
      protected _buttonGroup : eui.Group;

      protected _bigTagGroup : eui.Group;
      protected _smallTagGroup : eui.Group;

      protected _bigBetType : string = "FiveStar";
      protected _smallBetType : string = "DirectSelection";

      protected _buttons ;

      constructor(skin: string = null) {
        super(skin);
      }

      protected childrenCreated(){
          super.childrenCreated();
      }

      protected mount(){

      }

      protected initComponents(){
          for(let i = 0;i < SelectionMapping.length;i++)
          {
            let image : eui.Image = new eui.Image();
            image.source = "";
                      
          }
      }
    }
  }
}