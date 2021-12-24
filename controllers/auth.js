const { response } = require('express')
const User = require('../models/user')
const { use } = require('../routes/auth')
const bcrypt = require('bcrypt')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {

    const { mail, password } = req.body

    try {

        // verify email exists
        const user = await User.findOne({mail})

        if(!user) {
            return res.status(400).json({
                msg: `Mail not exists in database`
            })
        }
        // verify user exists in db
        if(!user.status) {
            return res.status(400).json({
                msg: `Inactive user`
            })
        }

        // verify password
        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword) {
            return res.status(400).json({
                msg: `Invalid password`
            })
        }

        // generate JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Application error'
        })
    }
}

module.exports = {
    login
};