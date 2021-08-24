<script>
import Lobby from './Layouts/Lobby.vue';
import Game from './Layouts/Game.vue';

export default {
    name: 'View',
    data () {
        return {
            gameDetails: false,
            lobbyList: [],
            timer: '',
            maxTitleLength: 32,
            readLocalStorageIntarval: 1000,
            layout: Lobby,
            settings: JSON.parse(window.localStorage.appSettings)
        }
    },
    created () {
        if (!this.settings.enabledExtenstion) {
            this.cancelAutoUpdate();
        } else {
            this.fetchLobby();
            this.timer = setInterval(this.fetchLobby, this.readLocalStorageIntarval);
        }
    },
    components: {
        lobby: Lobby,
        game: Game,
    },
    methods: {
        fetchLobby() {
            this.lobbyList = JSON.parse(window.localStorage.lobby);
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
