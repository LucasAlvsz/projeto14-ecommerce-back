export const getKeywordRegex = keyword => {
	return new RegExp(`[\\.]*${keyword}[\\.]*`, "i")
}

export default getKeywordRegex
