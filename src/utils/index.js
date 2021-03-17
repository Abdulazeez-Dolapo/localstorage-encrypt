/**
 * Function to check expiry status of data in the localStorage
 * @param expiryDate: string
 */
const checkExpiryDate = expiryDate => {
	if (!expiryDate) return false

	const currentTime = new Date().getTime()
	const expiryTime = new Date(expiryDate).getTime()

	return currentTime >= expiryTime
}

const convertHoursToMilliseconds = timeInHours => {
	return timeInHours * 60 * 60 * 1000
}

/**
 * Function to create expiry status of data in the localStorage
 * @param timeToExpire: number in hours
 */
const createExpiryDate = timeToExpire => {
	const date = new Date().getTime()

	if (typeof timeToExpire === "number") {
		const expiryDate = date + convertHoursToMilliseconds(timeToExpire)

		return new Date(expiryDate)
	}
}

module.exports = { checkExpiryDate, createExpiryDate }
