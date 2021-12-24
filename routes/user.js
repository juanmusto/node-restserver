const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const { isValidRole, mailExists, existsUserId } = require('../helpers/db-validators');
const { validateJWT, isAdminRole, hasRole, valitedateFields } = require('../middlewares')

const router = Router();

router.get('/', userGet)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and minimun 6 characters').isLength({ min: 6}), 
    check('mail', 'Mail is not valid').isEmail(),
    check('mail').custom(mailExists),
    // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    valitedateFields
], userPost)

router.put('/:id', [
    check('id', 'Not valid id').isMongoId(),
    check('id').custom(existsUserId),
    check('role').custom(isValidRole),
    valitedateFields
], userPut)

router.patch('/', userPatch)

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SELL_ROLE'),
    check('id', 'Not valid id').isMongoId(),
    check('id').custom(existsUserId),
    valitedateFields
], userDelete)

module.exports = router
