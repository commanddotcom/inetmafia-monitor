const ls = require('local-storage');

const axios = require('axios');
const endpoint = 'https://inetmafia.ru/api';
const headers = {
    'Content-Type': 'application/json',
}
const data = {
    "query":"{\n  lobby{\n    id\n    title\n    author\n    type\n    lock\n    twitch\n    youtube\n    players\n    spectators\n    isLobby\n  }\n}",
    "variables":{}
};
const minMembersOfActualTable = 2;

if (!ls('appSettings')) {
    ls('appSettings', { // default values
        enabledExtenstion: true,
        enabledDisplayAutoGame: false,
        interval: 3000,
    });
}

export default {
    fetchLobby() {
        return axios.post(endpoint, data, {
            headers: headers
        })
        .then((response) => {
            if (typeof response.data.data.lobby === 'object') {
                this.lobbyList = response.data.data.lobby; 
                let tablesToGo = 0;
                for(var k in this.lobbyList) {
                    
                    this.lobbyList[k].author_ = {
                        avatar: null
                    };
                    
                    if (this.lobbyList[k].isLobby && this.lobbyList[k].players.players.length > minMembersOfActualTable) {
                        tablesToGo++;
                    }
                
                    var playersNotDead = 0;
                    for (var y in this.lobbyList[k].players.players) {
                        if (!this.lobbyList[k].players.players[y].isDead) {
                            playersNotDead++;
                        }
                        if (this.lobbyList[k].players.players[y].nick == this.lobbyList[k].author) {
                            this.lobbyList[k].author_  = this.lobbyList[k].players.players[y];
                        }
                    }
                    this.lobbyList[k].playersNotDead = playersNotDead;
                }
                ls('lobby', this.lobbyList);

                chrome.browserAction.setBadgeText({text: tablesToGo.toString()});

                if (!tablesToGo) {
                    chrome.browserAction.setBadgeBackgroundColor({ color: [204, 204, 0, 255] });
                } else {
                    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 153, 0, 255] });
                }
                

            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}