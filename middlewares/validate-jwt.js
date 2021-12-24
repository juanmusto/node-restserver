const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res = response, next) => {

    const token = req.header('x-token')

    if(!token) {
        res.status(401).json({
            msg: 'No token sended'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const loggedUser = await User.findById(uid)

        if(!loggedUser) {
            res.status(401).json({
                msg: 'Invalid user'
            })
        }
        
        // verify logged user is active
        if(!loggedUser.status) {
            res.status(401).json({
                msg: 'Invalid token'
            })
        }
        req.loggedUser = loggedUser

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    validateJWT
}