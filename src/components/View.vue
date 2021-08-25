<script>
import Lobby from './Layouts/Lobby.vue';
import LobbySkeleton from './Layouts/LobbySkeleton.vue';
import Game from './Layouts/Game.vue';

export default {
    name: 'View',
    components: {
        lobby: Lobby,
        game: Game,
    },
    methods: {
        fetchLobby() {
            if (this.layout === LobbySkeleton) {
                this.layout = Lobby;
            }
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
    data () {
        return {
            gameDetails: false,
            lobbyList: [],
            timer: '',
            maxTitleLength: 32,
            readLocalStorageIntarval: 1000,
            layout: LobbySkeleton,
            settings: JSON.parse(window.localStorage.appSettings)
        }
    },
    mounted () {
        if (!this.settings.enabledExtenstion) {
            this.lobbyList = JSON.parse(window.localStorage.lobby);
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
