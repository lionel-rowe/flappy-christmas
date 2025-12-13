// @ts-check
import './vendor/confetti.browser.min.js'

import { GameObject } from './gameObject.mjs'
import { ctx } from './canvas.mjs'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.mjs'

// @ts-ignore TODO types
const confetti = globalThis.confetti

export class Snow extends GameObject {
	// canvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
	canvas = Object.assign(document.createElement('canvas'), { width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
	confetti = confetti.create(this.canvas, { useWorker: true })

	duration = 15 * 1000
	animationEnd = Date.now() + this.duration
	skew = 1

	/** @override */
	update() {
		const duration = 15 * 1000
		const animationEnd = Date.now() + duration

		const timeLeft = animationEnd - Date.now()
		const ticks = Math.max(200, 500 * (timeLeft / duration))
		this.skew = Math.max(0.8, this.skew - 0.001)

		this.confetti({
			// particleCount: 0,
			particleCount: 1,
			startVelocity: 0,
			ticks,
			origin: {
				x: Math.random(),
				// since particles fall down, skew start toward the top
				y: (Math.random() * this.skew) - 0.2,
			},
			colors: ['#ffffff'],
			shapes: ['circle'],
			gravity: this.#randomInRange(0.2, 0.3),
			scalar: this.#randomInRange(0.2, 0.4),
			drift: this.#randomInRange(-0.4, 0.4),
			flat: true,
		})
	}
	/** @override */
	draw() {
		// TODO
		ctx.drawImage(this.canvas, 0, 0)
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 */
	#randomInRange(min, max) {
		return Math.random() * (max - min) + min
	}
}
