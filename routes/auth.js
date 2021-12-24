const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { valitedateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
    check('mail', 'Mail is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    valitedateFields
], login)

module.exports = router;