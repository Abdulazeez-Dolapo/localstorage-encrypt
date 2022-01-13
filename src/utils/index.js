/**
 * Function to check expiry status of data in the localStorage
 * @param expiryDate: number
 * @return boolean
 */
const checkExpiryDate = expiryDate => {
	if (!expiryDate || typeof expiryDate !== "number") return false

	try {
		const currentTime = new Date().getTime()
		const expiryTime = new Date(expiryDate).getTime()

		return currentTime >= expiryTime
	} catch (error) {
		return false
	}
}

/**
 * Function to check expiry status of data in the localStorage
 * @param timeInHours: number
 * @return number
 */
const convertHoursToMilliseconds = timeInHours => {
	return timeInHours * 60 * 60 * 1000
}

/**
 * Function to create expiry status of data in the localStorage
 * @param timeToExpire: number in hours
 * @return number
 */
const createExpiryDate = timeToExpire => {
	if (typeof timeToExpire !== "number") return

	const date = new Date().getTime()
	const expiryDate = date + convertHoursToMilliseconds(timeToExpire)

	return expiryDate
}

/**
 * Method to check if an item is a valid stringified JSON
 * @param item: any
 * @return boolean
 */
const isJson = item => {
	item = typeof item !== "string" ? JSON.stringify(item) : item

	try {
		item = JSON.parse(item)
	} catch (e) {
		return false
	}

	if (typeof item === "object" && item !== null) {
		return true
	}

	return false
}

module.exports = { checkExpiryDate, createExpiryDate, isJson }
