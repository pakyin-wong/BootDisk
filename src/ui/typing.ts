// This file contains we.ui typing definitions.
namespace we {
  export namespace ui {
    // Components
    export interface ILobbyRoad {
      // updateRoadData(roadmapData: any);
      drawGridBg(width: number, height: number);
      updateLobbyRoadData(roadmapData: any);
      updateSideBarRoadData(roadmapData: any);
      setTableInfo?(tableInfo: data.TableInfo);
      clearRoadData?();
    }

    export interface IAdvancedRoad {
      tableInfo;
      analysis: IAnalysis;
      update(roadmapData: any);
      clearRoadData?();
    }

    export interface IAnalysis {
      tableId: string;
      advancedRoad: IAdvancedRoad;
      updateTableBetInfo();
      updateRoad();
    }

    export interface HistoryCardHolder {
      setCards(tableId: string);
      setNumber(number: number);
      setToggler(toggler);
      setValue(gameData);
      show();
      hide();
      update(gameData, tableId);
    }

    export interface IListItemHelper {
      // updateRoadData(roadmapData: any);
      generateTableLayer?(node: eui.Component): TableLayer;
      generateChipLayer?(node: eui.Component): ChipLayer;
      generateRoadmap(node: eui.Component): ILobbyRoad & eui.Component;
      generateAdvancedRoad?(node: eui.Component): IAdvancedRoad & eui.Component;
      generateAnalysis?(node: eui.Component): IAnalysis & eui.Component;
      generateResultMessage?(node: eui.Component): IGameResultMessage & eui.Component;
      generateResultDisplay?(node: eui.Component): IResultDisplay & eui.Component;
      getPlaceholder?(): string;
      getAdvancedPlaceholder?(): string;
    }

    export interface IRunTimeComponent extends egret.DisplayObject {
      render(): void;
    }

    export interface IResultDisplay {
      updateResult(gameData: data.GameData, chipLayer?: ui.ChipLayer, isInit?: boolean);
      reset();

      visible: boolean;
    }

    export interface IQuickBetAnimButton {
      tween(direction: boolean, isAnimate?: boolean);
    }

    export interface IBetChip {
      getValue();
      setValue(value: number, index: number); // update the chip appearance according to the value
      draw(noAnim?: boolean);
      dispose?();
      highlight: boolean; // indicate whether the chip is being selected
      type: number;
      chipScale: number;
    }

    // Opt
    export interface IOverlayOpt {
      class: string;
      replace?: boolean;
      args?: any[];
      dismissOnClickOutside?: boolean;
      noDimmer?: boolean;
      showOptions?: {
        originW: number;
        originH: number;
        originX: number;
        originY: number;
      };
      showSFX?: string;
      hideSFX?: string;
    }

    export interface IMessageDialogOpt {
      [button: string]: {
        text: string;
        onClick?: () => Promise<any>;
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
      close: egret.DisplayObject;
      toggler: egret.DisplayObject;
      setToggler(toggler: egret.DisplayObject, onToggleCallback?: (value: boolean) => void);
      removeToggler(toggler: egret.DisplayObject);
    }

    export interface IDraggable {
      moveArea: egret.DisplayObject;
      panelName: string;
    }

    export interface IDismissable {
      dismissPosX: number;
      dismissPosY: number;
      dismissVisible: boolean;
      dismissAlpha: number;
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

    // Notification
    export interface INotificationController {
      notificationList: data.Notification[];
      dismissFocus(isRemoved: boolean);
      setFocus(holder: NotificationItemHolder);
      showNextNotification();
      dismissNotification(type: number);
    }

    export interface IMinimizedTableLayer {
      updateBetLabel(isinit: boolean, betInfo?: any);
    }
  }
}
