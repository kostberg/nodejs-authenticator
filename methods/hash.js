const bcrypt = require('bcrypt');
const saltRounds = 10;

const genHash = async (pwd) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(pwd, salt)
}

module.exports = genHash