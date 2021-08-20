import './style.scss';
import Vue from "vue";
import App from "./components/App.vue";

var VueInctance = new Vue({
    el: '#app',
    render: (h) => {
        return h(App)
    }
});
