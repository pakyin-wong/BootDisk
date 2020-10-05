// TypeScript file
namespace we {
  export namespace utils {
    export function updateEgretSys() {
      // add 'cover' fillmode to Bitmap
      egret.sys.BitmapNodeExtend.super = egret.sys.BitmapNode;
      egret.sys.BitmapNode = egret.sys.BitmapNodeExtend;

      // capture the createTexture function for later enhancement, e.g. use mipmap
      function createTexture(renderContext, bitmapData) {
        const webglrendercontext = renderContext;
        const gl = webglrendercontext.context;
        const texture = gl.createTexture();
        if (!texture) {
          // 先创建texture失败,然后lost事件才发出来..
          webglrendercontext.contextLost = true;
          return;
        }
        texture[egret.glContext] = gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        texture[egret.UNPACK_PREMULTIPLY_ALPHA_WEBGL] = true;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.generateMipmap(gl.TEXTURE_2D);
        return texture;
      }
      egret.sys.createTexture = createTexture;

      function _createTexture(renderContext, width, height, data) {
        const webglrendercontext = renderContext;
        const gl = webglrendercontext.context;
        const texture = gl.createTexture();
        if (!texture) {
          // 先创建texture失败,然后lost事件才发出来..
          webglrendercontext.contextLost = true;
          return null;
        }
        //
        texture[egret.glContext] = gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        texture[egret.UNPACK_PREMULTIPLY_ALPHA_WEBGL] = true;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.generateMipmap(gl.TEXTURE_2D);
        return texture;
      }
      egret.sys._createTexture = _createTexture;
    }

    // modify TouchScroll finish function to set this.currentScrollPos when scroll finish
    // this will affect the scroller animation if user set the scrollPos elsewhere outside TouchScroll. e.g. change viewport.scrollV while scroller is moving
    const touchScrollFinish = eui.sys.TouchScroll.prototype.finish;
    function finish(currentScrollPos, maxScrollPos) {
      this.currentScrollPos = currentScrollPos;
      touchScrollFinish.bind(this)(currentScrollPos, maxScrollPos);
    }
    eui.sys.TouchScroll.prototype.finish = finish;

    egret['web'].WebPlayer.prototype.updateScreenSize = function() {
      const canvas = this.canvas;
      if (canvas['userTyping']) {
        return;
      }
      const option = this.playerOption;
      const screenRect = this.container.getBoundingClientRect();
      let top = 0;
      const boundingClientWidth = screenRect.width;
      let boundingClientHeight = screenRect.height;
      if (boundingClientWidth == 0 || boundingClientHeight == 0) {
        return;
      }
      if (screenRect.top < 0) {
        boundingClientHeight += screenRect.top;
        top = -screenRect.top;
      }
      let shouldRotate = false;
      const orientation = this.stage.$orientation;
      if (orientation != egret.OrientationMode.AUTO) {
        shouldRotate =
          (orientation != egret.OrientationMode.PORTRAIT && boundingClientHeight > boundingClientWidth) ||
          (orientation == egret.OrientationMode.PORTRAIT && boundingClientWidth > boundingClientHeight);
      }
      const screenWidth = shouldRotate ? boundingClientHeight : boundingClientWidth;
      const screenHeight = shouldRotate ? boundingClientWidth : boundingClientHeight;
      egret.Capabilities['boundingClientWidth' + ''] = screenWidth;
      egret.Capabilities['boundingClientHeight' + ''] = screenHeight;
      const stageSize = egret.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, screenWidth, screenHeight, option.contentWidth, option.contentHeight);
      const stageWidth = stageSize.stageWidth;
      const stageHeight = stageSize.stageHeight;
      const displayWidth = stageSize.displayWidth;
      const displayHeight = stageSize.displayHeight;

      egret.sys.DisplayList.$canvasScaleFactor = Math.min(2, Math.max(1, 2600.0 / displayWidth));

      canvas.style[egret['web'].getPrefixStyleName('transformOrigin')] = '0% 0% 0px';
      if (canvas.width != stageWidth) {
        canvas.width = stageWidth;
      }
      if (canvas.height != stageHeight) {
        canvas.height = stageHeight;
      }
      let rotation = 0;
      if (shouldRotate) {
        if (orientation == egret.OrientationMode.LANDSCAPE) {
          rotation = 90;
          canvas.style.top = top + (boundingClientHeight - displayWidth) / 2 + 'px';
          canvas.style.left = (boundingClientWidth + displayHeight) / 2 + 'px';
        } else {
          rotation = -90;
          canvas.style.top = top + (boundingClientHeight + displayWidth) / 2 + 'px';
          canvas.style.left = (boundingClientWidth - displayHeight) / 2 + 'px';
        }
      } else {
        canvas.style.top = top + (boundingClientHeight - displayHeight) / 2 + 'px';
        canvas.style.left = (boundingClientWidth - displayWidth) / 2 + 'px';
      }
      const scalex = displayWidth / stageWidth,
        scaley = displayHeight / stageHeight;

      let canvasScaleX = scalex * egret.sys.DisplayList.$canvasScaleFactor;
      let canvasScaleY = scaley * egret.sys.DisplayList.$canvasScaleFactor;
      if (egret.Capabilities.renderMode == 'canvas') {
        canvasScaleX = Math.ceil(canvasScaleX);
        canvasScaleY = Math.ceil(canvasScaleY);
      }
      const m = egret.Matrix.create();
      m.identity();
      m.scale(scalex / canvasScaleX, scaley / canvasScaleY);
      m.rotate((rotation * Math.PI) / 180);
      const transform = 'matrix(' + m.a + ',' + m.b + ',' + m.c + ',' + m.d + ',' + m.tx + ',' + m.ty + ')';
      egret.Matrix.release(m);
      canvas.style[egret['web'].getPrefixStyleName('transform')] = transform;
      egret.sys.DisplayList.$setCanvasScale(canvasScaleX, canvasScaleY);
      this.webTouchHandler.updateScaleMode(scalex, scaley, rotation);
      this.webInput.$updateSize();
      this.player.updateStageSize(stageWidth, stageHeight); // 不要在这个方法后面修改属性
      // todo
      if (egret.nativeRender) {
        canvas.width = stageWidth * canvasScaleX;
        canvas.height = stageHeight * canvasScaleY;
      }
    };
  }
}
