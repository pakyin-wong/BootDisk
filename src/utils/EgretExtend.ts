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
  }
}
