chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
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
