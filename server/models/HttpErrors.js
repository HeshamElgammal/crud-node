class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode; // 401 or whatever you want to return in the response body
    }
}

module.exports = HttpError;