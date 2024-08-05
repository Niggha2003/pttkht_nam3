const login = require('./login');
const check_jwt = require('./check_jwt');
const upload_image = require('./upload_image');
const get_image = require('./get_image');
const set_introduce = require('./set_introduce');
const set_infoCompany = require('./set_infoCompany');
const get_file = require('./get_file');
const send_email = require('./send_email');

const services = {
    login,
    check_jwt,
    upload_image,
    get_image,
    set_introduce,
    set_infoCompany,
    get_file,
    send_email,
}

module.exports = services;