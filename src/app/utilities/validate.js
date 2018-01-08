import { email, specialCharacters } from '../const/regExp';
/**
 * @param  {any} value
 * @param  {array} validationRules
 * @return {null/string} Returns string in case that error was found.
 */
const validate = (value, validationRules = []) => {
    let errorMessage = null;// was null

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
                    errorMessage += `${rule.message}<br/>`;
                    // single parametr validation
                    // errorMessage = rule.message;
                    // break;
                }
            }

            if (interval) {
                const min = interval[0];
                const max = interval[1];
                if (value < min || value > max) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (minValue) {
                if (value < minValue) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (maxValue) {
                if (value > maxValue) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (minLength) {
                if (value.toString().length < minLength) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (maxLength) {
                if (value.toString().length > maxLength) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (emailFormat) {
                if (!value.match(email)) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (noSpecialSymbols) {
                if (value.match(specialCharacters)) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (specialSymbols) {
                if (!value.match(specialCharacters)) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (equal) {
                if (value !== equal) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }

            if (regexValidation) {
                const re = new RegExp(regexValidation);
                if (!value.match(re)) {
                    errorMessage += `${rule.message}<br/>`;
                }
            }
        }
    }

    return errorMessage;
};

export default validate;
