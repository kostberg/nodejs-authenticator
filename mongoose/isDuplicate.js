const User = require('./models/User.model.js')

const isDuplicate = async (username) => {
    query_res = await User.findOne({username});
    if(query_res == [] || !query_res){
        return false
    } else {
        return query_res
    }
}

module.exports = isDuplicate