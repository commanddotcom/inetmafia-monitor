import ls from 'local-storage';
import Notification from './lib/notification.js';
import Fetch from './lib/fetch.js';

class Main {
    lobbyList = [];
    notificationsQueue = [];
    loop = () => {
        Fetch.fetchLobby();
        Notification.sendNotifications();
    }
}

let settings = ls('appSettings');

if (settings.enabledExtenstion) {
    const MainInstance = new Main();
    setInterval(MainInstance.loop, settings.interval);
} else {
    chrome.browserAction.setBadgeText({text: 'OFF'});
    chrome.browserAction.setBadgeBackgroundColor({ color: [205, 0, 0, 255] });
}

