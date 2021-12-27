const { json } = require("body-parser")
const { response } = require("express")
const { generateJWT } = require("../helpers/generate-jwt")
const { googleVerify } = require("../helpers/google-verify")
const User = require('../models/user')

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body
    try {

        const { name, mail, picture } = await googleVerify(id_token)

        let user = await User.findOne({mail})
        console.log(user)
        if(!user) {
            // create user
            const data = {
                name,
                mail,
                password: 'asd',
                google: true,
                role: 'USER_ROLE'
            }

            user = new User(data)
            await user.save()
        }

        if(!user.status) {
            res.status(400).json({
                msg: 'User blocked'
            })
        }

        // generate json web token
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token couldn t verify'
        })
    }


}

module.exports = {
    googleSignIn
}