const { isEmpty, isString } = require("lodash");
class ValidationChecks {

    validateRequestBody(requestBody) {
        let errors = [];

        if (!isString(requestBody.title) || isEmpty(requestBody.title.trim())) {
            this.pushErrorDetails('title should be of type string and cannot be empty string', 'title', errors)
        }
        if (!isString(requestBody.author) || isEmpty(requestBody.author.trim())) {
            this.pushErrorDetails('author should be of type string and cannot be empty string', 'author', errors)
        }
        if (!isString(requestBody.summary) || isEmpty(requestBody.summary.trim())) {
            this.pushErrorDetails('summary should be of type string and cannot be empty string', 'summary', errors)
        }
        return errors;
    }

    /**
     * Collects all errors
     * @param {*} error 
     * @param {*} attribute 
     * @param {*} collector 
     */
    pushErrorDetails(error, attribute, collector) {
        collector.push({ Attribute: attribute || '', detail: error });
    }
}

module.exports = new ValidationChecks(); 
