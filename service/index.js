const login = require('./login');
const check_jwt = require('./check_jwt');
const upload_image = require('./upload_image');
const get_image = require('./get_image');

const services = {
    login,
    check_jwt,
    upload_image,
    get_image
}

module.exports = services;