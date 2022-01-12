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
	}

	/**
	 * Method to get the current saved data
	 */
	#getCurrentData() {
		const currentData = this._decrypt(this.#localStorage.getItem(this.#name))
		return currentData
	}

	/**
	 * Method to delete the current saved data if it has expired
	 * @param value: object
	 */
	#deleteIfExpired() {
		const isExpired = checkExpiryDate(this.#expiryDate)

		if (isExpired) {
			this.clear()
		}
	}

	/**
	 * Method to watch data being saved to the browser's localStorage
	 */
	#watchLocalStorage() {
		this.#window.addEventListener("storage", event => {
			if (!event.storageArea || event.key !== this.#name) return

			this.#deleteIfExpired()
		})
	}

	/**
	 * Method to initialize the library
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
	 */
	getAll() {
		if (!this.#localStorage.hasOwnProperty(this.#name)) {
			return "No data exist"
		}

		return this.#getCurrentData()
	}

	/**
	 * Method to delete an item from the localStorage
	 * @param name: string
	 */
	remove(name) {
		const currentData = this.#getCurrentData()
		delete currentData[name]

		const encryptedValue = this._encrypt(JSON.stringify(currentData))
		this.#localStorage.setItem(this.#name, encryptedValue)
	}

	/**
	 * Method to clear all saved data from the localStorage
	 */
	clear() {
		const encryptedData = this._encrypt(JSON.stringify({}))
		this.#localStorage.setItem(this.#name, encryptedData)
	}
}

module.exports = LocalStorage
