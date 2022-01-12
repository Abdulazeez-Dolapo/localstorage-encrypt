const cryptoJs = require("crypto-js")

class Crypto {
	constructor(secret) {
		this.secretKey = secret
	}

	/**
	 * Method to encrypt data
	 * @param data: object
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
				this.secretKey
			).toString()

			return result
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Method to decrypt data
	 * @param cipherText: string
	 */
	_decrypt(cipherText) {
		try {
			if (!cipherText || typeof cipherText !== "string") {
				throw new Error("Enter valid data for decryption")
			}

			const bytes = cryptoJs.AES.decrypt(cipherText, this.secretKey)
			const decryptedData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8))

			return decryptedData
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = Crypto
