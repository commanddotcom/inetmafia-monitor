const relevantTimeShifft = 240; // 2 h
import ls from 'local-storage';

export default {
    getNotifications() {
        let output = ls('notifications');
        if (output === null || typeof output !== 'object') {
            output = {};
        }
        return output;
    },
    addNotification(game) {
        let notifications = this.getNotifications();
        notifications[game.id] = game;
        ls('notifications', notifications)
    },
    removeNotification(gameId) {
        let notifications = this.getNotifications();
        if (this.checkIfNotificationExists(gameId)) {
            delete notifications[gameId];
        }
        ls('notifications', notifications)
    },
    checkIfNotificationExists(gameId) {
        let notifications = this.getNotifications();
        if (gameId in notifications) {
            return true;
        }
        return false;
    },
    sendNotifications() {
        let lobby = ls('lobby');
        let notifications = this.getNotifications();

        if (!Object.keys(notifications).length) {
            return true;
        }

        let modified = false;
        for(let k in notifications) { // remove expired notifications
            let timeDiff_inMin = Math.round( (Date.now() - notifications[k].isWatched)/1000/60);
            if (relevantTimeShifft < timeDiff_inMin) {                
                modified = true;
                delete notifications[k];
            }
        }

        let messages = [];

        for (let i in lobby) { // if game started

            let id = lobby[i].id;
            if (id in notifications && !lobby[i].isLobby && notifications[id].isLobby) {
                messages.push({ title: `Стол № ${ lobby[i].id } начался!`, message: lobby[i].title});
                modified = true;
                delete notifications[id];
            }

        }

        for (let i in notifications) { // if game ended

            let index = lobby.map(function(e) { 
                return typeof e !== 'object' ? false : e.id;
            }).indexOf(notifications[i].id);
            if (!notifications[i].isLobby && index === -1) {
                messages.push({ title: `Стол № ${ notifications[i].id } завершен!`, message: notifications[i].title});
                modified = true;
                delete notifications[i];
            } else if (notifications[i].isLobby && index === -1) {
                modified = true;
                delete notifications[i]; // clearing missed event
            }
        }

        if (messages.length) { // show notification
            let notification = {
                type: 'list',
                title: 'Inetmafia.com',
                message: '',
                requireInteraction: true,
                priority: 1,
                items: messages,
                iconUrl:'./favicon.png'
            };
            chrome.notifications.create('', notification, function(id) {});
        }

        if (modified) { // save all modifications
            ls('notifications', notifications);
        }

    }
}