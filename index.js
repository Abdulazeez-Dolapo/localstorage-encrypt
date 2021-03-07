const LocalStorage = require("./src/storage")

/**
 * Method to initialize the library
 * @param name: string
 * @param expire: number
 * @param ctx: the windows object
 */
const init = (name = "localStorage", expire = 12, ctx) => {
	const localStorage = new LocalStorage(name, expire, ctx)

	return localStorage
}

exports.init = init
