// @ts-check
import './vendor/confetti.browser.min.js'

import { GameObject } from './gameObject.mjs'
import { canvas, ctx } from './canvas.mjs'
import { randomInRange } from './utils.mjs'

// @ts-ignore TODO types
const confetti = globalThis.confetti

/**
 * @typedef {{ speed: number, opacity: number, spawnFrequency: number, size: number }} SnowParams
 * `speed` - Speed of the snowflakes (1 = "normal speed" = 15-second lifetime for each snowflake)
 * `opacity` - Opacity of the snowflakes (0 to 1)
 * `spawnFrequency` - Likelihood of spawning a snowflake each frame (0 to 1)
 * `size` - Size of the snowflakes
 */

export class Snow extends GameObject {
	/** @param {SnowParams} params */
	constructor({ speed, opacity, spawnFrequency, size }) {
		super()
		this.speed = speed
		this.opacity = opacity
		this.spawnFrequency = spawnFrequency
		this.size = size
	}

	canvas = new OffscreenCanvas(canvas.width, canvas.height)
	// can't use worker due to https://github.com/catdad/canvas-confetti/issues/107
	confetti = confetti.create(this.canvas, { useWorker: false })

	skew = 1

	/** @override */
	update() {
		if (document.visibilityState !== 'visible') return
		if (Math.random() > this.spawnFrequency) return

		const ticks = 500
		this.skew = Math.max(0.8, this.skew - 0.001)

		this.confetti({
			particleCount: 1,
			startVelocity: 0,
			ticks,
			origin: {
				x: Math.random(),
				y: (Math.random() * this.skew) - 0.2,
			},
			colors: ['#ffffff'],
			shapes: ['circle'],
			gravity: randomInRange(0.2, 0.3) * this.speed,
			scalar: randomInRange(0.2, 0.4) * this.size,
			drift: randomInRange(-0.4, 0.4) * this.speed,
			flat: true,
		})
	}
	/** @override */
	draw() {
		ctx.commit(() => {
			ctx.globalAlpha = this.opacity
			ctx.drawImage(this.canvas, 0, 0)
		})
	}

	resize() {
		this.canvas.width = canvas.width
		this.canvas.height = canvas.height
		this.confetti = confetti.create(this.canvas, { useWorker: false })
	}
}
