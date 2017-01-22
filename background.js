chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.type == "snapshot") {
    //     sendSnapshotToServer(request.payload);
    //     return true;
    // }

    route(request.type);
    return true;
});

function route(msg) {
    switch (msg) {
        case "scroll-down":
        case "scroll-up":
            sendScrollMessage(msg);
            break;
        case "zoom-in":
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.getZoom(tab.id, function(zoomFactor) {
                    chrome.tabs.setZoom(tab.id, zoomFactor + 0.2);
                });
            });
            break;
        case "zoom-out":
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.getZoom(tab.id, function(zoomFactor) {
                    chrome.tabs.setZoom(tab.id, zoomFactor - 0.2);
                });
            });
            break;
    }
}

function sendScrollMessage(messageType) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { type: messageType });
    });
}

var ws = null;
openConnection();

function closeConnection() {
    if (ws)
        ws.close();
}

function openConnection() {
    closeConnection();
    var url = "ws://localhost:9001";
    ws = new WebSocket(url);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    ws.onerror = onError;
}

function onOpen() {
    console.log("Websocket connected.");
}

function onClose() {
    console.log("Websocket disconnected.");
    ws = null;
}

function onMessage(event) {
    console.log(event);
    route(event.data);
}

function onError(event) {
    alert("Websocket error.");
}

// function sendSnapshot(snapshot) {
//     if (ws)
//         ws.send(snapshot);
// }
