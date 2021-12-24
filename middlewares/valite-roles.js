const { response, request } = require("express")
const { status } = require("express/lib/response")

const isAdminRole = (req = request, res = response, next) => {

    if(!req.loggedUser){
        return res.status(500).json({
            msg: 'Verify role without JWT verification'
        })
    }

    const { role, name } = req.loggedUser
    
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin` 
        })
    }

    next()
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if(!roles.includes(req.loggedUser.role)) {
            return res.status(401).json({
                msg: `The service require one of this roles ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}