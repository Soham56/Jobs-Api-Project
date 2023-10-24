const BadRequestError = require("./bad-request");
const CustomApiError = require("./custom-api");
const UnauthenticationError = require("./unauthenticated");
const NotFound = require('./not-found');


module.exports = {
    BadRequestError,
    CustomApiError,
    UnauthenticationError,
    NotFound
}