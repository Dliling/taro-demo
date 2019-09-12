/* eslint-disable */
const proxy = {
    'GET /demo/imgList': require('./demo/img')
};

module.exports = process.env.WITH_MOCK ? proxy : {};