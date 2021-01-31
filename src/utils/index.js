/**
 * Function to check expiry status of data in the localStorage
 * @param data: object
 */
const checkExpiryDate = (data = {}) => {
	if (!data?.expiryDate) return false

	const date = new Date().getTime()

	const expiryDate = new Date(data.expiryDate).getTime()

	const expired = expiryDate <= date
	return expired
}

/**
 * Function to create expiry status of data in the localStorage
 * @param timeToExpire: number in hours
 */
const createExpiryDate = (timeToExpire = 24) => {
	const date = new Date().getTime()

	if (typeof timeToExpire === "number") {
		const expiryDate = date + timeToExpire * 60 * 60 * 1000

		return new Date(expiryDate)
	}
}

module.exports = { checkExpiryDate, createExpiryDate }
