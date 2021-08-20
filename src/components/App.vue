<script>
import View from './View.vue';
import Settings from './Layouts/Settings.vue';
import {Tabs, Tab} from 'vue-tabs-component';


export default {
    name: 'App',
    components: {
        Settings, Tabs, Tab
    },
    created () {
        if (!window.localStorage.appSettings) {
            window.localStorage.appSettings = JSON.stringify({ // default values
                enabledExtenstion: true,
                enabledDisplayAutoGame: false,
                interval: 3000
            });
        }
    },
    data() {
        return {
            layout: View
        };
    },
}
</script>

<template>


<div>
    <tabs cache-lifetime="0">
        <tab name="Монитор лобби">
            <component :is="layout"></component>
        </tab>
        <tab name="Настройки">
            <settings></settings>
        </tab>
    </tabs>
</div>

</template>