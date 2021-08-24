import './style.scss';
import Vue from "vue";
import App from "./components/App.vue";


/**
 * Google Analytic 
 */

Vue.prototype.$ga = {
    pageview: function(uri) {
        ga('send', 'pageview', uri);
    }
};

var _gaID = 'UA-9234509-20';

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here
ga('create', _gaID, 'auto'); // Enter your GA identifier
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');
ga('send', 'pageview', '/lobby'); // Specify the virtual path

/**
 * -----------------------------------------------------------------------
 */

new Vue({
    el: '#app',
    render: (h) => {
        return h(App)
    }
});


