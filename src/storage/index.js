const { checkExpiryDate, createExpiryDate } = require("../utils")

const Crypto = require("../crypto")

class LocalStorage extends Crypto {
	#name
	#localStorage
	#window
	#expiryDate

	constructor(name, secretKey, expire) {
		super(secretKey)

		this.#name = name
		this.#localStorage = globalThis.localStorage
		this.#window = globalThis
		this.#expiryDate = createExpiryDate(expire)

		this.#initialize()
		this.#watchLocalStorage()
	}

	/**
	 * Method to get the current saved data
	 * @return current saved data: object
	 */
	#getCurrentData() {
		const currentData = this._decrypt(this.#localStorage.getItem(this.#name))
		return currentData
	}

	/**
	 * Method to delete the current saved data if it has expired
	 * @param value: object
	 * @return void
	 */
	#deleteIfExpired() {
		const isExpired = checkExpiryDate(this.#expiryDate)

		if (isExpired) this.clear()
	}

	/**
	 * Method to handle data expiry based on the time set
	 * @return void
	 */
	#watchLocalStorage() {
		if (typeof this.#localStorage === "undefined") return

		this.#window.addEventListener("storage", event => {
			if (!event.storageArea || event.key !== this.name) return

			this.#deleteIfExpired()
		})
	}

	/**
	 * Method to initialize the library
	 * @return void
	 */
	#initialize() {
		try {
			if (typeof this.#localStorage === "undefined") return
			if (this.#localStorage.hasOwnProperty(this.#name)) return

			this.clear()
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Method to save an item to the localStorage
	 * @param name: string
	 * @param value: string
	 * @return void
	 */
	save(name, value) {
		const currentData = this.#getCurrentData()
		currentData[name] = value

		const encryptedValue = this._encrypt(JSON.stringify(currentData))
		this.#localStorage.setItem(this.#name, encryptedValue)
	}

	/**
	 * Method to retrieve an item from the localStorage
	 * @param name: string
	 * @return any || undefined
	 */
	get(name) {
		const currentData = this.#getCurrentData()

		if (!currentData[name]) return
		return currentData[name]
	}

	/**
	 * Method to retrieve all items from the localStorage
	 * @return object
	 */
	getAll() {
		if (!this.#localStorage.hasOwnProperty(this.#name)) {
			return {}
		}

		return this.#getCurrentData()
	}

	/**
	 * Method to delete an item from the localStorage
	 * @param name: string
	 * @return void
	 */
	remove(name) {
		const currentData = this.#getCurrentData()
		delete currentData[name]

		const encryptedValue = this._encrypt(JSON.stringify(currentData))
		this.#localStorage.setItem(this.#name, encryptedValue)
	}

	/**
	 * Method to clear all saved data from the localStorage and reset to an empty object
	 * @return void
	 */
	clear() {
		const encryptedData = this._encrypt(JSON.stringify({}))
		this.#localStorage.setItem(this.#name, encryptedData)
	}

	/**
	 * Method to completely deactivate the library and remove all saved data from the localStorage
	 * @return void
	 */
	deactivate() {
		this.#localStorage.removeItem(this.#name)
	}
}

module.exports = LocalStorage
