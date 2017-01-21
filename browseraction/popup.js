window.onload = function() {
    document.getElementById("scrollDownBtn").onclick = function() {
        chrome.extension.sendMessage({
            type: "scroll-down"
        });
    }

    document.getElementById("scrollUpBtn").onclick = function() {
        chrome.extension.sendMessage({
            type: "scroll-up"
        });
    }

    document.getElementById("zoomInBtn").onclick = function() {
        chrome.extension.sendMessage({
            type: "zoom-in"
        });
    }

    document.getElementById("zoomOutBtn").onclick = function() {
        chrome.extension.sendMessage({
            type: "zoom-out"
        });
    }
}
