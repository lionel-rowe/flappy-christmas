// @ts-check

/** @abstract */
export class GameObject {
	constructor() {
		if (new.target === GameObject) {
			throw new Error(`Cannot instantiate abstract class ${new.target.name}.`)
		}
	}

	/**
	 * @abstract
	 * @returns {void}
	 */
	draw() {
		this.#abstractMethod('draw')
	}

	/**
	 * @abstract
	 * @returns {void}
	 */
	update() {
		this.#abstractMethod('update')
	}

	/** @param {string} name */
	#abstractMethod(name) {
		throw new Error(`Abstract method ${name} not implemented by ${this.constructor.name}.`)
	}
}
