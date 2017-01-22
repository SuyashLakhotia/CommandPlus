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


// var video = null;
// var canvas = null;
// var ctx = null;
// createVideoHUD();
// createCanvas();
// startSnapshotting();

function createVideoHUD() {
    video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('width', '320');
    video.setAttribute('height', '240');
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
        console.log(e);
    }
}

function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', '300');
    canvas.setAttribute('height', '240');
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.body.appendChild(canvas);
}

function startSnapshotting() {
    ctx = canvas.getContext('2d');
    var timer = setInterval(sendSnapshot, 20);
}

function sendSnapshot() {
    ctx.drawImage(video, 0, 0, 300, 240);
    var data = canvas.toDataURL('image/png');
    chrome.extension.sendMessage({
        type: "snapshot",
        payload: data
    });
}
