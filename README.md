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

## Betchips interaction
1. 

## External Resource
1. [Trello Task List](https://trello.com/b/ulT0EbaT/pg-live-game-frontend-tasks)

2. [Frondend Documents](https://drive.google.com/drive/u/0/folders/1HHHJ0gJwfynMjYndl5te1XN4agXu-vn6)

3. [Auto Dealer](http://18.139.237.86:8901/?checked=true)

4. [Invision Template](https://projects.invisionapp.com/prototype/Quick-Bet-ck3dwku8c00f0el01k01o5kam/)

5. [Zeplin Template](https://app.zeplin.io/project/5d8d9c1ec2f4dd026286ee4e/dashboard)