<script>
import Switches from 'vue-switches';

export default {
    name: 'Settings',
    components: {
        Switches
    },
    data() {
        return JSON.parse(window.localStorage.appSettings);
    },
    watch: {
        enabledExtenstion: function (newValue, oldValue) {
            this.$data.enabledExtenstion = newValue;
            window.localStorage.appSettings = JSON.stringify(this.$data);
        },
        enabledDisplayAutoGame: function (newValue, oldValue) {
            this.$data.enabledDisplayAutoGame = newValue;
            window.localStorage.appSettings = JSON.stringify(this.$data);
        },
        interval: function (newValue, oldValue) {
            this.$data.interval = newValue;
            window.localStorage.appSettings = JSON.stringify(this.$data);
        }
    },
    methods: {
        save() {
            window.close();
        }
    }
}
</script>
<template>
    <div class="settings-wrap">
        <div class="settings-row">
            <div>Включить / выключить мониторинг</div>
            <div><switches v-model="enabledExtenstion" theme="bootstrap" color="success"></switches></div>
        </div>
        <div class="settings-row">
            <div>Показывать авто-игры</div>
            <div><switches v-model="enabledDisplayAutoGame" theme="bootstrap" color="success"></switches></div>
        </div>
        <div class="settings-row">
            <div>Частота обновления данных</div>
            <div>
                <select v-model="interval">
                    <option value="1000">1 сек</option>
                    <option value="2000">2 сек</option>
                    <option value="3000">3 сек</option>
                    <option value="15000">15 сек</option>
                    <option value="30000">30 сек</option>
                    <option value="60000">1 мин</option>
                    <option value="120000">2 мин</option>
                    <option value="600000">10 мин</option>
                </select>
            </div>
        </div>
        <div class="game-buttom-controll">
            <a href="#" v-on:click="save" class="button2">Применить</a>
        </div>
    </div>
</template>