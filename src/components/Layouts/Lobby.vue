<script>
import avatar from '../Widget/avatar.vue'
import lock from '../Widget/lock.vue'

export default {
    components: { avatar, lock },
    name: 'Lobby',
    props: ['lobbyList', 'gameDetails'], 
    methods: {
        openGame: function(details) {
            this.$emit('openGame', details);
        }
    },
    data() {
        return {
            settings: JSON.parse(window.localStorage.appSettings)
        }
    }
}
</script>
<template>
    <div class="lobby">

        <div v-if="settings.enabledExtenstion">

            <div class="thead">
                <div></div>
                <div></div>
                <div></div>
                <div class="title">Название</div>
                <div>Создатель</div>
                <div>Игроки</div>
                <div>Зрители</div>
            </div>
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

        <div v-else class="message-warning">
            Приложение отключено.
            <br><br>
            Включить мониторинг можно во вкладке "Настройки".
            </div>

    </div>
</template>
    