var game = {
        isRun: !0,
        row: 3,
        col: 3,
        spots_qty: 8,
        items: [],
        over: !1,
        images: {
            platform: void 0,
            ball: void 0,
            black_spot: void 0,
            red_spot: void 0,
            grey_spot: void 0,
            shirt: void 0,
            text_congrats: void 0,
            text_capsuls: void 0,
            frame: void 0
        }
    }, canvas = document.getElementById("hpmd-canvas"),
    ctx = canvas.getContext("2d"), platform = {}, ball = {},
    congrats = {}, isTaped = !1;

function load() {
    for (var b in game.images) game.images[b] = new Image, game.images[b].onload = function () {
    }, "file:" !== location.protocol && (game.images[b].crossOrigin = "anonymous"), game.images[b].src = "../img/${key}.png".replace("${key}", b)
}

function getPixelRatio() {
    return window.devicePixelRatio || 1
}

function sendMessage(b) {
    window.parent.postMessage(JSON.stringify(b), "*")
}

function createItems() {
    for (var b = [game.images.black_spot, game.images.grey_spot, game.images.red_spot], c = 0; c < game.col; c++) game.items.push({
        img: b[getRandomInt(0, 2.9)],
        x: (3 + 2 * c) / 10 * canvas.width - canvas.width / 12,
        y: .2 * canvas.height,
        width: canvas.width / 6,
        height: canvas.width / 6,
        isAlive: !0
    });
    for (c = 0; c < game.col - 1; c++) game.items.push({
        img: b[getRandomInt(0, 2.9)],
        x: (4 + 2 * c) / 10 * canvas.width - canvas.width / 12,
        y: 10 / 30 * canvas.height,
        width: canvas.width / 6,
        height: canvas.width / 6,
        isAlive: !0
    });
    for (c = 0; c < game.col - 1; c++) game.items.push({
        img: b[getRandomInt(0,
            2.9)],
        x: (4 + 2 * c) / 10 * canvas.width - canvas.width / 12,
        y: 14 / 30 * canvas.height,
        width: canvas.width / 6,
        height: canvas.width / 6,
        isAlive: !0
    })
}

function getRandomInt(b, c) {
    return Math.floor(Math.random() * (c - b)) + b
}

function render() {
    var b = game.images, c = .8 * canvas.width,
        a = .1 * canvas.width,
        d = canvas.height / 7, e = .94 * c;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game.over) {
        var h = b.text_capsuls, k = b.text_congrats, l = b.frame, f = 0, g = 0;
        platform.speed = canvas.width / 150;
        platform.dy = platform.speed;
        congrats.dy = congrats.speed;
        setTimeout(function () {
            congrats.moveDown();
            platform.moveDown()
        }, 500);
        platform.isVisible || (platform.x = canvas.width / 2 - 5 * canvas.width / 24, platform.y = canvas.height / 3, g = canvas.width / 3, f = canvas.width / 3 * .28);
        ctx.drawImage(l,
            a, d, c, e);
        ctx.drawImage(b.shirt, a, d, c, e);
        ctx.drawImage(b.platform, platform.x, platform.y, platform.width, platform.height);
        ctx.drawImage(h, canvas.width / 3, canvas.height / 4, g, f);
        ctx.drawImage(k, congrats.x, congrats.y, congrats.width, congrats.height);
        setTimeout(function () {
            game.isRun = !1;
            isTaped ? sendMessage({name: "hpmd", action: "user-finished-game"}) : sendMessage({
                name: "hpmd",
                action: "game-finished"
            })
        }, 2E3)
    } else
        ctx.drawImage(game.images.shirt, a, d, c, e),
        game.items.forEach(function (a) {
            a.isAlive && ctx.drawImage(a.img, a.x, a.y, a.width, a.height)
    }),
            ctx.drawImage(game.images.ball, ball.x, ball.y, ball.width, ball.height),
            ctx.drawImage(game.images.platform, platform.x, platform.y, platform.width, platform.height)
}

function update() {
    platform.dx && platform.move();
    1 === game.spots_qty && (platform.speed = 0, ball.y >= platform.y - 1.5 * ball.height ? game.spots_qty-- : ball.move());
    0 === game.spots_qty && (game.over = !0);
    1 < game.spots_qty && (ball.dx || ball.dy) && ball.move();
    game.items.forEach(function (b) {
        b.isAlive && ball.collide(b) && ball.hitBlock(b)
    });
    ball.collide(platform) && ball.hitPlatform(platform);
    platform.checkBounce();
    ball.checkBounce()
}

function run() {
    update();
    render();
    game.isRun && (id = window.requestAnimationFrame(function () {
        run()
    }))
}

function initGame() {
    var b = 5 * canvas.width / 12;
    platform = {
        x: canvas.width / 2 - 5 * canvas.width / 24,
        y: 5 * canvas.height / 6,
        dx: 0,
        dy: 0,
        width: b,
        height: .6 * b,
        speed: canvas.width / 100,
        ball: !0,
        isVisible: !0,
        move: function () {
            this.x += this.dx;
            this.ball && (ball.x += this.dx)
        },
        moveDown: function () {
            this.y += this.dy;
            this.y > canvas.height && (this.isVisible = !1)
        },
        throwBall: function () {
            this.ball && (ball["throw"](), this.ball = !1)
        },
        stop: function () {
            this.dx = 0;
            this.ball && (ball.dx = 0)
        },
        checkBounce: function () {
            0 > this.x ? this.stop() : this.x + this.width > canvas.width &&
                this.stop()
        }
    };
    ball = {
        x: canvas.width / 2 - canvas.width / 14,
        y: 5 * canvas.height / 6 - canvas.width / 7,
        width: canvas.width / 7,
        height: canvas.width / 7,
        dx: 0,
        dy: 0,
        speed: canvas.width / 100,
        "throw": function () {
            this.dy = this.dx = this.speed
        },
        move: function () {
            this.x += this.dx;
            this.y += this.dy
        },
        checkBounce: function () {
            var a = this.x + this.dx, b = this.y + this.dy;
            0 > a ? (this.x = 0, this.dx = this.speed) : a + this.width > canvas.width ? (this.x = canvas.width - this.width, this.dx = -this.speed) : 0 > b ? (this.y = 0, this.dy = this.speed) : b > canvas.height && (this.x = canvas.width /
                2 - canvas.width / 14, this.y = 5 * canvas.height / 6 - canvas.width / 7, this.dy = this.dx = 0, platform.x = canvas.width / 2 - 5 * canvas.width / 24, platform.y = 5 * canvas.height / 6, platform.ball = !0)
        },
        collide: function (a) {
            var b = this.x + this.dx, c = this.y + this.dy;
            return b + this.width > a.x && b < a.x + a.width && c + this.height > a.y && c < a.y + a.height ? !0 : !1
        },
        hitPlatform: function () {
            this.dy = -this.speed
        },
        hitBlock: function (a) {
            this.dy *= -1;
            a.isAlive = !1;
            game.spots_qty--
        }
    };
    congrats = {
        x: .15 * canvas.width, y: canvas.height / 3, width: .7 * canvas.width, height: .252 * canvas.width,
        speed: canvas.width / 50, dy: 0, moveDown: function () {
            platform.isVisible && this.y < 6 * canvas.height / 7 - this.height && (this.y += this.dy)
        }
    };
    var c = null;
    canvas.addEventListener("touchstart", function (a) {
        a.preventDefault();
        a.stopPropagation();
        startEvent = c = a
    });
    canvas.addEventListener("touchmove", function (a) {
        a.preventDefault();
        a.stopPropagation();
        c
        && (0 < a.touches[0].pageX - c.touches[0].pageX ? platform.x + platform.dx + platform.width < canvas.width
            && (platform.dx = platform.speed) : 0 > a.touches[0].pageX - c.touches[0].pageX
            && 0 < platform.x + platform.dx && (platform.dx = -platform.speed), c = a)
    });
    canvas.addEventListener("touchend", function (a) {
        a.preventDefault();
        a.stopPropagation();
        isTaped = !0;
        0 === a.changedTouches[0].pageX - startEvent.changedTouches[0].pageX && !0 === platform.ball && (platform.throwBall(), sendMessage({
            name: "hpmd",
            action: "start-game"
        }));
        platform.stop();
        c = null
    })
}

window.addEventListener("message", function (b) {
    try {
        var c = JSON.parse(b.data);
        if (c.name && "hpmd" === c.name) switch (c.action) {
            case "start":
                platform.throwBall()
        }
    } catch (a) {
    }
});