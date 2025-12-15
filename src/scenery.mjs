// @ts-check
import { canvas, ctx } from './canvas.mjs'
import { DELTA_X } from './constants.mjs'
import { GameObject } from './gameObject.mjs'
import { game } from './game.mjs'
import { images } from './images.mjs'

class Obstacle {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

export class Scenery extends GameObject {
	top = { img: images.obstacleTop }
	bottom = { img: images.obstacleBottom }
	gap = 130
	distance = 130
	moved = true
	obstacles = /** @type {Obstacle[]} */ ([])
	/** @override */
	draw() {
		for (const obstacle of this.obstacles) {
			ctx.drawImage(this.top.img, obstacle.x, obstacle.y)
			ctx.drawImage(
				this.bottom.img,
				obstacle.x,
				obstacle.y + this.top.img.height + this.gap,
			)
		}
	}
	/** @override */
	update() {
		const increment = () => ((this.distance + this.top.img.width) * (Math.random() * 0.5 + 1))
		const startX = (this.obstacles.at(-1)?.x ?? increment()) + increment()

		for (let x = startX; x < canvas.width || this.obstacles.length < 2; x += increment()) {
			this.#addObstacle(x)
		}

		if (game.status !== 'playing') return

		for (const obstacle of this.obstacles) {
			obstacle.x -= DELTA_X
		}

		if (this.obstacles.length && this.obstacles[0].x < -this.top.img.width) {
			this.obstacles.shift()
			this.moved = true
		}
	}

	/** @param {number} x */
	#addObstacle(x) {
		this.obstacles.push(
			new Obstacle(
				x,
				-210 * Math.min(Math.random() + 1, 1.8),
			),
		)
	}
}
