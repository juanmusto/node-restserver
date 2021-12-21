const { response } = require('express')

const userGet = (req, res = response) => {
    
    const { page = 1, limit = 20} = req.query

    res.json({
        message: 'get api - Controller',
        page,
        limit
    })
}

const userPost = (req, res) => {

    const { name, age } = req.body
    
    res.json({
        message: 'post api - Controller',
        name,
        age
    })
}

const userPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        message: 'put api - Controller',
        id
    })
}

const userPatch = (req, res = response) => {
    
    res.json({
        message: 'Patch api - Controller'
    })
}

const userDelete = (req, res = response) => {
    
    res.json({
        message: 'Delete api - Controller'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}