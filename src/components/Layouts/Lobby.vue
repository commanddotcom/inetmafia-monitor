<script>
import avatar from '../Widget/avatar.vue'
import lock from '../Widget/lock.vue'
import lobbyHeader from '../Widget/lobbyHeader.vue'

export default {
    components: { avatar, lock, lobbyHeader },
    name: 'Lobby',
    props: ['lobbyList', 'gameDetails', 'settings'], 
    methods: {
        openGame: function(details) {
            this.$emit('openGame', details);
        }
    }
}
</script>
<template>
    <div class="lobby">
        <div>
            <lobbyHeader></lobbyHeader>
            <div v-for="game in lobbyList" class="game" :key="game.id" @click="openGame(game)" v-if="game.author !== 'auto-game' || settings.enabledDisplayAutoGame">
                <div class="text-center">
                    <span v-if="game.isLobby" class="green-dot dot"></span>
                    <span v-else class="red-dot dot"></span>
                </div>
                <div>{{ game.id }}</div>
                <div><lock v-if="game.lock"></lock></div>
                <div class="title">
                    <span v-if="game.title.length > maxTitleLength">{{ game.title.substring(0,maxTitleLength) }}...</span>
                    <span v-else>{{ game.title }}</span>                
                </div>
                <div class="author"><avatar :avatar="game.author_.avatar"></avatar> {{ game.author }}</div>
                <div class="text-center">{{ game.playersNotDead }}/{{ game.players.max }}</div>
                <div class="text-center">{{ game.spectators }}</div>
            </div>

        </div>
    </div>
</template>
    