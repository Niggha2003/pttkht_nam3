const login = require('./login');
const check_jwt = require('./check_jwt');

const services = {
    login,
    check_jwt
}

module.exports = services;