namespace we {
    export namespace blockchain {
        export let isUpdating = false;
        export const HASHEDCARDSLIST = 'hashedcardsList';
        export const MASKEDCARDSSNLIST = 'maskedcardssnList';
        //for option 1 - 2
        export async function getGameStatus(type, tableInfo, hostid, gameData, dataName: string, option, sleep = 0) {
            let repeatCheck = async () => {
                if (isUpdating) {
                    await utils.sleep(200);
                    await repeatCheck();
                }
            }
            await repeatCheck();
            isUpdating = true;
            await utils.sleep(sleep)
            if (!tableInfo || !hostid) {
                return new Promise(resolve => resolve());
            }
            await new Promise(resolve =>
                dir.socket[`getGameStatus${type}`](hostid, option, null, null,
                    (data) => {
                        gameData[dataName] = data[dataName]
                        resolve();
                    }
                )
            )
            isUpdating = false;
            return new Promise(resolve => resolve());
        }
        //for option 3
        export async function getMaskedListRange(type, tableInfo, hostid, gameData, from, to, sleep = 0) {
            let repeatCheck = async () => {
                if (isUpdating) {
                    await utils.sleep(200);
                    await repeatCheck();
                }
            }
            await repeatCheck();
            isUpdating = true;
            await utils.sleep(sleep)
            if (!tableInfo || !hostid) {
                return new Promise(resolve => resolve());
            }
            await new Promise(resolve =>
                dir.socket[`getGameStatus${type}`](hostid, we.blockchain.RETRIEVE_OPTION.CARD, from - 1, to - 1,
                    (data) => {
                        for (let i = 0; i < data.length; i++) {
                            gameData.maskedcardssnList[i + from - 1] = data.maskedcardssnList[i - 1]
                        }
                        resolve();
                    }
                )
            )
            isUpdating = false;
            return new Promise(resolve => resolve());
        }

        export async function getAll(cosmosshoeid: string, type, tableInfo, hostid, gameData, sleep = 0) {
            let obj;
            let text;


            let repeatCheck = async () => {
                if (isUpdating) {
                    await utils.sleep(200);
                    await repeatCheck();
                }
            }
            
            if (!tableInfo || !hostid) {
                return new Promise(resolve => resolve());
            }

            isUpdating = true;

            try {
                text = await utils.getText(`${env.blockchain.cosmolink}${gameData.cosmosshoeid}`);
                obj = JSON.parse(text);

                if (obj && obj.result && obj.result.cards) {
                    gameData.hashedcardsList = obj.result.cards;
                } else {

                    throw new Error();
                }
            } catch (error) {
                //await blockchain.getGameStatus(type, tableInfo, hostid, gameData, HASHEDCARDSLIST,, sleep);
                await new Promise(resolve =>
                    dir.socket[`getGameStatus${type}`](hostid, blockchain.RETRIEVE_OPTION.HASH, null, null,
                        (data) => {
                            gameData[HASHEDCARDSLIST] = data[HASHEDCARDSLIST]
                            resolve();
                        }
                    )
                )
                logger.l(utils.LogTarget.DEV, 'GetShoeFromCosmo error. ' + error + '. Fallback to use backend\'s data.');
            }
            await new Promise(resolve =>
                dir.socket[`getGameStatus${type}`](hostid, blockchain.RETRIEVE_OPTION.MASK, null, null,
                    (data) => {
                        gameData[MASKEDCARDSSNLIST] = data[MASKEDCARDSSNLIST]
                        resolve();
                    }
                )
            );

            isUpdating = false;
            return new Promise(resolve => resolve());
        }

        export async function getShoeInfo(cosmosshoeid: string, type, tableInfo, hostid, gameData, sleep = 0) {
            let obj;
            let text;

            try {
                text = await utils.getText(`${env.blockchain.cosmolink}${gameData.cosmosshoeid}`);
                obj = JSON.parse(text);

                if (obj && obj.result && obj.result.cards) {
                    gameData.hashedcardsList = obj.result.cards;
                } else {

                    throw new Error();
                }
            } catch (error) {
                await blockchain.getGameStatus(type, tableInfo, hostid, gameData, HASHEDCARDSLIST, blockchain.RETRIEVE_OPTION.HASH, sleep);
                logger.l(utils.LogTarget.DEV, 'GetShoeFromCosmo error. ' + error + '. Fallback to use backend\'s data.');
            }
            return new Promise(resolve => resolve());
        }

        export function getFirstNonOpenedCardIndex(gameData) {
            if (!gameData || !gameData.maskedcardssnList) {
                return 0;
            }
            let result = 0;
            for (let i = 0; i < gameData.maskedcardssnList.length; i++) {
                if (!gameData.maskedcardssnList[i] || gameData.maskedcardssnList[i][0] === '*') {
                    result = i
                    break;
                }
            }
            return result + 1;
        }
    }
}