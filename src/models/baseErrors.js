'use strict';

// Here is the base error classes to extend from

class ApplicationError extends Error {
    get name() {
        return this.constructor.name;
    }
}

class DatabaseError extends ApplicationError { }

class UserFacingError extends ApplicationError { }

class UserInputError extends ApplicationError { }

class BadRequestError extends UserFacingError {
    constructor(message, options = {}) {
        super(message);

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }

    get statusCode() {
        return 400;
    }
}

class NotFoundError extends UserFacingError {
    constructor(message, options = {}) {
        super(message);

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }
    get statusCode() {
        return 404
    }
}
module.exports = {
    ApplicationError,
    DatabaseError,
    UserFacingError,
    UserInputError,
    BadRequestError,
    NotFoundError
}