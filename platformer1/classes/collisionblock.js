class CollisionBlock {
    constructor({ position, imageSrc }) {
        this.position = position
        this.width = 16
        this.height = 16
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.5)' //red outline for collision block to show
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}