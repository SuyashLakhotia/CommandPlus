chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.type) {
        case "scroll-down":
            scrollDown();
            break;
        case "scroll-up":
            scrollUp();
            break;
    }
});

function scrollDown() {
    $("html, body").animate({
        scrollTop: $(document).scrollTop() + window.innerHeight - 100
    }, 400);
}

function scrollUp() {
    $("html, body").animate({
        scrollTop: $(document).scrollTop() - window.innerHeight + 100
    }, 400);
}
