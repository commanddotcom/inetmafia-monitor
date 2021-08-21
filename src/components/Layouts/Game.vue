<script>
import avatar from '../Widget/avatar.vue'
export default {
    components: { avatar },
    name: 'Game',
    props: ['lobbyList', 'gameDetails', 'maxTitleLength'],
    methods: {
        openTab(id) {
            chrome.tabs.create({ url: 'https://inetmafia.com/game/'+id });
        }
    }
}
</script>
<template>
    <div class="game-details">
        <div>
            <div class="game-header">Стол # {{ gameDetails.id }} - 
                <span v-if="gameDetails.title.length > maxTitleLength">{{ gameDetails.title.substring(0,maxTitleLength) }}...</span>
                <span v-else>{{ gameDetails.title }} ({{ gameDetails.playersNotDead }}/{{ gameDetails.players.max }})</span>
            </div>
            <div class="game-header">
                Ведущий: {{ gameDetails.author }}
            </div>

            <div v-for="player in gameDetails.players.players" :key="player.id" class="player" v-if="gameDetails.author!=player.nick">
                <div :class="player.isDead ? 'isDead' : ''"><avatar :avatar="player.avatar"></avatar> {{ player.nick }}</div>
            </div>

            <div class="game-buttom-controll">
                <div><a href="#" @click="$emit('closeGame')" class="button1">Назад</a></div>
                <div><a href="#" @click="openTab(gameDetails.id)" class="button2">Открыть</a></div>
            </div>
        </div>
    </div>
</template>
    