chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.type == "snapshot") {
    //     sendSnapshotToServer(request.payload);
    //     return true;
    // }

    routeMessage(request.type);
    return true;
});

function routeMessage(messageType) {
    switch (messageType) {
        case "zoom-in":
            zoomIn();
            break;
        case "zoom-out":
            zoomOut();
            break;
        default:
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, { type: messageType, tabID: tab.id });
            });
            break;
    }
}

function zoomIn() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.getZoom(tab.id, function(zoomFactor) {
            chrome.tabs.setZoom(tab.id, zoomFactor + 0.2);
        });
    });
}

function zoomOut() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.getZoom(tab.id, function(zoomFactor) {
            chrome.tabs.setZoom(tab.id, zoomFactor - 0.2);
        });
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
    routeMessage(event.data);
}

function onError(event) {
    alert("Websocket error.");
}

// function sendSnapshotToServer(snapshot) {
//     if (ws)
//         ws.send(snapshot);
// }
