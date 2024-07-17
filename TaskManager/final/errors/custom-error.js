// Create a CustomError class which extends an Error class, it only has two properties: statusCode and message!
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message); // The built-in Error class has 'message' property!
        this.statusCode = statusCode;
    }
}
  
module.exports = CustomError;