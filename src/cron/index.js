const cron = require('node-cron')

const { getAllDealsNotDeleted } = require('../presenters/pipedrive')
const { findOne, create } = require('../database/abstract')


// Run cron - a cada 1 minuto
cron.schedule('*/1 * * * *', async () => {
    try {
        const result = await getAllDealsNotDeleted()

        for (let i = 0; i < result.length; i++) {
            const element = result[i]
            const valid = await findOne('opportunities', { ...element })
            if (!valid) await create('opportunities', {...element, createdAt: new Date()})
        }

    } catch (error) {
        throw  new error(`Error rules cron: ${error.message}`)
    }
});