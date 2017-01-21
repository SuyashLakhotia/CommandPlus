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

// createVideoHUD();

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

function createVideoHUD() {
    var video = document.createElement('video');
    video.setAttribute('id', 'video');
    video.setAttribute('autoplay', '');
    video.setAttribute('width', '300');
    video.style.position = 'fixed';
    video.style.top = 0;
    video.style.right = 0;
    document.body.appendChild(video);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }

    function videoError(e) {
        alert("Error with webcam video.");
    }
}
