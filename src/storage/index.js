const { checkDataExpiry, createDataExpiry } = require("../utils")

const Crypto = require("../crypto")

class LocalStorage extends Crypto {
	constructor(key, salt, name, expire) {
		super(key, salt)

		this.name = name
		this.expire = expire

		this.initialize()
	}

	getCurrentData() {
		return this.decrypt(localStorage.getItem(this.name))
	}

	deleteIfExpired(value) {
		if (!checkDataExpiry(this.decrypt(value))) {
			localStorage.removeItem(this.name)
		}
	}

	watchLocalStorage() {
		window.addEventListener("storage", event => {
			if (!event.storageArea || event.key !== this.name) return

			this.deleteIfExpired(event.newValue)
		})
	}

	initialize() {
		this.watchLocalStorage()

		if (localStorage.hasOwnProperty(this.name)) {
			this.deleteIfExpired(localStorage.getItem(this.name))
		} else {
			const encryptedValue = this.encrypt(
				JSON.stringify({ expire: this.expire })
			)

			localStorage.setItem(this.name, encryptedValue)
		}
	}

	save(name, value) {
		const currentData = this.getCurrentData()
		currentData[name] = value

		const encryptedValue = this.encrypt(JSON.stringify(currentData))
		localStorage.setItem(name, encryptedValue)
	}

	get(name) {
		const currentData = this.getCurrentData()
		return currentData[name]
	}

	delete(name) {
		const currentData = this.getCurrentData()
		delete currentData[name]
	}

	clear() {
		localStorage.removeItem(this.name)
	}
}

module.exports = LocalStorage
