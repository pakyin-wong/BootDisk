class ZipProcessor implements RES.processor.Processor {
  private blobUrlsMap: any = {};

  public static currentProcess: any;

  public async onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<any> {
    if (this.blobUrlsMap[resource.name]) {
      // already loaded
      return Promise.resolve(this.blobUrlsMap[resource.name]);
    }
    this.blobUrlsMap[resource.name] = [];
    const blobUrls = this.blobUrlsMap[resource.name];
    while (ZipProcessor.currentProcess) {
      await we.utils.sleep(1000);
    }
    console.log(resource.name + ' start');
    const res = await host.load(resource, RES.processor.BinaryProcessor);
    ZipProcessor.currentProcess = resource.name;
    let { files }: any = await JSZip.loadAsync(res);
    try {
      files = Object.keys(files)
        .filter((name: string) => name.indexOf('_') !== 0)
        .map(name => files[name]);
      const blobs = await Promise.all<Blob>(files.map((file: JSZip.JSZipObject) => file.async('blob')));
      // const blobs = [];
      // let index = 0;
      // for (const file of files) {
      //   const blob = await file.async('blob');
      //   const blobUrl = await this.createResource(blobUrls, blob, files[index]);
      //   const name = blobUrl.name;
      //   const tex = await RES.getResAsync(name);
      //   index++;
      // }
      // create resource
      await Promise.all(blobs.map((blob: Blob, index) => this.createResource(blobUrls, blob, files[index])));
      // load the resource for later use
      await Promise.all(
        blobUrls.map(({ name }) => {
          return RES.getResAsync(name);
        })
      );
      console.log(resource.name + ' loaded');
      ZipProcessor.currentProcess = null;

      return Promise.resolve(blobUrls);
    } catch (err) {
      console.log(err);
    }
    // console.log('load json', resource.url)
    // if (resource.url.indexOf("config/") == -1) {
    //     return host.load(resource, RES.processor.BinaryProcessor)
    // }
    // else {
    //     if (!this.totalContent) {
    //         const name = "total_json";
    //         if (!RES.hasRes(name)) {
    //             const url = "total.json";
    //             const type = 'json';
    //             const resource = { name, url, type };
    //             RES.$addResourceData(resource);
    //             this.totalContent = await RES.getResAsync(name)
    //         }
    //         else {
    //             await RES.getResAsync(name)
    //         }
    //     }
    //     return this.totalContent[resource.url];
    // }
  }

  public renderSvgToPng(blob) {
    return new Promise((resolve, reject) => {
      // Safari must use Image src with DataURL to draw in canvas
      // ObjectURL (blob) will not work...
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          let svgDrawingCanvas = document.createElement('canvas');
          const ctx = svgDrawingCanvas.getContext('2d');
          svgDrawingCanvas.width = image.width * window['egretPixelRatio'];
          svgDrawingCanvas.height = image.height * window['egretPixelRatio'];
          ctx.imageSmoothingEnabled = false;
          ctx.clearRect(0, 0, svgDrawingCanvas.width, svgDrawingCanvas.height);
          ctx.setTransform(window['egretPixelRatio'], 0, 0, window['egretPixelRatio'], 0, 0);
          ctx.drawImage(image, 0, 0);
          window.URL.revokeObjectURL(image.src);
          svgDrawingCanvas.toBlob(blob => {
            const url = window.URL.createObjectURL(blob);
            svgDrawingCanvas = null;
            resolve(url);
          });
        };
        image.onerror = err => reject(err);
        image.src = reader.result;
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(blob);
    });
  }

  public async createResource(blobUrls: any, blob: Blob, file: any) {
    const name = file.name
      .split('\\')
      .pop()
      .replace(/\./gi, '_');
    let url;
    const ext = file.name.split('.').pop();
    switch (ext) {
      case 'svg': {
        // convert to png
        blob = blob.slice(0, blob.size, 'image/svg+xml');
        url = await this.renderSvgToPng(blob);
        break;
      }
      default: {
        url = window.URL.createObjectURL(blob);
        break;
      }
    }
    const type = RES.ResourceItem.TYPE_IMAGE;
    const resource = { name, url, type };
    RES.$addResourceData(resource);
    blobUrls.push({ name, url });
    return Promise.resolve({ name, url });
  }

  public async onRemoveStart(host: RES.ProcessHost, resource: RES.ResourceInfo): Promise<any> {
    if (this.blobUrlsMap[resource.name]) {
      this.blobUrlsMap[resource.name].forEach(({ name, url }) => {
        RES.destroyRes(name, true);
        URL.revokeObjectURL(url);
      });
      delete this.blobUrlsMap[resource.name];
    }
  }
}
