const User = require('./models/User.model.js')

const productExists = async (name) => {
    query_res = await User.findOne({ name });
    if(query_res == [] || !query_res){
        return false
    } else {
        // Search for product name here
        return query_res
    }
}

module.exports = productExists