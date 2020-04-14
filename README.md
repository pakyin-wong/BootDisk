# fe-game-client-egret
This is the game client for World Entertainment.

## Roadmap

### next demo (TBC)

**General**
- Platform Checking and platform specific setting
- Mobile Fullscreen Handling
---
**Mobile Components**
- Setting Drawer
- Data Picker
- Notification Controller
- Side Panel
- Top menu bar
- Live game tab bar
- Table List View
- QuickBet overlay
- MessageBox overlay
- General Fullpage overlay navigator
- Setting overlay
- Player Profile overlay
- BetLog overlays
- Custom Goodroad overlay
- BetRelatedGroup (lefthand/ righthand mode)
- Betting Table
- Info Section (Tab mode)
---
**Desktop Components**
- Tooltips
- Roulette Roadmap
- Roulette, Baccarat, DragonTiger Result animations
- Roulette menu table item (simple, normal, detail)
- Roulette side panel item (normal, already bet)
- Roulette Scene
- Roulette Betting Table
- Roulette Scene Left Panel
    - Hot/ cold number
    - History
    - Roadmap
- Roulette Scene Right Panel
    - Custom Betting patterns
    - Roulette French Bets
- Roulette result notification
- Notification Controller
- Baccarat menu table item (detail)
- DragonTiger menu table item (detail)

### pending tasks
- Ba Result Message Modification (using animation)
- Disconnect handling
- Video
- Tooltips
- UI Tutorial
- consequence of bet limit / table limit change in different places (e.g scene, side item, lobby item)
- **Mobile Layout**

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
3. Install npm
4. Install the following programs
```
npm install -g tslint prettier typescript
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
npm install -g tslint prettier typescript
```

## Testing Site
1. [Development](https://dev-web-game-fe.wehosts247.com/)

2. [Staging](https://web-game-fe.wehosts247.com/)

## Auto Dealer
1. [Development](http://18.139.237.86:8901/?checked=true&uid=H003&local=test)

2. [Staging](http://18.139.237.86:8901/?checked=true&uid=H003)

## External Resource
- [Slack for whole team](https://perfectgaming.slack.com/)
- [Trello Task List](https://trello.com/b/ulT0EbaT/pg-live-game-frontend-tasks)
- [Frondend Documents](https://drive.google.com/drive/u/0/folders/1HHHJ0gJwfynMjYndl5te1XN4agXu-vn6)
- [Auto Dealer](http://18.139.237.86:8901/?checked=true)
- [Invision Template](https://projects.invisionapp.com/prototype/Quick-Bet-ck3dwku8c00f0el01k01o5kam/)
- [Zeplin Template](https://app.zeplin.io/project/5d8d9c1ec2f4dd026286ee4e/dashboard)
- [Frontend MQTT Library (PlayerClient)](https://github.com/PGITAb/fe-lib-player-client-js)

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


## Asset Link from Design Team (Copied from whatsapp group)

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
