self.addEventListener('push', function (e) {
    var title;
    var body;

    if (e.data) {
        var data = JSON.parse(e.data.text());
        title = data.title;
        body = data.body;
    } else {
        title = "Push Notification Title";
        body = "Push Notification Standard Message";
    }

    var options = {
        body: body,
        icon: "images/icon-512x512.png",
        badge: "images/icon-48x48.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now()
        },
        // actions: [
        //     {
        //         action: "explore", title: "Go interact with this!",
        //         icon: "images/checkmark.png"
        //     },
        //     {
        //         action: "close", title: "Ignore",
        //         icon: "images/red_x.png"
        //     },
        // ]
    };
    e.waitUntil(
        self.registration.showNotification(title, options)
    );
});


self.addEventListener('notificationclick', function (event) {
    console.log(event.notification.data.click_action);
    event.notification.close();

    if (!event.action) {
        // Was a normal notification click
        console.log('Notification Click.');

        if (event.notification.data.click_action)
            self.clients.openWindow(event.notification.data.click_action, '_blank')
        else
            if (clients.openWindow) return clients.openWindow("/");

        return;
    }
});


//self.addEventListener('notificationclick', function (e) {
//    var notification = e.notification;
//    var action = e.action;

//    if (action === 'close') {
//        notification.close();
//    } else {
//        // Some actions
//        clients.openWindow('http://www.gmail.com');
//        notification.close();
//    }
//});