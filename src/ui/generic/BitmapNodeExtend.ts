// TypeScript file
namespace egret {
  export namespace sys {
    export class BitmapNodeExtend extends BitmapNode {
      public static super: any;

      public static drawClipImageExtend(node, scale, bitmapX, bitmapY, scaledBitmapW, scaledBitmapH, offsetX, offsetY, destW, destH, startX = 0, startY = 0) {
        if (startX === void 0) {
          startX = 0;
        }
        if (startY === void 0) {
          startY = 0;
        }
        let offset = offsetX + scaledBitmapW - destW;
        if (offset > 0) {
          scaledBitmapW -= offset;
        }
        offset = offsetY + scaledBitmapH - destH;
        if (offset > 0) {
          scaledBitmapH -= offset;
        }
        node.drawImage(bitmapX, bitmapY, scaledBitmapW / scale, scaledBitmapH / scale, startX, startY, scaledBitmapW, scaledBitmapH);
      }

      public static $updateTextureData(
        node,
        image,
        bitmapX,
        bitmapY,
        bitmapWidth,
        bitmapHeight,
        offsetX,
        offsetY,
        textureWidth,
        textureHeight,
        destW,
        destH,
        sourceWidth,
        sourceHeight,
        fillMode,
        smoothing
      ) {
        if (!image) {
          return;
        }
        const scale = egret.$TextureScaleFactor;
        node.smoothing = smoothing;
        node.image = image;
        node.imageWidth = sourceWidth;
        node.imageHeight = sourceHeight;
        if (fillMode === 'cover') {
          const tsX = (destW / textureWidth) * scale;
          const tsY = (destH / textureHeight) * scale;
          const ts = tsX > tsY ? tsX : tsY;
          const displayW = destW;
          const displayH = destH;
          const scaledBitmapW = bitmapWidth * ts;
          const scaledBitmapH = bitmapHeight * ts;
          bitmapX = ((scaledBitmapW - displayW) * 0.5) / ts;
          bitmapY = ((scaledBitmapH - displayH) * 0.5) / ts;
          BitmapNodeExtend.drawClipImageExtend(node, ts, bitmapX, bitmapY, scaledBitmapW, scaledBitmapH, offsetX, offsetY, displayW, displayH);
          return;
        }
        return BitmapNodeExtend.super.$updateTextureData(
          node,
          image,
          bitmapX,
          bitmapY,
          bitmapWidth,
          bitmapHeight,
          offsetX,
          offsetY,
          textureWidth,
          textureHeight,
          destW,
          destH,
          sourceWidth,
          sourceHeight,
          fillMode,
          smoothing
        );
      }
    }
  }
}
