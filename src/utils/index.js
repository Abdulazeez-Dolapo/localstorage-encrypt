const checkDataExpiry = (data = {}) => {
	if (!data?.expiryDate) return false

	const date = new Date().getTime()

	const expiryDate = new Date(data.expiryDate).getTime()

	const expired = expiryDate <= date
	return expired
}

// timeToExpire should be in hours
const createDataExpiry = (timeToExpire = 24) => {
	const date = new Date().getTime()

	if (typeof timeToExpire === "number") {
		const expiryDate = date + timeToExpire * 60 * 60 * 1000

		return new Date(expiryDate)
	}
}

module.exports = { checkDataExpiry, createDataExpiry }
