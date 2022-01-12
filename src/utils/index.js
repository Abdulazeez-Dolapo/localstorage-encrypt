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

module.exports = { checkExpiryDate, createExpiryDate }
