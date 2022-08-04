var images = {
        drive: 0,
        msg1: 0,
        msg2: 0,
        msg3: 0,
        arrow: 0,
        text_pull: 0,
        arrows: 0,
        car3: 0,
        lights3: 0
    },
    userMove = 1,
    canvas = document.getElementById("hpmdf-canvas"),
    ctx = canvas.getContext("2d"),
    smokeCanvas = document.getElementById("hpmdf-smoke-canvas"),
    smokeCtx = smokeCanvas.getContext("2d"),
    arrowsCanvas = document.getElementById("hpmdf-arrows-canvas"),
    arrowsCtx = arrowsCanvas.getContext("2d"),
    can = {},
    car = {},
    lights = {},
    arrows = {},
    idTimer = 0,
    idAutoTimeout = 0,
    idAutoTimeoutFinal = 0,
    items = {
        msg1: {},
        msg2: {},
        msg3: {},
        arrow: {},
        text_pull: {}
    }



window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame
})();

function load() {
    for (var i in images) {
        images[i] = new Image;
        images[i].onload = function () {};
        images[i].src = "../img/${key}.png".replace("${key}", i);
    }

    loadSmoke();
}

function sendMessage(msg) {
    window.parent.postMessage(JSON.stringify(msg), "*")
}

function initAction() {
    var canWidth = canvas.width * 0.26;
    var msgWidth = canvas.width * .76;
    var msgWidth2 = canvas.width * .90;
    var arrowWidth = canvas.width * .1;
    var pullWidth = canvas.width * .17;
    var closeWidth = canvas.width * .1;
    arrows = {
        arrow1: {
           sx: 1454,
           sy: 71,
           sWidth: 245,
           sHeight: 637,
           x: 0,
           y: arrowsCanvas.height / 3 * 2,
           width: arrowsCanvas.width * .2,
           height: arrowsCanvas.width * .2 * 2.6,
           isAlive: false
        },
        arrow2: {
            sx: 676.7,
            sy: 857.4,
            sWidth: 744.3,
            sHeight: 935.6,
            x: 0,
            y: arrowsCanvas.height / 2,
            width: arrowsCanvas.width * .55,
            height: arrowsCanvas.width * .55 * 1.26,
            isAlive: false
        },
        arrow3: {
            sx: 677,
            sy: 54,
            sWidth: 710,
            sHeight: 775,
            x: arrowsCanvas.width * .25,
            y: arrowsCanvas.height * .37,
            width: arrowsCanvas.width * .55,
            height: arrowsCanvas.width * .55 * 1.09,
            isAlive: false
        },
        arrow4: {
            sx: 27,
            sy: 1151.5,
            sWidth: 590,
            sHeight: 490.5,
            x: arrowsCanvas.width * .45,
            y: arrowsCanvas.height * .27,
            width: arrowsCanvas.width * .55,
            height: arrowsCanvas.width * .55 * .83,
            isAlive: false
        },
        arrow5: {
            sx: 27,
            sy: 718,
            sWidth: 451.5,
            sHeight: 359,
            x: arrowsCanvas.width * .60,
            y: arrowsCanvas.height * .19,
            width: arrowsCanvas.width * .47,
            height: arrowsCanvas.width * .47 * .80,
            isAlive: false
        },
        arrow6: {
            sx: 71,
            sy: 358,
            sWidth: 363,
            sHeight: 274,
            x: arrowsCanvas.width * .66,
            y: arrowsCanvas.height * .09,
            width: arrowsCanvas.width * .35,
            height: arrowsCanvas.width * .35 * .75,
            isAlive: false
        },
        arrow7: {
            sx: 69,
            sy: 58,
            sWidth: 301,
            sHeight: 211.5,
            x: arrowsCanvas.width * .65,
            y: arrowsCanvas.height * .01,
            width: arrowsCanvas.width * .32,
            height: arrowsCanvas.width * .32 * .70,
            isAlive: false
        },
        id: 0,
        currentArrow: 0,
        isAnimate: true,
        animate: function(){
            for (var i = 0; i < 7; i++) {
                if (i !== arrows.currentArrow) {
                    arrows[Object.keys(arrows)[i]].isAlive = false
                }
            }

            arrows[Object.keys(arrows)[arrows.currentArrow]].isAlive = true;
            if (arrows[Object.keys(arrows)[arrows.currentArrow - 1]]) {
                arrows[Object.keys(arrows)[arrows.currentArrow - 1]].isAlive = true;
            }
            if (arrows[Object.keys(arrows)[arrows.currentArrow - 2]]) {
                arrows[Object.keys(arrows)[arrows.currentArrow - 2]].isAlive = true;
            }

            (arrows.currentArrow === 6) ? arrows.currentArrow = 0 : arrows.currentArrow++;
        },
        startAnimate: function() {
            this.id = setInterval(this.animate, 180);
        },
        finalAnimate: function() {
            clearInterval(this.id);
            this.id = setInterval(this.animate, 130);
        },
        showAllArrows: function() {
            clearInterval(this.id);
            for (var i = 0; i < 7; i++) {
                arrows[Object.keys(arrows)[i]].isAlive = false
            }
            this.currentArrow = 0;
            this.id = setInterval(function(){
                if (arrows.currentArrow < 7) {
                    arrows[Object.keys(arrows)[arrows.currentArrow]].isAlive = true;
                    arrows.currentArrow++
                } else {
                    clearInterval(arrows.id)
                }

            }, 130)
        }
    };
    car = {
        x: -arrowsCanvas.width * 0.15,
        y: arrowsCanvas.height / 7 * 2,
        width: arrowsCanvas.width * 1.25,
        height: arrowsCanvas.width * 1.25 * 1.03,
    }
    lights = {
        x: -arrowsCanvas.width * 0.15,
        y: arrowsCanvas.height / 7 * 2,
        width: arrowsCanvas.width * 1.25,
        height: arrowsCanvas.width * 1.25 * 1.03,
        isAlive: false
    }
    can = {
        x: canvas.width * .72,
        y: canvas.height / 4 * 3,
        width: canWidth,
        height: canWidth * 2.02,
        dx: 0,
        dy: 0,
        speed: canvas.height / 200, //скорость с которой движется банка (и пользователем, и в initial state)
        top_point: canvas.height / 4 * 3 - canWidth * 2.02,
        isMove: false,
        direction: 0,
        isTouched: false,
        initialState: true,
        flag: true,
        top_point_anim: canvas.height / 4 * 3 - canWidth * 2.02 / 5,
        bottom_point_anim: canvas.height / 4 * 3,
        initialAnim: false,
        move: function() {

            if (this.initialAnim) {
                if (this.dy + this.y < this.top_point_anim) {
                    this.flag = false;
                }

                if (this.dy + this.y > this.bottom_point_anim) {
                    this.flag = true;
                }

                if (this.dy + this.y >= this.top_point_anim && this.flag) {
                    this.dy -= this.speed / 3;

                } else if (this.dy + this.y <= this.bottom_point_anim && !this.flag) {
                    this.dy += this.speed / 3;
                }
            }
        },
        moveToInitialState: function(){
            if (!this.initialState && this.dy < 0) {
                this.dy += this.speed * 2;
            }
        }
    };
    items.msg1 = {
        x: canvas.width * .12,
        y: canvas.height / 5 * 2,
        width: msgWidth,
        height: msgWidth * .49,
        minWidth: msgWidth,
        minHeight: msgWidth * .49,
        maxWidth: msgWidth * 1.15,
        step: 18,
        dx: 0,
        dy: 0,
        bigSize: false,
        isAlive: false,
        startAnim: false,
        animate: function() {
            if (this.startAnim) {
                if (this.isAlive) {
                    if (this.width >= this.maxWidth && !this.bigSize) {
                        this.bigSize = true;
                    }
                    if (!this.bigSize && this.width < this.maxWidth) {
                        this.dx -= this.step / 2;
                        this.dy -= (this.step * .49) / 2;
                        this.width += this.step;
                        this.height += this.step * .49;
                    } else if (this.bigSize && this.width > this.minWidth) {
                        this.dx += this.step / 2;
                        this.dy += (this.step * .49) / 2;
                        this.width -= this.step;
                        this.height -= this.step * .49;
                    }
                }
            }
        }
    };
    items.msg2 = {
        x: canvas.width * .05,
        y: canvas.height,
        width: msgWidth2,
        height: msgWidth2 * .42,
        speed: canvas.height / 50,
        dx: 0,
        dy: 0,
        isAlive: false,
        move: function () {
            if (this.isAlive && (this.y + this.dy) > canvas.height / 5 * 2) {
                this.dy -= this.speed;
            }
        }
    };
    items.msg3 = {
        x: canvas.width * .05,
        y: canvas.height / 3,
        width: msgWidth2,
        height: msgWidth2 * .61,
        dx: 0,
        dy: 0,
        isAlive: false
    };
    items.arrow = {
        x: canvas.width * .6,
        y: canvas.height * .80,
        dx: 0,
        dy: 0,
        width: arrowWidth,
        height: arrowWidth * 2.07,
        isAlive: false,
        speed: canvas.width / 350,
        flag: true,
        top_point: canvas.height * .80 - arrowWidth * 2.07 / 2,
        bottom_point: canvas.height * .80,
        move: function() {

            if (this.dy + this.y < this.top_point) {
                this.flag = false;
            }

            if (this.dy + this.y > this.bottom_point) {
                this.flag = true;
            }

            if (this.dy + this.y >= this.top_point && this.flag) {
                this.dy -= this.speed

            } else if (this.dy + this.y <= this.bottom_point && !this.flag) {
                this.dy += this.speed
            }

        }
    };
    items.text_pull = {
        x: canvas.width * .56,
        y: canvas.height * .93,
        width: pullWidth,
        height: pullWidth * 0.49,
        dx: 0,
        dy: 0,
        isAlive: false
    }

    initSmoke();

    arrows.isAnimate && arrows.startAnimate();

    setTimeout(function(){
        items.msg1.isAlive = true;
        items.arrow.isAlive = true;
        items.text_pull.isAlive = true;
        can.isMove = true;
        can.initialAnim = true;

        // setTimeout(function(){
        //     items.msg1.startAnim = true;
        // }, 500)

        idAutoTimeout = setTimeout(function(){
            can.initialAnim = false;
            items.msg1.isAlive = false;
            items.text_pull.isAlive = false;
            items.arrow.isAlive = false;
            smoke.isSmoked = true;
            arrows.finalAnimate();
            lights.isAlive = true;

            arrows.isAnimate = false;

            sendMessage({name: "hpmd", action: "auto-start"})
            idAutoTimeoutFinal = setTimeout(showFinalScreen, 2500);
        }, 3500)

        canvas.addEventListener("touchstart", function(e){
            e.preventDefault();
            e.stopPropagation();


            if (getX(e) > can.x && getX(e) < can.x + can.width && getY(e) > can.y && getY(e) < can.y + can.height) {


                var coords = {
                    x: getX(e),
                    y: getY(e)
                }

                canvas.addEventListener("touchend", function(){
                    idTimer = setTimeout(showFinalScreen, 1500);
                    if (can.dy !== 0) {
                        can.initialState = false;
                    }
                    smoke.stop = true;
                })

                canvas.addEventListener("touchmove", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    items.msg1.isAlive = false;
                    items.text_pull.isAlive = false;
                    can.initialAnim = false;

                    clearTimeout(idTimer);
                    clearTimeout(idAutoTimeout);
                    clearTimeout(idAutoTimeoutFinal);
                    smoke.stop = false;

                    lights.isAlive = true;

                    if (userMove === 1) {
                        sendMessage({name: "hpmd", action: "user-play"});
                        arrows.finalAnimate();
                        userMove++;
                    }

                    can.isTouched = true;

                    if (can.isMove) {
                        if (getY(e) - coords.y > 0) {
                            can.direction = 'down';
                            if (can.y + can.dy < can.y) {
                                can.dy += can.speed;
                            }
                        } else if (getY(e) - coords.y < 0) {
                            can.direction = 'up';
                            if (can.y + can.dy > can.top_point) {
                                can.dy -= can.speed;
                            }
                        } else if (getY(e) - coords.y === 0) {
                            can.direction = 'hold';
                        }
                        coords.y = getY(e);
                    }

                    smoke.isSmoked = true;


                })
            }
        })

        canvas.addEventListener("mousedown", function(e){
            e.preventDefault();
            e.stopPropagation();


            // if (getClickX(e) > can.x && getClickX(e) < can.x + can.width && getClickY(e) > can.y && getClickY(e) < can.y + can.height) {


                var coords = {
                    x: getClickX(e),
                    y: getClickY(e)
                }

                canvas.addEventListener("mouseup", function(){
                    console.log('mouseup')
                    idTimer = setTimeout(showFinalScreen, 1500);
                    if (can.dy !== 0) {
                        can.initialState = false;
                    }
                    smoke.stop = true;

                    canvas.removeEventListener("mousemove", mouseMoveFunction, event);
                })

                function mouseMoveFunction(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    items.msg1.isAlive = false;
                    items.text_pull.isAlive = false;
                    can.initialAnim = false;

                    clearTimeout(idTimer);
                    clearTimeout(idAutoTimeout);
                    clearTimeout(idAutoTimeoutFinal);
                    smoke.stop = false;

                    lights.isAlive = true;

                    if (userMove === 1) {
                        sendMessage({name: "hpmd", action: "user-play"});
                        arrows.finalAnimate();
                        userMove++;
                    }

                    can.isTouched = true;

                    if (can.isMove) {
                        if (getClickY(e) - coords.y > 0) {
                            can.direction = 'down';
                            if (can.y + can.dy < can.y) {
                                can.dy += can.speed;
                            }
                        } else if (getClickY(e) - coords.y < 0) {
                            can.direction = 'up';
                            if (can.y + can.dy > can.top_point) {
                                can.dy -= can.speed;
                            }
                        } else if (getClickY(e) - coords.y === 0) {
                            can.direction = 'hold';
                        }
                        coords.y = getClickY(e);
                    }

                    smoke.isSmoked = true;


                }

                canvas.addEventListener("mousemove", mouseMoveFunction, event);
            // }
        })
    }, 1500)


}

function showFinalScreen(){
    items.arrow.isAlive = false;
    items.msg2.isAlive = true;
    arrows.showAllArrows();
    can.isMove = false;
    (can.isTouched) ? sendMessage({name: "hpmd", action: "user-open-KV"}) : sendMessage({name: "hpmd", action: "auto-open-KV"});



    setTimeout(function(){
        items.msg2.isAlive = false;
        document.querySelector('#hpmdf-shadow').style.opacity = '.5';
        items.msg3.isAlive = true;
        sendMessage({name: "hpmd", action: "show-KV"});
    }, 2500)
}

function getX (e) {
    return (e.changedTouches[0].target.width / e.changedTouches[0].target.clientWidth) * e.changedTouches[0].clientX;
}

function getY (e) {
    return (e.changedTouches[0].target.height / e.changedTouches[0].target.clientHeight) * e.changedTouches[0].clientY;
}

function getClickX (e) {
    return (e.target.width / e.target.clientWidth) * e.clientX;
}

function getClickY (e) {
    return (e.target.height / e.target.clientHeight) * e.clientY;
}

function update() {

    if (smoke.isSmoked) {
        smoke.particles.forEach(function (particle) {
            particle.update();
        });

        if (can.isTouched) {
            if (smoke.stop) {
                if (smoke.currentParticleCount > 0) {
                    smoke.currentParticleCount -= smoke.stepParticleCount
                }
            } else {
                if (can.direction === 'down' && smoke.currentParticleCount > smoke.minParticleCount) {
                    smoke.currentParticleCount -= smoke.stepParticleCount
                } else if ((can.direction === 'up' && smoke.currentParticleCount < smoke.maxParticleCount) || (can.direction === 'hold' && smoke.currentParticleCount < smoke.maxParticleCount)) {
                    smoke.currentParticleCount += smoke.stepParticleCount
                    if (smoke.currentParticleCount > smoke.maxParticleCount) {
                        smoke.currentParticleCount = smoke.maxParticleCount;
                    }
                }
            }

        } else {
            (smoke.currentParticleCount < smoke.maxParticleCount && smoke.flag) ?
                smoke.currentParticleCount += smoke.stepParticleCount : smoke.flag = false; // флаг = true означает, что мы ещё не дошли до максимального значения
            if (smoke.currentParticleCount > smoke.maxParticleCount) {
                smoke.currentParticleCount = smoke.maxParticleCount;
            }
            if (!smoke.flag && smoke.currentParticleCount > 0) {
                smoke.currentParticleCount -= smoke.stepParticleCount
            }
        }
    }
    items.arrow.isAlive && items.arrow.move();
    items.msg1.isAlive && items.msg1.animate();
    items.msg2.isAlive && items.msg2.move();
    can.initialAnim && can.move();

    can.moveToInitialState();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
    arrowsCtx.clearRect(0, 0, arrowsCanvas.width, arrowsCanvas.height);

    //стрелки
    for (var k = 0; k < Object.keys(arrows).length; k++) {
        if (arrows[Object.keys(arrows)[k]].isAlive) {
            arrowsCtx.drawImage(
                images.arrows,
                arrows[Object.keys(arrows)[k]].sx,
                arrows[Object.keys(arrows)[k]].sy,
                arrows[Object.keys(arrows)[k]].sWidth,
                arrows[Object.keys(arrows)[k]].sHeight,
                arrows[Object.keys(arrows)[k]].x,
                arrows[Object.keys(arrows)[k]].y,
                arrows[Object.keys(arrows)[k]].width,
                arrows[Object.keys(arrows)[k]].height
            )
        }

    }

    arrowsCtx.drawImage(images.car3, car.x, car.y, car.width, car.height);

    if (smoke.isSmoked) {
        for (var j = 0; j < smoke.currentParticleCount; j++) {
            smoke.particles[j].draw()
        }
    }

    lights.isAlive && ctx.drawImage(images.lights3, lights.x, lights.y, lights.width, lights.height);

    for (var i = 0; i < Object.keys(items).length; i++) {

        if (items[Object.keys(items)[i]].isAlive) {

            ctx.drawImage(images[Object.keys(items)[i]],
                items[Object.keys(items)[i]].x + items[Object.keys(items)[i]].dx,
                items[Object.keys(items)[i]].y + items[Object.keys(items)[i]].dy,
                items[Object.keys(items)[i]].width,
                items[Object.keys(items)[i]].height);

        }
    }

    ctx.drawImage(images.drive, can.x, can.y + can.dy, can.width, can.height);
}

function run() {
    update();
    render();

    requestAnimationFrame(run)
}

smokeWidth = smokeCanvas.width * .35;
var smoke = {
    // массив для хранения дымков
    particles: [],
    width: smokeWidth,
    height: smokeWidth * 0.79,
    // количество дымков
    maxParticleCount: 170,
    minParticleCount: 9,
    currentParticleCount: 10,
    stepParticleCount: 3,
    // max скорость движения дымков
    maxVelocity: 2,
    isSmoked: false,
    flag: true,
    stop: false
}

function loadSmoke() {
    var imageObj = new Image();
    imageObj.onload = function() {
        smoke.particles.forEach(function(particle) {
            particle.setImage(imageObj);
        });
    };
    imageObj.src = "../img/smoke3.png";
}

function Particle(context) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    // The function to draw the particle on the canvas.
    this.draw = function() {

        // If an image is set draw it
        if(this.image){
            this.context.drawImage(this.image, this.x-208, this.y-128, smoke.width, smoke.height);
            // If the image is being rendered do not draw the circle so break out of the draw function
            return;
        }
    };

    // Update the particle.
    this.update = function() {
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= smokeCanvas.width) {
            this.xVelocity = -this.xVelocity;
            this.x = smokeCanvas.width;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= smokeCanvas.height) {
            this.yVelocity = -this.yVelocity;
            this.y = smokeCanvas.height;
        }

        // Check if has crossed the top edge
        else if (this.y <= smokeCanvas.height / 2) {
            this.yVelocity = -this.yVelocity;
            this.y = smokeCanvas.height;
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };

    this.setImage = function(image){
        this.image = image;
    }
}

function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

function initSmoke() {
    // Create the particles and set their initial positions and velocities
    for(var i=0; i < smoke.maxParticleCount; ++i){
        var particle = new Particle(smokeCtx);

        // Set the position to be inside the canvas bounds
        particle.setPosition(
            generateRandom(0, smokeCanvas.width),
            generateRandom(smokeCanvas.height / 3 * 2, smokeCanvas.height)
        );

        // Set the initial velocity to be either random and either negative or positive
        particle.setVelocity(
            generateRandom(-smoke.maxVelocity, smoke.maxVelocity),
            generateRandom(-smoke.maxVelocity, smoke.maxVelocity)
        );

        smoke.particles.push(particle);
    }
}








