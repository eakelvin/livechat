const mongoose = require('mongoose')

mongoose
.connect('mongodb://localhost:27017/testing')
.then(() => console.log('Mongo Connected'))
.catch((error) => console.log(error))

const login = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection", login)

export default collection
//  module.exports=collection
