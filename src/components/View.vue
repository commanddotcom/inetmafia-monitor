<script>
const ls = require('local-storage');
import Lobby from './Layouts/Lobby.vue';
import LobbySkeleton from './Layouts/LobbySkeleton.vue';
import Game from './Layouts/Game.vue';

export default {
    name: 'View',
    methods: {
        fetchLobby() {
            this.lobbyList = ls('lobby');
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
        <component :is="layout" :settings="settings" :lobbyList="lobbyList" :gameDetails="gameDetails" :gameID="gameID" :maxTitleLength="maxTitleLength" @openGame="openGame" @closeGame="closeGame"></component>
    </div>
</template>
