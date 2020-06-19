# fe-game-client-egret
This is the game client for World Entertainment.

## content
- [Live Game Resources](#live-game-resource)
- [Live Game Asset](#live-game-asset)
- [Lottery Resources](#lottery-resource)
- [Lottery Asset](#lottery-asset)

## Roadmap

### Tasks
- Disconnect handling
- Video
- Tooltips
- UI Tutorial
- Performance Optimization
- Layout update

### testing tasks
- import [spine](https://github.com/fightingcat/egret-spine) animation 
- import dragonbones mesh animation

### If you have time, please periodically
- tidy up the skin folder
- clean up deprecated class

## Publish
To build the project, please use the publish.sh

```
./publish.sh [target_platform staging|production|testing]
```

## Notification
PLAYER_BET_INFO_UPDATE
backend will send a total bet result for each table
Data: Bet amount / Total win amount 
Status: only after bet / clearance
if (clearance) then we send out Notification.

GOODROAD_LIST_UPDATE
Full List.
Tableid and goodroad id matched. Event will be dispatched from backend.
if (list has new goodroad) we send out Notification.

## Install Egret for development environment
### MacOS
1. Install Egret Launcher. (Don't install Egret Wing solely.)
2. Install Egret Wing and Egret Engine(5.2.29).
3. Install optipng and pngquant for image compression
4. Install npm
5. Install the following programs
```
npm i -g tslint prettier typescript
npm i -g cross-zip cross-zip-cli
npm i -g optipng-bin pngquant-bin
npm i -g @ffflorian/jszip-cli
npm i -g jpegoptim-bin
```

### Windows
0. Please check that your user folder name "C:\Users\xxx" has no space.
1. Install Egret Launcher. (Don't install Egret Wing solely.)
2. Install Egret Wing and Egret Engine(5.2.29).
3. Download and install bash from http://www.msys2.org/
4. Set Bash in System Properties -> PATH
5. Install npm
6. Install the following programs
```
npm i -g tslint prettier typescript
npm i -g cross-zip cross-zip-cli
npm i -g optipng-bin pngquant-bin
npm i -g @ffflorian/jszip-cli
npm i -g jpegoptim-bin
```

### SpriteSheet 
Image assets are packed into spritesheet before load by the game client. To add, remove, or update images. Please follow the steps.
1. images can be added, removed, or updated in /resource/assets/images
2. for those images you don't want to pack to spritesheet, place them under /resource/assets/nmimages
3. edit the texturepacker.config.json if necessary (i.e. if you want to add another spritesheet or change the scale of the exported png)
4. run texturepack.sh, exported spritesheet will locate at /resource/assets/spritesheets
5. check and update if necessary the desktop.prod.res.json and mobile.prod.res.json to see if the subkeys are updated (sometimes you need to refresh the spritesheet to load the latest subkeys)


### Pre-publish
There are few steps needed to be taken before publish
1. generate the spritesheet (Please see [SpriteSheet](#spriteSheet))
2. zip all the dragonbone related json, run compressdbjson.sh (you may edit the .zipdb.config.json for more control)
3. check if the output zip file (resource/assets/zip/dbjson.zip) is added to desktop.prod.res.json and mobile.prod.res.json
4. Ready to build

## Testing Site
1. [Development](https://dev-web-game-fe.wehosts247.com/)

2. [Staging](https://web-game-fe.wehosts247.com/)

## Auto Dealer
1. [Development](http://18.139.237.86:8901/?checked=true&uid=H003&local=test)

2. [Staging](http://18.139.237.86:8901/?checked=true&uid=H003)

## Live Game Resource
- [Slack for whole team](https://perfectgaming.slack.com/)
- [Trello Task List](https://trello.com/b/ulT0EbaT/pg-live-game-frontend-tasks)
- [Frontend Documents](https://drive.google.com/drive/u/0/folders/1HHHJ0gJwfynMjYndl5te1XN4agXu-vn6)
- [Auto Dealer](http://18.139.237.86:8901/?checked=true)
- [Invision Template](https://projects.invisionapp.com/prototype/Quick-Bet-ck3dwku8c00f0el01k01o5kam/)
- [Zeplin Template](https://app.zeplin.io/project/5d8d9c1ec2f4dd026286ee4e/dashboard)
- [Frontend MQTT Library (PlayerClient)](https://github.com/PGITAb/fe-lib-player-client-js)

- [Localization](https://docs.google.com/spreadsheets/d/1G_UuP8YY-f9LVLlT8l7_3n31NbQ2p6L5-2AWhQdbJKk/edit?ts=5eb92386#gid=945429433)
- [發送現場驗證](https://docs.google.com/document/d/1t95ChIAEF8qaDjjNGctLC8_rrXgayfzQqnIPao6MXSg/edit?ts=5e995758)
- [bet area button rules (rebet & double)](https://docs.google.com/document/d/138UwHLBXfloAOWvXo-21BHkUjwdByYcl8ZtbCtN48BI/edit?ts=5e995d51)

- [Game Lobby Requirement](https://docs.google.com/document/d/1NHxG_0LELvbGfJeBq_qTr9uNwYEAq-1oimygOxr6HJc/edit)
- [Game Lobby Mobile Requirement (Portrait)](https://docs.google.com/document/d/1y1-1ZDufqcHlgb5ayZkbllFM0xEiLDPV480o_8aIi_Q/edit?ts=5e660e13)
- [Game Lobby Mobile Requirement (Landscape)](https://docs.google.com/document/d/1z-3qwtuepfipKaak-e8pvy5loohNHoC0tW8cFs3tnts/edit?ts=5e660d51)
- [Desktop Notification Requirement](https://drive.google.com/file/d/1Qu5qZL9ATEkmVe0GyYXwh5q_pxArs9b8/view?ts=5e4d0d04)

- [Baccarat Requirement](https://docs.google.com/document/d/1LnNBQPlFsOTKK8xodzg-xC5P_9_uzOzWBsiqt_5ThLw/edit)
- [Baccarat Mobile Requirement (Portrait)](https://docs.google.com/document/d/1VmyNAUTKaQCB-r9Mlw2Sz8FiQ09LSyCJm1BxpepZsaM/edit)
- [Baccarat Mobile Requirement (Landscape)](https://docs.google.com/document/d/1ClByP765L4drUzyGhPCQmsBJt10CyP4VKCiCfTeemlM/edit?ts=5e635d25)

- [Dragon Tiger Requirement](https://docs.google.com/document/d/1V4wFAZuuf6rmdggRk4UrmOkmLd-5Pd28SWY3J96bWNc/edit?ts=5e0ad733)
- [Dragon Tiger Mobile Requirement (Portrait)](https://docs.google.com/document/d/1ghgGbwSzeV752qOi87mdy8xaFIISzi9Ml4KKy5lKSS0/edit?ts=5e63582e)
- [Dragon Tiger Mobile Requirement (Landscape)](https://docs.google.com/document/d/1elxWnL8OzVM4HbvKoxYjdje3V7eFFK4_5p1_nj0XAps/edit?ts=5e661fc6)

- [Roulette Requirement](https://docs.google.com/document/d/1TX5oRcXP26Gc0VONbwtURiGI6CSmx9SbHPlYZA193Qo/edit)
- [Roulette Mobile Requirement (Portrait)](https://docs.google.com/document/d/1M2dQRJNXlRBz8fpIf4_2F6G1s13faK19ZmLYUKXhqsU/edit?ts=5e6f5260)
- [Roulette Mobile Requirement (Landscape)](https://docs.google.com/document/d/1P3GuOiBVDrO-KviYVH3tMJivMLMo52Xdj3BUI792z4E/edit?ts=5e86e5f5)

- [Sicbo Requirement](https://docs.google.com/document/d/1bKzi9Yk6RC4YHFefULNfg_dc4LlgjIbx8j9pjoLZnGY/edit?ts=5e5e3ece)
- [Sicbo Mobile Requirement (Portrait)](https://docs.google.com/document/d/1uHWZ1xHHzM7gdkcebyKdHz8eypqqJwXcCgZLciaWXwA/edit?ts=5e86ea24)
- [Sicbo Mobile Requirement (Landscape)](https://docs.google.com/document/d/1yTR43SZdrvQRVmwCiov2dwCwXliknLtlQ1hojd7zZE8/edit?ts=5e86ff61)

- [Lucky Wheel Requirement](https://docs.google.com/document/d/1RBmOSW3z0oH6SOvVeJtZJejpfCL8HhrUurVZkmF1WxY/edit?ts=5e6a0824)
- [Lucky Wheel Mobile Requirement (Portrait)](https://docs.google.com/document/d/16Y6IPiBSUJMz4Rgrhz8nZxOYwK9MqjC5RVaJj9Gv7dc/edit?ts=5e8adbea)
- [Lucky Wheel Mobile Requirement (Landscape)](https://docs.google.com/document/d/1nOc4ylqNotcDpgPg9GbhYR0167Fc2SygG4SXEXywZlk/edit?ts=5e8ae793)

- [Baccarat Requirement](https://docs.google.com/document/d/1LnNBQPlFsOTKK8xodzg-xC5P_9_uzOzWBsiqt_5ThLw/edit)
- [Baccarat Mobile Requirement (Portrait)](https://docs.google.com/document/d/1VmyNAUTKaQCB-r9Mlw2Sz8FiQ09LSyCJm1BxpepZsaM/edit)
- [Baccarat Mobile Requirement (Landscape)](https://docs.google.com/document/d/1ClByP765L4drUzyGhPCQmsBJt10CyP4VKCiCfTeemlM/edit?ts=5e635d25)

- [Baccarat Requirement](https://docs.google.com/document/d/1vjd9PBGGMaTAzS12U4EoiQ-daw8yi-vkYh7-XDRwkuw/edit)
- [Squeezed Baccarat Mobile Requirement (Portrait)](https://docs.google.com/document/d/1MmLHwUiXZQiW7N5u73z9Ej02oTBvUwS5esCrPSS-k80/edit)



## Live Game Asset

- [God of Wealth Roulette Desktop Animation](https://drive.google.com/open?id=1AogJc0OACzfhH69ON0fyt2uznZlwKi5o)
- [God of Wealth Roulette Mobile Animation](https://drive.google.com/open?id=13SNhuemmGrRZ_yWi5XcCeYFPXb-3ucCA)

- [Lucky Wheel result message dragonbone](https://drive.google.com/file/d/1tDc-zLLHCX_Cify6mj0STqhsT6UooH_Y/view?usp=sharing)

- [Lucky Wheel 結果通知 Asset](https://drive.google.com/open?id=1C-jERs8Ixsdw3E2gKbYCROna_SuEa5n7)
- [Lucky Wheel 結果通知 Asset mobile](https://drive.google.com/open?id=1IO_lTsvor9o_dSryBiRPuYKLPn28drGu)

- [Squeeze Baccarat Desktop](https://drive.google.com/open?id=1AY6lAwunBfeqW4Rrg-gEPtgtv4m_q7Xb)
- [Squeeze Baccarat Mobile](https://drive.google.com/open?id=1vccNZi4X2dp3TfgodQukk3KOSaPm6JAq)

- [Asset root directory](https://drive.google.com/drive/folders/1_sZjq7i8acgw9bF33yMfOV3lCJrG6LqT)

- [dragonbone icon animation](https://drive.google.com/drive/folders/10d3Jv2eo5CnRjLkJ_J5qJ711EQOA_qhY)

- [9/4/2020 missing_assets](https://home.mycloud.com/action/share/03e6bcfd-309c-4351-b92c-5a2ad17df8db)
- [missing asset issue](https://home.mycloud.com/action/share/541f7d33-be2a-47ef-b2ec-0a3bae9ac799)

- [17/4/2020 LuckyWheel Desktop](https://drive.google.com/open?id=1KHScZPnogUgYnVDRQAw-AaiG3CeTbZ3_)

- [17/4/2020 LuckyWheel Mobile](https://drive.google.com/open?id=1KhzJeZ6pxDlNTDkj_wuMz_1IPhQ_Rxa2)

- [16/4/2020 mobile baccarat](https://drive.google.com/open?id=18wlsZ8eX94sWvidL_2WK7hDofC-2baO5)

- [4/3/2020 God Of Wealth Roulette](https://drive.google.com/drive/folders/1Q-ipvuxyQpjNhumkXEdY77-iiZAJXKSn)

- [4/3/2020 Squeeze Baccarat](https://drive.google.com/drive/u/1/folders/1PFeDwG-NGW2phdCwZRUyUGWbgrJW-dqC)

- [1/4/2020 Mobile Sicbo](https://drive.google.com/drive/folders/1trOwAd7mR35J8dIKwbRJGcgBiP1sYzRg)

- [25/3/2020 Mobile Lucky Wheel](https://drive.google.com/drive/u/1/folders/11U1zAF16Bs0mJCciEM6orU6i6Et5mOzU)

- [25/3/2020 Lucky Wheel](https://drive.google.com/file/d/1a0aEdRZXrA1akvadKyGofCqSDj42oLnF/view)

- [23/3/2020 Desktop Roulette Racetrack](https://drive.google.com/file/d/1nZqYLUD2EgFIEGAJir3jht_CxQirDDFq/view)

- [20/3/2020 Sicbo Dragonbone Animation](https://drive.google.com/drive/folders/1yn7rk2GnwHFmyD9zjHxYFraTpRlBgRSY)

- [18/3/2020 Mobile Lobby Asset (Vertical + Horizontal)](https://drive.google.com/open?id=104Px5YoEAU9Q-Ma0zZpYmDw09Nj3uB2L)

- [18/3/2020 Sicbo](https://drive.google.com/open?id=1TK1oXLQkV--YE3aoMlYWOpcM3y1QDzTs)

- [16/3/2020 Money Wheel](https://drive.google.com/drive/folders/1yBY90E6lDK9C-Vqif7oroYvLG5WRpDei)

- [12/3/2020 Mobile Roulette](https://drive.google.com/drive/folders/13Jq9zz-m_tCrfTziHQtVnn6wD1oUQNVr)

- [11/3/2020 Mobile DT](https://drive.google.com/drive/folders/18lRcU1JAxPBokKuGMFs3Y6pCCfO67-bU)

- [11/3/2020 Sicbo](https://drive.google.com/drive/folders/1Lfcc8ig6oY-wend-rYIr0YqTmuiViibV)

- [25/2/2020 Dragonbone animation 1](https://drive.google.com/drive/folders/1RhFJWSlPV7If1MLCx1D__Ymj9bfXosEg)

- [25/2/2020 Dragonbone animation 2](https://drive.google.com/drive/folders/1eUfsdQQHsXPZgscRIRHkXXUbHHb3LSpO)

- [24/2/2020 Dragonbone animation](https://drive.google.com/drive/folders/1GLsk1sXqikKc6i_5s_cRQQkoCB1dOkDb)

- [18/2/2020 Mobile Update](https://drive.google.com/open?id=1fq3XMtNnomZUqc660cuoO1UEP4o89JSo)

- [13/2/2020 Desktop Roulette Update](https://drive.google.com/open?id=18pw8neTmi4Ih3vvRNmJBxeNnFukYNhEv)

- [11/2/2020 Desktop Roulette](https://drive.google.com/open?id=1-vGPTIf7-BWpUinXSUMHIt-BBiDxr-Ek)

- [11/2/2020 Mobile Baccarat](https://drive.google.com/drive/folders/19amRaWJXauhO2ApziD21p6st82lru85t?usp=sharing)

- [11/2/2020 Game Result Dragonbone animation](https://drive.google.com/drive/folders/1GLsk1sXqikKc6i_5s_cRQQkoCB1dOkDb?usp=sharing)

- [9/12/2019 Chipset & Exception Popup](https://drive.google.com/open?id=1qzpLhpQJngfh5GSAahVBXWtJA-2BXu3A)

- [28/11/2019 Lobby](https://drive.google.com/drive/folders/1lF1IKI3giYKNOTiGjZ7fp2r1WvNSoK-q?usp=sharing)

- [28/11/2019 Baccarat](https://drive.google.com/drive/folders/1u_gLYYdSB8OUm6g95WgEZ7zhtNs3GXB3?usp=sharing)

## Lottery Resource
- [Lobby + 時時彩 Desktop Zeplin](https://app.zeplin.io/project/5d8d9c1ec2f4dd026286ee4e/dashboard?seid=5edf231d1fa6889938219d7a)
- CP原型地址：https://xqh5ls.axshare.com/  CP访问密码：teF#LMvy&Kc4qNOx
- [Lottery Algorithm (swift)](https://github.com/biostome/BTLotteryAlgorithm/blob/master/LotteryAlgorithm.playground/Contents.swift)
- [Lottery Demo (yunjicp)](https://yunjicp.com/)
- [Lottery bet type and backend field definition (by felix)](https://docs.google.com/spreadsheets/d/1NiRO7jKdO441-Ja9IuCCuDb_ib_pxLKA/edit#gid=1362459178)
- [時時彩 玩法說明](https://drive.google.com/drive/folders/1NKNYbvCVuGMT8cMEHgkUo5RmIpBoRCWu?usp=sharing)
- [時時彩 Requirement](https://drive.google.com/file/d/1XjppI7cKDkCOOVcRWSQrAXX_mAjjzD53/view?usp=sharing)
- [Lottery pending and unclearness](https://docs.google.com/document/d/1dkb1aqSjAEqK9TL4wf4UtGk7YeSDjzz0atUuCAjBjec/edit?usp=sharing)
- [排列組合公式大全](https://drive.google.com/file/d/1CbhA5uHBFwjyH2LA6NG5IuyLSkUsmj2D/view?usp=sharing)
## Lottery Asset
- [Lobby + 時時彩 Desktop](https://drive.google.com/open?id=19TTHY9c2-hLl-HWt-q2dLFsl_uFc79GO)
