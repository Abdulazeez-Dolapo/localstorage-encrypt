const cryptoJs = require("crypto-js")
const { isJson } = require("../utils")

class Crypto {
	#secretKey

	constructor(secret) {
		this.#secretKey = secret
	}

	/**
	 * Method to encrypt data
	 * @param data: any
	 * @return void
	 */
	_encrypt(data) {
		try {
			if (!data) {
				throw new Error("Enter valid data for encryption")
			}

			let dataToEncrypt = data

			if (typeof data !== "string") {
				dataToEncrypt = JSON.stringify(data)
			}

			const result = cryptoJs.AES.encrypt(
				dataToEncrypt,
				this.#secretKey
			).toString()

			return result
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Method to decrypt data
	 * @param cipherText: string
	 * @return string
	 */
	_decrypt(cipherText) {
		try {
			if (!cipherText || typeof cipherText !== "string") {
				throw new Error("Enter valid string for decryption")
			}

			const bytes = cryptoJs.AES.decrypt(cipherText, this.#secretKey)
			const decryptedData = bytes.toString(cryptoJs.enc.Utf8)

			return isJson(decryptedData)
				? JSON.parse(decryptedData)
				: decryptedData
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = Crypto
