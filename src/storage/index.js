const { checkExpiryDate, createExpiryDate } = require("../utils")

const Crypto = require("../crypto")

class LocalStorage extends Crypto {
	constructor(name, expire, ctx) {
		super()

		this.name = name
		this.expire = expire
		this.localStorage = ctx.localStorage
		this.window = ctx
		this.expiryDate = createExpiryDate(expire)

		this.initialize()
	}

	/**
	 * Method to get the current saved data
	 */
	_getCurrentData() {
		const currentData = this._decrypt(this.localStorage.getItem(this.name))
		delete currentData.expiryDate
		return currentData
	}

	/**
	 * Method to delete the current saved data if it has expired
	 * @param value: object
	 */
	_deleteIfExpired() {
		const isExpired = checkExpiryDate(this.expiryDate)

		if (isExpired) {
			this.localStorage.removeItem(this.name)
		}
	}

	/**
	 * Method to watch data being saved to the browser's localStorage
	 */
	_watchLocalStorage() {
		this.window.addEventListener("storage", event => {
			if (!event.storageArea || event.key !== this.name) return

			this._deleteIfExpired()
		})
	}

	/**
	 * Method to initialize the library
	 */
	initialize() {
		const encryptedValue = this._encrypt(
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
		const currentData = this._getCurrentData()
		currentData[name] = value

		const encryptedValue = this._encrypt(JSON.stringify(currentData))
		this.localStorage.setItem(this.name, encryptedValue)
	}

	/**
	 * Method to retrieve an item from the localStorage
	 * @param name: string
	 */
	get(name) {
		const currentData = this._getCurrentData()
		return currentData[name]
	}

	/**
	 * Method to retrieve all items from the localStorage
	 */
	getAll() {
		if (!this.localStorage.hasOwnProperty(this.name)) {
			return "No data exist"
		}

		return this._getCurrentData()
	}

	/**
	 * Method to delete an item from the localStorage
	 * @param name: string
	 */
	remove(name) {
		const currentData = this._getCurrentData()
		delete currentData[name]

		const encryptedValue = this._encrypt(JSON.stringify(currentData))

		this.localStorage.setItem(this.name, encryptedValue)
	}

	/**
	 * Method to clear all saved data from the localStorage
	 */
	clear() {
		const encryptedValue = this._encrypt(JSON.stringify({}))
		this.localStorage.setItem(this.name, encryptedValue)
	}
}

module.exports = LocalStorage
