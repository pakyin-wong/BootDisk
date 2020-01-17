## Roadmap

### current week

### next demo (TBC)
- Already bet baccarat grid
- Side panel baccarat grid
- Already bet label in lobby table list grid
---
- Live Side Panel Filtering
- Good Road Notification
- Result Notification
---
- Loading scene fetch banner from url
- Lobby scene fetch banners from url (fetch at least one hero banner on each page before goto lobby scene)
- Member Report Panel
- Bet Log Date Selection
- Bet Log Search
- Good Road Enabled List Update
---
- Bet Chip Modification (using bitmapfont)
- Confirmed bet chip Modification
- Unconfirmed bet chip modification
- Rebet and double bet button
---
### pending tasks
- Light/ Dark Mode handling
- Light/ Dark Mode selection panel
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
1. Download and install bash from http://www.msys2.org/
2. Install npm
3. Install the following programs
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
