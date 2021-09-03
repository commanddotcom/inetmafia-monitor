<script>
import ls from 'local-storage';
import Switches from 'vue-switches';

export default {
    name: 'Settings',
    components: { Switches },
    data() {
        return {
            appSettings: ls('appSettings'),
            rates: {
                1: '1 сек',
                2: '2 сек',
                3: '3 сек',
                15: '15 сек',
                30: '30 сек',
                60: '1 мин',
                120: '2 мин',
                600: '10 мин',
            },
            sortBy: {
                id: 'По номеру',
                isLobby: 'По состоянию'
            }
        }; 
    },
    watch: {
        appSettings: {
            handler(val){
                this.save();
            },
            deep: true
        }
    },
    methods: {
        save() {
            ls('appSettings', this.$data.appSettings)
        },
        update() {
            this.$ga.pageview('/settings/save');
            chrome.runtime.reload()
        }
    }
}
</script>
<template>
    <div class="settings-wrap">
        <div class="settings-row">
            <div>Включить / выключить мониторинг</div>
            <div><switches v-model="appSettings.enabledExtenstion" theme="bootstrap" color="success"></switches></div>
        </div>
        <div class="settings-row">
            <div>Показывать авто-игры</div>
            <div><switches v-model="appSettings.enabledDisplayAutoGame" theme="bootstrap" color="success"></switches></div>
        </div>
        <div class="settings-row">
            <div>Частота обновления данных</div>
            <div>
                <select v-model="appSettings.interval">
                    <option v-for="(rate, index) in rates" :value="index*1000">{{ rate }}</option>
                </select>
            </div>
        </div>
        <div class="settings-row">
            <div>Сортировка столов</div>
            <div>
                <select v-model="appSettings.sortByOption">
                    <option v-for="(name, column) in sortBy" :value="column">{{ name }}</option>
                </select>
            </div>
        </div>
        <div class="game-buttom-controll">
            <a href="#" v-on:click="update" class="button2">Применить</a>
        </div>
    </div>
</template>