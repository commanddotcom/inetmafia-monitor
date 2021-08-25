<script>
import lobbyHeader from '../Widget/lobbyHeader.vue'

export default {
    components: { lobbyHeader },
    name: 'LobbySkeleton',
    props: ['settings'],
    data() {
        return {
            loremIpsum: new Array(2)
        }
    }
}
</script>
<template>
    <div class="lobby skeleton">

        <div v-if="settings.enabledExtenstion">
            <lobbyHeader></lobbyHeader>
            <div v-for="index in loremIpsum" :key="index" class="game">
                <div class="text-center loading-text text-tiny"></div>
                <div class=""><span class="loading loading-text text-short"></span></div>
                <div class=""></div>
                <div class="title"><span class="loading loading-text text-long"></span></div>
                <div class="author"><span class="loading loading-ava"></span> <span class="loading loading-text text-medium"></span></div>
                <div class="text-center "><span class="loading loading-text text-short"></span></div>
                <div class="text-center "><span class="loading loading-text text-tiny"></span></div>
            </div>

        </div>

        <div v-else class="message-warning">
            Приложение отключено.
            <br><br>
            Включить мониторинг можно во вкладке "Настройки".
            </div>
    </div>
</template>
    