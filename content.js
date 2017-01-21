chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (!localStorage["scrollPos"])
        localStorage["scrollPos"] = 0;

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
    if (localStorage["scrollPos"] >= 20) return;

    localStorage["scrollPos"]++;
    $("html, body").animate({
        scrollTop: $(document).height() * (localStorage["scrollPos"] / 20)
    }, 400);
}

function scrollUp() {
    if (localStorage["scrollPos"] == 0) return;

    localStorage["scrollPos"]--;
    $("html, body").animate({
        scrollTop: $(document).height() * (localStorage["scrollPos"] / 20)
    }, 400);
}
