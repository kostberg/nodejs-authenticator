const mongoose = require('mongoose')
const ProductsSchema = require('./Products.schema')

const Users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    products: {
        type: [ ProductsSchema ],
        default: [
            {
                name: "IPhone max",
                price: 1300,
                image: "https://www.elgiganten.se/primaryimage/10779"
            },
            {
                name: "Steelseries mouse",
                price: 50,
                image: "https://www.netonnet.se/GetFile/ProductImagePrimary/gaming/gamingmus/steelseries-rival-600-gaming-mouse(1002785)_365480_3_Normal_Extra.jpg"
            },
            {
                name: "Fila t-shirt",
                price: 10,
                image: "https://img.tradera.net/images/221/333589221_ef90fc64-b1ec-4673-a3ca-a6ca185a1128.jpg"
            }
    ]
    }
}, {timestamps: true})

module.exports = mongoose.model("users", Users)