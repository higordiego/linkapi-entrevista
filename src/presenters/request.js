const axios = require('axios')

/**
 * @function
 * {@link module:https://www.npmjs.com/package/axios}.
 * @requires module:axios
 * @param  {Object} data
 */
const request = async (params, attempt, maxium) => {
    try {
        const { data } = await axios.request(params)

        return data
    } catch (e) {
        if (attempt >= maxium) throw e

        return request(params, attempt + 1, maxium)
    }
}

/**
 * @function
 * @param  {Object} data
 * @return {Promise}
 */
exports.requestApi = (params) => {
    const maxium = process.env.RETRY_REQUEST || 3
    return request(params, 0, maxium)
}
