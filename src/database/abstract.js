
const { clientConnect } = require('./index')

const url = `${process.env.DB_DATABASE_URL}`


/**
 * @function
 * @param  {number} skip
 * @return {number}
 */
const skipsValidate = (skip) => (skip !== 0 && skip > 0) ? skip - 1 : 0

/**
 * @function
 * @param limit
 * @returns {number|number}
 */
const limitValidate = (limit) => parseInt(limit) > 0 ? parseInt(limit) : 10

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Options mensagem filtrada para objeto de retorno.
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findAll = async (collection, query, options = {}) => {
    try {
        const conn = await clientConnect(url)
        const result = await conn.db().collection(collection).find(query, options).toArray()
        return result
    } catch (err) {
        throw new Error(`Error in search db: ${err}`)
    }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findOne = async (collection, query, options = {}) => {
    try {
        const conn = await clientConnect(url)
        const result = await conn.db().collection(collection).findOne(query, options)
        return result
    } catch (err) {
        throw new Error(`Error in search db: ${err}`)
    }
}

/**
 * @function
 * @param collection
 * @param query
 * @param skip
 * @param limit
 * @param sort
 * @returns {Promise<*>}
 */
exports.findAllPaginateAggregateNotQuery = async (collection, skip = 0, limit = 10, sort = { _id: -1 }) => {
    try {
        const conn = await clientConnect(url)
        const result = await conn.db().collection(collection).aggregate([
            {
                $facet: {
                    data: [
                        { $sort: sort },
                        { $skip: skipsValidate(skip) },
                        { $limit: limitValidate(limit) }
                    ],
                    page: [
                        { $group: { _id: null, totalPage: { $sum: 1 } } }
                    ]
                }
            },
            { $unwind: '$page' },
            {
                $project: {
                    data: 1,
                    'page.totalPage': 1,
                    'page.count': { $size: '$data' }
                }
            }
        ]).toArray()
        return result[0] || []
    } catch (err) {
        console.log(err)
        throw new Error(`Error in search db: ${err}`)
    }
}


/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findOneAndUpdate = async (collection, query, data, options = {}) => {
    try {
        const conn = await clientConnect(url)
        const result = await conn.db().collection(collection).findOneAndUpdate(query, data, options)
        return result
    } catch (err) {
        throw new Error(`Error in search db: ${err}`)
    }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */
exports.create = async (collection, data) => {
    try {
        const conn = await clientConnect(url)
        const result = await conn.db().collection(collection).insertOne(data)
        return result.ops[0]
    } catch (err) {
        throw new Error(`Error in search db: ${err}`)
    }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */
exports.update = async (collection, query, data) => {
    try {
        const conn = await clientConnect(url)
        const { result } = await conn.db().collection(collection).updateOne(query, data)

        return { result }
    } catch (err) {
        throw new Error(`Error in search db: ${err}`)
    }
}
