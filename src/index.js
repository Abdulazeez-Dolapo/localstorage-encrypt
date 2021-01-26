const LocalStorage = require("../src/storage")

const RANDOM_CHARACTERS = Math.random().toString(16).slice(2, -1)

const init = (
	name = "localStorage",
	key = RANDOM_CHARACTERS,
	salt = RANDOM_CHARACTERS,
	expire = 12
) => {
	const localStorage = new LocalStorage(key, salt, name, expire)

	return localStorage
}

module.exports = init
