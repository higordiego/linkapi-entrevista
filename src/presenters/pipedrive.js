
const { requestApi } = require('./request')

/**
 * @function
 * @param token
 * @returns {{api_token, start: number, status: string}}
 */
const mountedParamsDeal = (token) => ({
    status: "all_not_deleted",
    start: 0,
    api_token: token
})

/**
 * @function
 * @param data
 * @returns {*|*[]}
 */
const returnDealArray = (data) =>
    data && Array.isArray(data)
        ? data.map(mountedBodyReturnDeal)
        : []

/**
 * @function
 * @param data
 * @returns {{amount, name: *, currency: *, title: *, status}}
 */
const mountedBodyReturnDeal = (data) => ({
    pipedrive_id: data.id,
    title: data.title,
    amount: data.value,
    status: data.status,
    name: data.person_name,
    currency: data.currency,
    createTime: data.add_time
})

/**
 * @function
 * @returns {Promise<*>}
 */
exports.getAllDealsNotDeleted = async () => {
    const configRequest = {
        url: `${process.env.INTEGRATION_PIPEDRIVE_URL}/deals`,
        method: 'get',
        params: mountedParamsDeal(process.env.INTEGRATION_PIPEDRIVE_TOKEN)
    }
    const { data } = await requestApi(configRequest)
    return returnDealArray(data)
}