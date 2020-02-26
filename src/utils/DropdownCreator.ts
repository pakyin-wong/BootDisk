namespace we {
  export namespace utils {
    export class DropdownCreator {
      public static new(opt: ui.IDropdownOptM) {
        if (!env.isMobile) {
        } else {
          const _toggler = opt.toggler;

          _toggler['mDropdownItem'] = opt;

          const toggleCallback = function() {
            dir.evtHandler.createDropDown(this['mDropdownItem']);
          };
          _toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, toggleCallback, _toggler);

          const selectedCallback = function(e) {
            this['mDropdownItem'].selected = e.data;
          };
          _toggler.addEventListener('DROPDOWN_ITEM_CHANGE', selectedCallback, _toggler);

          const removeCallback = function() {
            this.removeEventListener('DROPDOWN_ITEM_CHANGE', selectedCallback, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, toggleCallback, this);
          };
          _toggler.once(eui.UIEvent.REMOVED_FROM_STAGE, removeCallback, _toggler);

          if (opt.review) {
            const source = opt.arrCol.source;
            for (const data of source) {
              if (data.key === opt.selected || data === opt.selected) {
                const key = data.key ? data.key : data;
                opt.review.renderText = data.renderText ? data.renderText : () => key;
                break;
              }
            }
          }
        }
      }
    }
  }
}
