<script>
import Lobby from './Layouts/Lobby.vue';
import Game from './Layouts/Game.vue';

const axios = require('axios');
const endpoint = 'https://inetmafia.ru/api';
const headers = {
    'Content-Type': 'application/json',
}
const data = {
    "query":"{\n  lobby{\n    id\n    title\n    author\n    type\n    lock\n    twitch\n    youtube\n    players\n    spectators\n    isLobby\n  }\n}",
    "variables":{}
};

export default {
    name: 'View',
    data () {
        return {
            gameDetails: false,
            lobbyList: [],
            timer: '',
            maxTitleLength: 32,
            minMembersOfActualTable: 2,
            layout: Lobby,
            settings: JSON.parse(window.localStorage.appSettings)
        }
    },
    created () {
        if (!this.settings.enabledExtenstion) {
            return true;
        }
        this.fetchLobby();
        this.timer = setInterval(this.fetchLobby, this.settings.interval);
    },
    components: {
        lobby: Lobby,
        game: Game,
    },
    methods: {
        fetchLobby () {
                axios.post(endpoint, data, {
                    headers: headers
                })
                .then((response) => {
                    this.lobbyList = response.data.data.lobby; 
                    this.prepareRender();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        prepareRender() {
            let tablesToGo = 0
            for(var k in this.lobbyList) {
                
                this.lobbyList[k].author_ = {
                    avatar: null
                };
                
                if (this.lobbyList[k].isLobby && this.lobbyList[k].players.players.length > this.minMembersOfActualTable) {
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
            chrome.browserAction.setBadgeText({text: tablesToGo.toString()});
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        },
        openGame (details) {
            this.gameDetails = details;
            this.layout = Game;
        },
        closeGame () {
            this.gameDetails = false;
            this.layout = Lobby;
        }
    },
    beforeDestroy () {
        this.cancelAutoUpdate();
    },
}
</script>

<template>
    <div>
        <component :is="layout" :lobbyList="lobbyList" :gameDetails="gameDetails" :gameID="gameID" :maxTitleLength="maxTitleLength" @openGame="openGame" @closeGame="closeGame"></component>
    </div>
</template>
