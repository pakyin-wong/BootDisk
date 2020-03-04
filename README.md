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
- Bet Log Search
- Ba Result Message Modification (using animation)
- Disconnect handling
- Video
- Baccarat Scene all panel slide out & in
- Tooltips
- UI Tutorial
- **Mobile Layout**

### testing tasks
- import [spine](https://github.com/fightingcat/egret-spine) animation 
- import dragonbones mesh animation

### other tasks
- Tidy up the skin folder
- Clean up deprecated class


## Publish
To build the project, please use the publish.sh

```
./publish.sh [target_platform staging|production|testing]
```


# fe-game-client-egret
This is the live game client for World Entertainment.

## Confirmed Requirement
1. All bet chips selection are changed.

2. Change bet limit 

## Notification
(Waiting to update)
No specific event from backend. We only create our own event based on the following.

PLAYER_BET_INFO_UPDATE
backend will send a total bet result for each table
Data: Bet amount / Total win amount 
Status: only after bet / clearance
if (clearance) then we send out Notification.

GOODROAD_LIST_UPDATE
Full List.
Tableid and goodroad id matched. Event will be dispatched from backend.
if (list has new goodroad) we send out Notification.

## Installation for development environment
### MacOS
1. Install npm
2. Install the following programs
```
npm install -g tslint prettier typescript
```

### Windows
0. Please be reminded that your user folder name "C:\Users\xxx" has no space.
1. Install Egret Launcher. (Don't install EgretWing solely)
2. Download and install bash from http://www.msys2.org/
3. Set Bash in System Properties -> PATH
4. Install npm
5. Install the following programs

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
1. [Trello Task List](https://trello.com/b/ulT0EbaT/pg-live-game-frontend-tasks)

2. [Frondend Documents](https://drive.google.com/drive/u/0/folders/1HHHJ0gJwfynMjYndl5te1XN4agXu-vn6)

3. [Auto Dealer](http://18.139.237.86:8901/?checked=true)

4. [Invision Template](https://projects.invisionapp.com/prototype/Quick-Bet-ck3dwku8c00f0el01k01o5kam/)

5. [Zeplin Template](https://app.zeplin.io/project/5d8d9c1ec2f4dd026286ee4e/dashboard)

6. [Game Lobby Requirement](https://docs.google.com/document/d/1NHxG_0LELvbGfJeBq_qTr9uNwYEAq-1oimygOxr6HJc/edit)

7. [Baccarat Requirement](https://docs.google.com/document/d/1LnNBQPlFsOTKK8xodzg-xC5P_9_uzOzWBsiqt_5ThLw/edit)

8. [Dragon Tiger Requirement](https://docs.google.com/document/d/1V4wFAZuuf6rmdggRk4UrmOkmLd-5Pd28SWY3J96bWNc/edit?ts=5e0ad733)

9. [Frontend MQTT Library (PlayerClient)](https://github.com/PGITAb/fe-lib-player-client-js)

10. [Roulette Requirement](https://docs.google.com/document/d/1TX5oRcXP26Gc0VONbwtURiGI6CSmx9SbHPlYZA193Qo/edit)

11. [Baccarat Mobile Requirement (Portrait)](https://docs.google.com/document/d/1VmyNAUTKaQCB-r9Mlw2Sz8FiQ09LSyCJm1BxpepZsaM/edit)

12. [Sicbo Requirement](https://docs.google.com/document/d/1bKzi9Yk6RC4YHFefULNfg_dc4LlgjIbx8j9pjoLZnGY/edit?ts=5e5e3ece)
