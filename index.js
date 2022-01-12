const LocalStorage = require("./src/storage")

/**
 * Method to initialize the library
 * @param name: string
 * @param secretKey: string
 * @param expire: number
 */
const init = (name = "localStorage", secretKey, expire = 12) => {
	const localStorage = new LocalStorage(name, secretKey, expire)

	return localStorage
}

exports.init = init
