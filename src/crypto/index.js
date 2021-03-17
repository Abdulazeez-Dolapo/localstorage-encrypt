const crypto = require("crypto")
const pbkdf2Sync = crypto.pbkdf2Sync
const createCipher = crypto.createCipher
const createDecipher = crypto.createDecipher

const HASH_TYPE = "sha512"
const ALGORITHM = "aes-256-cbc"
const RANDOM_CHARACTERS = Math.random().toString(16).slice(2, -1)

class Crypto {
	constructor() {
		this.key = this.getNewKey(RANDOM_CHARACTERS, RANDOM_CHARACTERS)
	}

	/**
	 * Method to generate new key
	 * @param key: string
	 * @param salt: string
	 */
	getNewKey(key, salt) {
		if (!key || !salt) {
			return "Please enter a valid key and/or salt"
		}

		return pbkdf2Sync(key, salt, 64, 64, HASH_TYPE).toString("base64")
	}

	/**
	 * Method to encrypt data
	 * @param data: object
	 */
	encrypt(data) {
		try {
			if (!data) {
				return "Enter valid data for encryption"
			}

			let dataToEncrypt = data

			if (typeof data !== "string") {
				dataToEncrypt = JSON.stringify(data)
			}

			const cipher = createCipher(ALGORITHM, this.key)
			let result = cipher.update(dataToEncrypt, "utf8", "base64")
			result += cipher.final("base64")

			return result
		} catch (error) {
			return error
		}
	}

	/**
	 * Method to decrypt data
	 * @param data: string
	 */
	decrypt(data) {
		try {
			if (!data || typeof data !== "string") {
				return "Enter valid data for decryption"
			}

			const decipher = createDecipher(ALGORITHM, this.key)
			let result = decipher.update(data, "base64", "utf8")
			result += decipher.final("utf8")

			return JSON.parse(result)
		} catch (error) {
			return error
		}
	}
}

module.exports = Crypto
