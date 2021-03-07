const { checkExpiryDate, createExpiryDate } = require("../utils")

const Crypto = require("../crypto")

class LocalStorage extends Crypto {
	constructor(key, salt, name, expire, ctx) {
		super(key, salt)

		this.name = name
		this.expire = expire
		this.localStorage = ctx.localStorage
		this.window = ctx.window

		this.initialize()
	}

	/**
	 * Method to get the current saved data
	 */
	getCurrentData() {
		return this.decrypt(this.localStorage.getItem(this.name))
	}

	/**
	 * Method to delete the current saved data if it has expired
	 * @param value: object
	 */
	deleteIfExpired(value) {
		if (!checkExpiryDate(this.decrypt(value))) {
			this.localStorage.removeItem(this.name)
		}
	}

	/**
	 * Method to watch data being saved to the browser's localStorage
	 */
	watchLocalStorage() {
		this.window.addEventListener("storage", event => {
			if (!event.storageArea || event.key !== this.name) return

			this.deleteIfExpired(event.newValue)
		})
	}

	/**
	 * Method to initialize the library
	 */
	initialize() {
		this.watchLocalStorage()

		if (this.localStorage.hasOwnProperty(this.name)) {
			this.deleteIfExpired(this.localStorage.getItem(this.name))
		}

		const encryptedValue = this.encrypt(
			JSON.stringify({ expiryDate: createExpiryDate(this.expire) })
		)

		this.localStorage.setItem(this.name, encryptedValue)
	}

	/**
	 * Method to save an item to the localStorage
	 * @param name: string
	 * @param value: string
	 */
	save(name, value) {
		const currentData = this.getCurrentData()
		currentData[name] = value

		const encryptedValue = this.encrypt(JSON.stringify(currentData))
		this.localStorage.setItem(this.name, encryptedValue)
	}

	/**
	 * Method to retrieve an item from the localStorage
	 * @param name: string
	 */
	get(name) {
		const currentData = this.getCurrentData()
		return currentData[name]
	}

	/**
	 * Method to retrieve all items from the localStorage
	 */
	getAll() {
		if (!this.localStorage.hasOwnProperty(this.name)) {
			return "No data exist"
		}

		return this.getCurrentData()
	}

	/**
	 * Method to delete an item from the localStorage
	 * @param name: string
	 */
	remove(name) {
		const currentData = this.getCurrentData()
		delete currentData[name]

		const encryptedValue = this.encrypt(JSON.stringify(currentData))
		this.localStorage.setItem(this.name, encryptedValue)
	}

	/**
	 * Method to clear all saved data from the localStorage
	 */
	clear() {
		this.localStorage.removeItem(this.name)
	}
}

module.exports = LocalStorage
