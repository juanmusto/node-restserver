const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async(role = '') => {
    const existsRole = await Role.findOne({role})

    if(!existsRole)
        throw new Error(`The rol ${rol} is not define in database`)

}

const mailExists = async(mail) => {
    const existsMail = await User.findOne({mail})

    if(existsMail) 
        throw new Error (`The email ${mail} already exists`)   
}

const existsUserId = async(id) => {
    const existUser = await User.findById(id)

    if(!existUser) 
        throw new Error (`The id ${id} not exists`)   
}

module.exports = {
    isValidRole,
    mailExists,
    existsUserId
}