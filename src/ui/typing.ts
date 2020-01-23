// This file contains we.ui typing definitions.
namespace we {
  export namespace ui {
    // Components
    export interface IRunTimeComponent extends egret.DisplayObject {
      render(): void;
    }

    export interface IResultDisplay {
      updateResult(gameData: data.GameData);
      reset();

      visible: boolean;
    }

    export interface IQuickBetAnimButton {
      tween(direction: boolean, isAnimate?: boolean);
    }

    export interface IBetChip {
      getValue();
      setValue(value: number, index: number); // update the chip appearance according to the value
      draw();
      highlight: boolean; // indicate whether the chip is being selected
      type: number;
    }

    // Opt
    export interface IOverlayOpt {
      class: string;
      args?: any[];
    }

    export interface IMessageDialogOpt {
      [button: string]: {
        text: string;
        onClick?: () => Promise<void>;
      };
    }

    // Panel
    export interface ITransitable {
      content: egret.DisplayObject;
    }

    export interface IDropdown {
      dropdownScroller: ui.Scroller;
    }

    export interface ISwipeable {
      moveArea: egret.DisplayObject;
      content: egret.DisplayObject;
      onSwipeFinished(): void;
    }

    export interface IPoppable {
      content: egret.DisplayObject;
      close: eui.UIComponent;
      toggler: egret.DisplayObject;
      setToggler(toggler: egret.DisplayObject, onToggleCallback?: (value: boolean) => void);
      removeToggler(toggler: egret.DisplayObject);
    }

    export interface IDraggable {
      moveArea: egret.DisplayObject;
      panelName: string;
    }

    export interface IAutoRemove {
      content: egret.DisplayObject;
      removeSelf: (isAnimate?: boolean) => void;
    }

    // Scroller
    export interface ICollapsible {
      setToggler(toggler: egret.DisplayObject, onToggleCallback?: (value: boolean) => void);
      removeToggler(toggler: egret.DisplayObject);
    }
  }
}
