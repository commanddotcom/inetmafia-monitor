import Notification from './class/notification.js';
import Fetch from './class/fetch.js';

var settings = JSON.parse(window.localStorage.appSettings);

class Main {
    lobbyList = [];
    notificationsQueue = [];

    loop = () => {
        Fetch.fetchLobby();
        Notification.sendNotifications();
    }
}

if (settings.enabledExtenstion) {
    const MainInstance = new Main();
    setInterval(MainInstance.loop, settings.interval);
} else {
    chrome.browserAction.setBadgeText({text: 'OFF'});
    chrome.browserAction.setBadgeBackgroundColor({ color: [205, 0, 0, 255] });
}

