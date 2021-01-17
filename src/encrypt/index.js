const crypto = require("crypto")
const pbkdf2Sync = crypto.pbkdf2Sync
const createCipher = crypto.createCipher
const createDecipher = crypto.createDecipher

const HASH_TYPE = "sha512"
const ALGORITHM = "aes-256-cbc"

const key = "key"
const salt = "salt"

const newKey = pbkdf2Sync(key, salt, 64, 64, HASH_TYPE).toString("base64")

const encrypt = data => {
	try {
		if (!data) {
			return "Enter valid data for encryption"
		}

		let dataToEncrypt = data

		if (typeof data !== "string") {
			dataToEncrypt = JSON.stringify(data)
		}

		const cipher = createCipher(ALGORITHM, newKey)
		let result = cipher.update(dataToEncrypt, "utf8", "base64")
		result += cipher.final("base64")

		return result
	} catch (error) {
		return error
	}
}

module.exports = { encrypt }
