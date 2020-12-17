namespace we {
    export namespace blockchain {
        //for option 1 - 2
        export async function getGameStatus(type, tableInfo, hostid, gameData, dataName: string, option, sleep = 0) {
            await utils.sleep(sleep)
            if (!tableInfo || !hostid) {
                return new Promise(resolve => resolve());
            }
            await new Promise(resolve =>
                dir.socket[`getGameStatus${type}`](hostid, option, null, null,
                    (data) => {
                        console.log(`getGameStatus${type}`)
                        console.log(type, tableInfo, hostid, gameData, dataName, option)
                        console.log(data)
                        gameData[dataName] = data[dataName]
                        resolve();
                    }
                )
            )
            return new Promise(resolve => resolve());
        }
        //for option 3
        export async function getMaskedListRange(type, tableInfo, hostid, gameData, from, to, sleep = 0) {
            await utils.sleep(sleep)
            if (!tableInfo || !hostid) {
                return new Promise(resolve => resolve());
            }
            await new Promise(resolve =>
                dir.socket[`getGameStatus${type}`](hostid, we.blockchain.RETRIEVE_OPTION.CARD, from - 1, to - 1,
                    (data) => {
                        console.log('getMaskedListRange')
                        console.log(type, tableInfo, hostid, gameData)
                        console.log(data)
                        for (let i = 0; i < data.length; i++) {
                            gameData.maskedcardssnList[i + from - 1] = data.maskedcardssnList[i - 1]
                        }
                        resolve();
                    }
                )
            )
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
                await blockchain.getGameStatus(type, tableInfo, hostid, gameData, 'hashedcardsList', blockchain.RETRIEVE_OPTION.HASH, sleep);
                //logger.l(utils.LogTarget.DEV, 'GetShoeFromCosmo error. ' + error + '. Fallback to use backend\'s data.');
                return new Promise(resolve => resolve());
            }
        }
    }
}