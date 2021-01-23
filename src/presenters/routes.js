const fs = require('fs')
const path = require('path')

/**
 * @function
 * @param list
 * @param dir
 * @return array
 */
const parseObject = (list, dir) => list.reduce((acc, value) => {
    const obj = fs.readdirSync(`${dir}/${value}`)
    obj.map(a => acc.push({ object: a, root: `${value}`, dir: `${dir}/${value}/${a}` }))
    acc = acc.filter(a => a.object !== 'case.js')
    return acc
}, [])

/**
 * @function
 * @param list
 * @param app
 * @return array
 */
const generateRoute = (list, app) => list.map(val => {
    const c = require(val.dir)
    let args = [`/api${c.path}`]
    if (c.authenticate) args = args.concat(validateAuthorization)
    args = args.concat(c.middleware)
    args.push(c.handler)
    app._router[c.method.toLowerCase()].apply(app._router, args)
})

/**
 * @function
 * @param app
 * @returns {*}
 */
module.exports = (app) => {
    try {
        const dir = path.join(__dirname, '../controllers')
        const listRoutes = fs.readdirSync(dir)
        const parse = parseObject(listRoutes, dir)
        generateRoute(parse, app)
    } catch (error) {
        console.warn(`Error in generate modules routes express: ${error.message}`)
    }
}