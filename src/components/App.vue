<script>
import View from './View.vue';
import Settings from './Layouts/Settings.vue';
import Share from './Layouts/Share.vue';
import { Tabs, Tab } from 'vue-tabs-component';


export default {
    name: 'App',
    components: {
        Settings, Tabs, Tab, Share
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
        <tab name="Рассказать другу">
            <share></share>
        </tab>
    </tabs>
</div>

</template>