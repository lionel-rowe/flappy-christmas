// @ts-check
import { canvas, ctx } from './canvas.mjs'
import { GameObject } from './gameObject.mjs'
import { images } from './images.mjs'

export class Background extends GameObject {
	img = images.background
	/** @override */
	draw() {
		ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height)

		// Hex number:
		// ff = 255/255 RED
		// ff = 255/255 GREEN
		// ff = 255/255 BLUE
		// 88 = 136/255 ALPHA
		ctx.fillStyle = '#ffffff88'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
	/** @override */
	update() {
		// no-op for background (it is static)
	}
}
