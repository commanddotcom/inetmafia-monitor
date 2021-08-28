<script>
import avatar from '../Widget/avatar.vue'
import bell from '../Widget/bell.vue'
import Notification from './../../class/notification.js';

export default {
    components: { avatar, bell },
    name: 'Game',
    props: ['lobbyList', 'gameDetails', 'maxTitleLength'],
    data: function() {
        return {
           isWatched: Notification.checkIfNotificationExists(this.gameDetails.id);
        }
    },
    methods: {
        openTab(id) {
            chrome.tabs.create({ url: 'https://inetmafia.com/game/'+id });
        },
        toogleNotification() {
            if (Notification.checkIfNotificationExists(this.gameDetails.id)) {
                Notification.removeNotification(this.gameDetails.id);
                this.isWatched = false;
            } else {
                Notification.addNotification(this.gameDetails);
                this.isWatched = Date.now();
            }
        }
    }, 
    computed: {
        isWatched: function() {
            return this.isWatched;
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
            <div class="game-header secondary" v-if="!gameDetails.isLobby">
                Ведущий: {{ gameDetails.author }}
            </div>

            <div v-for="player in gameDetails.players.players" :key="player.id" class="player" v-if="gameDetails.isLobby || gameDetails.author!=player.nick">
                <div :class="player.isDead ? 'isDead' : ''"><avatar :avatar="player.avatar"></avatar> {{ player.nick }}</div>
            </div>

            <div class="game-buttom-controll col-2">
                <div><a href="#" @click="$emit('closeGame')" class="button1" title="Назад к списку столов">Назад</a></div>
                
                <div>
                    <a href="#" @click="toogleNotification()" :class="isWatched ? 'button1 active' : 'button1'" title="Прислать уведомление"> 
                    <span class="bell" v-if="gameDetails.isLobby"><bell></bell> Когда начнется </span>
                    <span class="bell" v-else><bell></bell> Когда закончится </span>
                    </a>
                </div>

                <div><a href="#" @click="openTab(gameDetails.id)" class="button2" title="Открыть стол в новой вкладке браузера">Открыть</a></div>
            </div>

            <div v-if="isWatched" class="message-info">
                <span class="" v-if="gameDetails.isLobby">Вы получите уведомление в браузере когда игра {{ gameDetails.id }} начнется.</span>
                <span class="" v-else>Вы получите уведомление в браузере когда игра {{ gameDetails.id }} закончится. </span>
            </div>

        </div>
    </div>
</template>
    