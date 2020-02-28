const bcrypt = require('bcrypt');

const validateHash = async (pwd, hash) => {
    await bcrypt.compare(pwd, hash, function (err, result) {
        return result
    });
}

module.exports = validateHash