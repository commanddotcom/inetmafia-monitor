import ls from 'local-storage';

const defaultSettings = { // default values
    enabledExtenstion: true,
    enabledDisplayAutoGame: false,
    interval: 3000,
    sortByOption: 'isLobby'
};

const saveSettings = function(settings) {
    ls('appSettings', settings);
}

const axios = require('axios');
const endpoint = 'https://inetmafia.ru/api';
const headers = {
    'Content-Type': 'application/json',
}
const data = {
    "query":
    `{
        lobby 
        {
            id
            title
            author
            type
            lock
            twitch
            youtube
            players
            spectators
            isLobby
        }
    }`,
    "variables": {}
};
const minMembersOfActualTable = 2;

let appSettings = ls('appSettings');
if (appSettings) {
    let updateSettings = false;
    for (let key in defaultSettings) {
        if (key in appSettings === false) {
            updateSettings = true;
            appSettings[key] = defaultSettings[key];
        }
    }
    if (updateSettings) {
        saveSettings(appSettings);
    }
} else {
    saveSettings(defaultSettings);
}


export default {
    fetchLobby() {
        return axios.post(endpoint, data, {
            headers: headers
        })
        .then((response) => {
            if (typeof response?.data?.data?.lobby === 'object') {
                this.lobbyList = response.data.data.lobby; 
                let tablesToGo = 0;
                for(let k in this.lobbyList) {
                    
                    this.lobbyList[k].author_ = {
                        avatar: null
                    };
                    
                    if (this.lobbyList[k].isLobby && this.lobbyList[k].players.players.length > minMembersOfActualTable) {
                        tablesToGo++;
                    }
                
                    let playersNotDead = 0;
                    for (let y in this.lobbyList[k].players.players) {
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
            } else {
                console.error(`Error! Invalid ${ endpoint } response: `);
                console.error(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}