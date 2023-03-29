const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //grabbing 2d api tools

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollision2D = []
for (let i = 0; i < floorCollision.length; i += 36) {
    floorCollision2D.push(floorCollision.slice(i, i + 36))
}

const platformCollision2D = []
for (let i = 0; i < platformCollision.length; i += 36) {
    platformCollision2D.push(platformCollision.slice(i, i + 36))
}
console.log(platformCollision2D)

const collisionBlocks = []

floorCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            console.log('draw a block here')
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16
                    },
                })
            )
        }
    })
})

console.log(collisionBlocks)

const platformBlocks = []

platformCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16
                    }
                })
            )
        }
    })
})

console.log(platformBlocks)

const gravity = 0.5;

const player = new Player({
    position: {
        x: 70,
        y: 0
    },
    collisionBlock: collisionBlocks,
    imageSrc: './assets/warrior/Idle.png',
});

const keys = {
    d: {
        pressed: false,
    },

    a: {
        pressed: false,
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/background.png'
})

function animate() { //animate is a name we gave to function
    window.requestAnimationFrame(animate) //continuous call on this function

    //redrawing the background each frame
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(4, 4);
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update();

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    platformBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    player.update();

    player.velocity.x = 0

    if (keys.d.pressed) {
        player.velocity.x = 5
    }
    else if (keys.a.pressed) {
        player.velocity.x = -5
    }
    c.restore();


}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            player.velocity.y = -5;
    }
})


window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
})