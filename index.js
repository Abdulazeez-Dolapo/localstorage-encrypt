const LocalStorage = require("./src/storage")

const RANDOM_CHARACTERS = Math.random().toString(16).slice(2, -1)

/**
 * Method to initialize the library
 * @param name: string
 * @param key: string
 * @param salt: string
 * @param expire: number
 */
const init = (
	name = "localStorage",
	key = RANDOM_CHARACTERS,
	salt = RANDOM_CHARACTERS,
	expire = 12,
	ctx
) => {
	const localStorage = new LocalStorage(key, salt, name, expire, ctx)

	return localStorage
}

exports.init = init
