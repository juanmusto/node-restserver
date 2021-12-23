const { response } = require('express')
const bcryptjs = require('bcrypt')
const User = require('../models/user')

const userGet = async(req, res = response) => {
    
    const { from = 0, limit = 5} = req.query
    const query = { status: true };
    // const users = await User.find({status: true})
    //     .skip(Number(from))
    //     .limit(Number(limit))
    
    // const totalUsers = await User.countDocuments({status: true})

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find({status: true})
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const userPost = async (req, res) => {

    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role})
  
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    })
}

const userPut = async(req, res = response) => {

    const { id } = req.params
    const { password, google, mail, ...userObj } = req.body

    // Validate with the database
    if(password) {
        const salt = bcryptjs.genSaltSync();
        userObj.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userObj)

    res.json({
        message: 'put api - Controller',
        user
    })
}

const userPatch = (req, res = response) => {
    
    res.json({
        message: 'Patch api - Controller'
    })
}

const userDelete = async(req, res = response) => {

    const { id } = req.params

    // remove fisically
    // const user = await User.findByIdAndDelete(id)

    const user = await User.findByIdAndUpdate(id, {status: false})

    
    res.json({
        user
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}