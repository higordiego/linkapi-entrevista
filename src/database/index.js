require('saslprep')
const { MongoClient } = require("mongodb")

let connect = null

/**
 * @function
 * @param uri - uri de banco de dados.
 * @returns {Proimise} Connect - Retornando conexão de banco de dados.
 */
exports.clientConnect = (uri) => {
    if (connect === null) connect = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    return connect
}
