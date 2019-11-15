namespace we {
	export namespace ui {
		export interface ISwipeable {
			moveArea: egret.DisplayObject;
			onSwipe(): void;
		}

		export enum SwipeDirection {
			left,
			right,
			top,
			down,
			horizontal,
			vertical,
		}
		/**
		 * DisplayObject that implement this addon will be able to be swipe to trigger onSwipe() 
		 */
		export class SwipeableAddon extends DisplayObjectAddon {
			public swipeDirection: SwipeDirection = SwipeDirection.right;

			constructor(displayObject: egret.DisplayObject & ISwipeable) {
				super(displayObject);
			}



		}
	}
}