const { findAllPaginateAggregateNotQuery } = require('../../database/abstract')

exports.path = '/opportunities'
exports.method = 'get'
exports.middleware = []

exports.handler = async (req, res) => {
    try {
        const { page, limit } = req.query
        let result = await findAllPaginateAggregateNotQuery('opportunities', page, limit || 10)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: [{ title: 'Error interno', message: error.message }] })
    }
}