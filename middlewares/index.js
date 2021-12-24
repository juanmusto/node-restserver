const valitedateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/valite-roles')

module.exports = {
    ...valitedateFields,
    ...validateJWT,
    ...validateRoles
}