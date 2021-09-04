<script>
import ls from 'local-storage';
import Lobby from './Layouts/Lobby.vue';
import LobbySkeleton from './Layouts/LobbySkeleton.vue';
import Game from './Layouts/Game.vue';

export default {
    name: 'View',
    methods: {
        fetchLobby() {
            this.lobbyList = ls('lobby');
            this.lobbyList.sort((a, b) => {
                return a[this.settings.sortByOption] - b[this.settings.sortByOption] || b.players.players.length - a.players.players.length;
            });
            if (this.gameDetails) {
                let index = this.lobbyList.map(function(e) { 
                    return typeof e !== 'object' ? false : e.id;
                }).indexOf(this.gameDetails.id);
                if (index === -1) {
                    this.closeGame();
                } else {
                    this.gameDetails = this.lobbyList[index];
                }
            }

            if (this.layout === LobbySkeleton) {
                this.layout = Lobby;
            }
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        },
        openGame (details) {
            this.$ga.pageview('/game/'+details.id);
            this.gameDetails = details;
            this.layout = Game;
        },
        closeGame () {
            this.$ga.pageview('/lobby');
            this.gameDetails = false;
            this.layout = Lobby;
        }
    },
    data () {
        return {
            gameDetails: false,
            lobbyList: ls('lobby'),
            timer: '',
            maxTitleLength: 32,
            readLocalStorageIntarval: 1000,
            layout: LobbySkeleton,
            settings: ls('appSettings')
        }
    },
    mounted () {
        if (!this.settings.enabledExtenstion) {
            this.cancelAutoUpdate();
        } else {
            this.timer = setInterval(this.fetchLobby, this.readLocalStorageIntarval);
        }
    },
    beforeDestroy () {
        this.cancelAutoUpdate();
    },
}
</script>

<template>
    <div>
        <component 
            :is="layout" 
            :settings="settings" 
            :lobbyList="lobbyList" 
            :gameDetails="gameDetails" 
            :gameID="gameID" 
            :maxTitleLength="maxTitleLength" 
            @openGame="openGame" 
            @closeGame="closeGame">
        </component>
    </div>
</template>
