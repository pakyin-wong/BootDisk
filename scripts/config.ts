/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import { CleanPlugin, CompilePlugin, EmitResConfigFilePlugin, ExmlPlugin, IncrementCompilePlugin, ManifestPlugin, RenamePlugin, TextureMergerPlugin, UglifyPlugin, ZipPlugin } from 'built-in';
import * as path from 'path';
import { BricksPlugin } from './bricks/bricks';
import { CustomPlugin } from './myplugin';
import { WxgamePlugin } from './wxgame/wxgame';

const config: ResourceManagerConfig = {
  buildConfig: params => {
    const { target, command, projectName, version } = params;

    if (command === 'build') {
      const outputDir = '.';
      return {
        outputDir,
        commands: [
          // new EmitResConfigFilePlugin({
          //     output: "resource/default.res.json",
          //     typeSelector: config.typeSelector,
          //     nameSelector: p => path.basename(p).replace(/\./gi, "_"),
          //     groupSelector: p => "preload"
          // }),
          new ExmlPlugin('debug'), // 非 EUI 项目关闭此设置
          new IncrementCompilePlugin(),
        ],
      };
    } else if (command === 'publish') {
      const outputDir = `bin-release/web/${version}`;
      return {
        outputDir,
        commands: [
          new CustomPlugin(),
          new CompilePlugin({ libraryType: 'release', defines: { DEBUG: false, RELEASE: true } }),
          new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
          // new ZipPlugin({
          //   mergeSelector: path => {
          //     // const groups = ['common', 'lobby', 'loading', 'ba', 'dt', 'ro', 'di', 'lw'];
          //     // 如果文件是assets/Button/路径下的， 压缩到assets/but.zip
          //     const platforms = ['d', 'm'];
          //     for (const p of platforms) {
          //       if (path.indexOf(`assets/images/${p}/`) >= 0) {
          //         const groupName = path.split('/')[4];
          //         return `resource/assets/zip/${p}/${groupName}/${groupName}.zip`;
          //       }
          //     }
          //     if (path.indexOf(`assets/images/preload/`) >= 0) {
          //       return `resource/assets/zip/preload.zip`;
          //     }
          //   },
          // }),
          // new EmitResConfigFilePlugin({
          //   output: 'resource/desktop.res.json',
          //   typeSelector: config.typeSelector,
          //   nameSelector: p => {
          //     if (p.indexOf(`assets/zip/m/`) >= 0) {
          //       return '';
          //     } else {
          //       return path.basename(p).replace(/\./gi, '_');
          //     }
          //   },
          //   groupSelector: p => {
          //     const groupMap = {
          //       common: 'common',
          //       loading: 'scene_loading',
          //       lobby: 'scene_lobby',
          //       ba: 'scene_baccarat',
          //       dt: 'scene_dragontiger',
          //       di: 'scene_dice',
          //       ro: 'scene_roulette',
          //       lw: 'scene_luckywheel',
          //     };

          //     // dragonbones
          //     if (p.indexOf('assets/dragonbones/') >= 0) {
          //       const groupName = p.split('/')[3];
          //       return groupMap[groupName];
          //     }
          //     // fonts
          //     if (p.indexOf('assets/fonts/') >= 0) {
          //       return groupMap.loading;
          //     }
          //     // zip
          //     if (p.indexOf(`assets/zip/d/`) >= 0) {
          //       const groupName = p.split('/')[4];
          //       return groupMap[groupName];
          //     }
          //     if (p.indexOf(`assets/zip/preload`) >= 0) {
          //       return groupMap.common;
          //     }
          //     // sounds
          //     if (p.indexOf('assets/sounds/') >= 0) {
          //       return 'sound';
          //     }
          //   },
          // }),
          new UglifyPlugin([
            {
              sources: ['main.js'],
              target: 'main.min.js',
            },
          ]),
          new RenamePlugin({
            verbose: true,
            hash: 'crc32',
            matchers: [{ from: '**/*.js', to: '[path][name]_[hash].[ext]' }],
          }),
          new ManifestPlugin({ output: 'manifest.json' }),
          new CleanPlugin({
            matchers: ['resource/assets/images'],
          }),
        ],
      };
    } else {
      throw new Error(`unknown command : ${params.command}`);
    }
  },

  mergeSelector: path => {
    if (path.indexOf('assets/bitmap/') >= 0) {
      return 'assets/bitmap/sheet.sheet';
    } else if (path.indexOf('armature') >= 0 && path.indexOf('.json') >= 0) {
      return 'assets/armature/1.zip';
    }
  },

  typeSelector: path => {
    if (path.indexOf(`assets/zip/m/`) >= 0) {
      return null;
    }
    const ext = path.substr(path.lastIndexOf('.') + 1);
    const typeMap = {
      jpg: 'image',
      png: 'image',
      webp: 'image',
      json: 'json',
      fnt: 'font',
      pvr: 'pvr',
      mp3: 'sound',
      zip: 'zip',
      sheet: 'sheet',
      exml: 'text',
    };
    let type = typeMap[ext];
    if (type === 'json') {
      if (path.indexOf('sheet') >= 0) {
        type = 'sheet';
      } else if (path.indexOf('movieclip') >= 0) {
        type = 'movieclip';
      }
    }
    return type;
  },
};

export = config;
