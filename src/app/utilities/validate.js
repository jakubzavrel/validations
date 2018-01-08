import { email, specialCharacters } from '../const/regExp';
/**
 * @param  {any} value
 * @param  {array} validationRules
 * @return {null/string} Returns string in case that error was found.
 */
const validate = (singleError, value, validationRules = []) => {
    let errorMessage = null;// was null
    const returnError = (currentMessage) => {
        if (singleError) {
            // single parametr validation
            errorMessage = currentMessage;
        } else {
            errorMessage += `${currentMessage}<br/>`;
        }
    };

    if (validationRules.length) {
        for (let i = 0; i < validationRules.length; i += 1) {
            const rule = validationRules[i];

            /* Types of validations */
            const required = rule.required;
            const minValue = rule.min;
            const maxValue = rule.max;
            const interval = rule.interval;
            const minLength = rule.minLength;
            const maxLength = rule.maxLength;
            const noSpecialSymbols = rule.noSpecialSymbols;
            const emailFormat = rule.emailFormat;
            const specialSymbols = rule.specialSymbols;
            const equal = rule.equal;
            const regexValidation = rule.regexValidation;

            if (required) {
                if (value === '' || (!value && value !== 0)) {
                    returnError(rule.message);
                }
            }

            if (interval) {
                const min = interval[0];
                const max = interval[1];
                if (value < min || value > max) {
                    returnError(rule.message);
                }
            }

            if (minValue) {
                if (value < minValue) {
                    returnError(rule.message);
                }
            }

            if (maxValue) {
                if (value > maxValue) {
                    returnError(rule.message);
                }
            }

            if (minLength) {
                if (value.toString().length < minLength) {
                    returnError(rule.message);
                }
            }

            if (maxLength) {
                if (value.toString().length > maxLength) {
                    returnError(rule.message);
                }
            }

            if (emailFormat) {
                if (!value.match(email)) {
                    returnError(rule.message);
                }
            }

            if (noSpecialSymbols) {
                if (value.match(specialCharacters)) {
                    returnError(rule.message);
                }
            }

            if (specialSymbols) {
                if (!value.match(specialCharacters)) {
                    returnError(rule.message);
                }
            }

            if (equal) {
                if (value !== equal) {
                    returnError(rule.message);
                }
            }

            if (regexValidation) {
                const re = new RegExp(regexValidation);
                if (!value.match(re)) {
                    returnError(rule.message);
                }
            }
        }
    }

    return errorMessage;
};

export default validate;
