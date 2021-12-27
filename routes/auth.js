const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { googleSignIn } = require('../controllers/google')
const { valitedateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
    check('mail', 'Mail is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    valitedateFields
], login)

router.post('/google', [
    check('id_token', 'Id token is required').notEmpty(),
    valitedateFields
], googleSignIn)

module.exports = router;