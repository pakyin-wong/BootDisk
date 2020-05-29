var egret;
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var videoIndex = videoIndex || 0;
        var WebFlvVideo = (function (_super) {
            __extends(WebFlvVideo, _super);
            /**
             * @inheritDoc
             */
            function WebFlvVideo(url, cache) {
                if (cache === void 0) {
                    cache = true;
                }
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                // _this.loaded = false;
                /**
                 * @private
                 */
                // _this.closed = false;
                /**
                 * @private
                 */
                _this.heightSet = NaN;
                /**
                 * @private
                 */
                _this.widthSet = NaN;
                /**
                 * @private
                 * pc上视频卡住的时候不能暂停
                 */
                // _this.waiting = false;
                /**
                 * @private
                 * 用户是否设置了 pause
                 */
                _this.userPause = false;
                /**
                 * @private
                 * 用户是否设置了 play
                 */
                _this.userPlay = false;
                _this.isPlayed = false;

                // if (_this.posterData) {
                //     _this.posterData.width = _this.getPlayWidth();
                //     _this.posterData.height = _this.getPlayHeight();
                // }

                _this.$renderNode = new egret.sys.BitmapNode();
                // _this.src = url;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.loadPoster, _this);
                if (url) {
                    _this.load();
                }
                return _this;
            }
            WebFlvVideo.prototype.createNativeDisplayObject = function () {
                this.$nativeDisplayObject = new egret_native.NativeDisplayObject(1 /* BITMAP */ );
            };
            WebFlvVideo.prototype.setBrowser = function (name) {
                this.browserName = name;
            };
            /**
             * @inheritDoc
             */
            WebFlvVideo.prototype.load = function (url, cache) {
                var _this = this;
                if (cache === void 0) {
                    cache = true;
                }
                if (true && !url) {
                    egret.$error(3002);
                }
                // if (this.src == url) {
                //     return;
                // }
                this.src = url;

                // create a canvas for video image capture
                var videoCanvas;
                var videoCanvasId = this.videoCanvasId || 'videoCanvas' + videoIndex++;
                if (!this.videoCanvas || !this.player) {
                    videoCanvas = document.createElement('canvas');
                    videoCanvas.id = videoCanvasId;
                    videoCanvas.width = 640;
                    videoCanvas.height = 360;
                    videoCanvas.style.display = 'none';
                    this.videoCanvas = videoCanvas;
                    this.videoCanvasId = videoCanvasId;
                    document.body.appendChild(videoCanvas);

                    // This workaround is to solve the flickering of playing video in IE/Edge
                    // Method: Wrapping one more canvas on the video
                    if(this.browserName && this.browserName === 'Edge'){
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.id = 'tempCanvas' + this.videoCanvas.id 
                        tempCanvas.width = 640;
                        tempCanvas.height = 360;
                        tempCanvas.style.display = 'none';
                        document.body.appendChild(tempCanvas);
                        this.tempCanvas = tempCanvas
                    }

                    if (this.player) {
                        this.player.stop();
                    }
                    try {
                        var player1 = new WFPlayer()
                        WFPlayer.debug(false)
                        player1.enableAudio(true)
                        player1.setView(videoCanvasId)
                        player1.setScaleMode(1)
                        player1.setBufferTime(1000)
                        player1.volume = 1;
                        _this.startFunc1 = function () {
                            player1.stop()
                            if (this.playTimeoutId) {
                                clearTimeout(this.playTimeoutId);
                                this.playTimeoutId = null;
                            }
                            this.playTimeoutId = setTimeout(() => {
                                player1.start(url)
                                egret.startTick(this.markDirty, this);
                            }, 500)
                        }
                        _this.stopFunc1 = function () {
                            player1.stop()
                            if (this.playTimeoutId) {
                                clearTimeout(this.playTimeoutId);
                                this.playTimeoutId = null;
                            }
                            egret.stopTick(this.markDirty, this);
                        }
                        this.player = player1;
                    } catch(err) {
                        console.log('video not support');
                    }
                }

            };

            /**
             * @inheritDoc
             */
            WebFlvVideo.prototype.play = function () {
                if (!this.player) return;
                this.userPause = false;
                this.userPlay = true;
                this.isPlayed = true;
                this.startFunc1()
            };
            /**
             * @inheritDoc
             */
            WebFlvVideo.prototype.stop = function () {
                if (!this.player) return;
                this.userPause = true;
                this.userPlay = false;
                this.stopFunc1();

                const gl = this.videoCanvas.getContext('webgl');
                gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

                this.markDirty();
            };

            /**
             * @inheritDoc
             */
            WebFlvVideo.prototype.reset = function () {
                this.stop();
            };


            Object.defineProperty(WebFlvVideo.prototype, "volume", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.player)
                        return 1;
                    return this.player.volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.player)
                        return;
                    this.player.setVolume(value);
                    console.log(this.player.volume, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebFlvVideo.prototype, "canvasElement", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.videoCanvas)
                        return null;
                    return this.videoCanvas;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebFlvVideo.prototype, "bitmapData", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.isPlayed)
                        return null;
                    if (!this._bitmapData) {
                        if(this.browserName && this.browserName === 'Edge'){
                            this._bitmapData = new egret.BitmapData(this.tempCanvas);
                        }else{
                            this._bitmapData = new egret.BitmapData(this.videoCanvas);
                        }
                        
                        this._bitmapData.$deleteSource = false;
                    }
                    return this._bitmapData;
                },
                enumerable: true,
                configurable: true
            });
            WebFlvVideo.prototype.loadPoster = function () {
                var _this = this;
                var poster = this.poster;
                if (!poster)
                    return;
                var imageLoader = new egret.ImageLoader();
                imageLoader.once(egret.Event.COMPLETE, function (e) {
                    var posterData = imageLoader.data;
                    _this.posterData = imageLoader.data;
                    _this.$renderDirty = true;
                    _this.posterData.width = _this.getPlayWidth();
                    _this.posterData.height = _this.getPlayHeight();
                    if (egret.nativeRender) {
                        var texture = new egret.Texture();
                        texture._setBitmapData(_this.posterData);
                        _this.$nativeDisplayObject.setTexture(texture);
                    }
                }, this);
                imageLoader.load(poster);
            };
            /**
             * @private
             */
            WebFlvVideo.prototype.$measureContentBounds = function (bounds) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if (bitmapData) {
                    bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
                } else if (posterData) {
                    bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
                } else {
                    bounds.setEmpty();
                }
            };
            WebFlvVideo.prototype.getPlayWidth = function () {
                if (!isNaN(this.widthSet)) {
                    return this.widthSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.width;
                }
                if (this.posterData) {
                    return this.posterData.width;
                }
                return NaN;
            };
            WebFlvVideo.prototype.getPlayHeight = function () {
                if (!isNaN(this.heightSet)) {
                    return this.heightSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.height;
                }
                if (this.posterData) {
                    return this.posterData.height;
                }
                return NaN;
            };
            /**
             * @private
             */
            WebFlvVideo.prototype.$updateRenderNode = function () {
                var node = this.$renderNode;
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                var width = this.getPlayWidth();
                var height = this.getPlayHeight();
                if (!this.isPlayed || !bitmapData) {
                    node.image = posterData;
                    node.imageWidth = width;
                    node.imageHeight = height;
                    node.drawImage(0, 0, posterData.width, posterData.height, 0, 0, width, height);
                } else if (bitmapData) {
                    if(this.tempCanvas){
                        this.tempCanvas.getContext('2d').drawImage(this.videoCanvas,0,0)                        
                    }

                    node.image = bitmapData;
                    node.imageWidth = bitmapData.width;
                    node.imageHeight = bitmapData.height;
                    egret.WebGLUtils.deleteWebGLTexture(bitmapData.webGLTexture);
                    bitmapData.webGLTexture = null;

                    node.drawImage(0, 0, bitmapData.width, bitmapData.height, 0, 0, width, height);
                }
            };
            WebFlvVideo.prototype.markDirty = function () {
                this.$renderDirty = true;
                return true;
            };
            /**
             * @private
             * 设置显示高度
             */
            WebFlvVideo.prototype.$setHeight = function (value) {
                this.heightSet = value;
                if (this.userPause) {
                    var self_1 = this;
                    this.$renderDirty = true;
                    window.setTimeout(function () {
                        self_1.$renderDirty = false;
                    }, 200);
                }
                _super.prototype.$setHeight.call(this, value);
            };
            /**
             * @private
             * 设置显示宽度
             */
            WebFlvVideo.prototype.$setWidth = function (value) {
                this.widthSet = value;
                if (this.userPause) {
                    var self_2 = this;
                    this.$renderDirty = true;
                    window.setTimeout(function () {
                        self_2.$renderDirty = false;
                    }, 200);
                }
                _super.prototype.$setWidth.call(this, value);
            };
            Object.defineProperty(WebFlvVideo.prototype, "paused", {
                get: function () {
                    return this.userPause;
                },
                enumerable: true,
                configurable: true
            });
            WebFlvVideo.$videoIndex = WebFlvVideo.$videoIndex || 0;
            return WebFlvVideo;
        }(egret.DisplayObject));
        web.WebFlvVideo = WebFlvVideo;
        __reflect(WebFlvVideo.prototype, "egret.web.WebFlvVideo", ["egret.FlvVideo", "egret.DisplayObject"]);
        egret.FlvVideo = WebFlvVideo;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
