const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Database OK')
    }
    catch (err) {
        console.log(err)
        throw new Error('Database error')
    }
}

module.exports = {
    dbConnection
}