import arrays from '../utilities/arrays';
import events from '../utilities/events';
import validate from '../utilities/validate';

const validations = (container) => {
    const inputsGroup = arrays.fromNodes(container.getElementsByClassName('js-validation'));
    const submitButton = container.getElementsByClassName('js-validation-master');
    const formResult = container.getElementsByClassName('js-form-result');
    let singleError = container.dataset.validationSingle;
    let onBlurError = container.dataset.validationOnBlur;

    if (singleError === 'true') {
        singleError = true;
    } else {
        singleError = false;
    }

    if (onBlurError === 'true') {
        onBlurError = true;
    } else {
        onBlurError = false;
    }

    /**
     * create set of validation rules
     * @param  {Element} field  element to validate
     * @return {Object}         object of validation rules
     */
    const validaitonRules = (field) => {
        const fieldValidation = [{
            required: field.dataset.validationRequired,
            message: field.dataset.validationRequired
        },
        {
            noSpecialSymbols: field.dataset.validationNoSpecialSymbols,
            message: field.dataset.validationNoSpecialSymbols
        },
        {
            emailFormat: field.dataset.validationEmail,
            message: field.dataset.validationEmail
        },
        {
            min: field.dataset.validationMin,
            message: field.dataset.validationMinMessage
        },
        {
            regexValidation: field.dataset.validationRegular,
            message: field.dataset.validationRegularMessage
        },
        {
            interval: [field.dataset.validationIntervalMin, field.dataset.validationIntervalMax],
            message: field.dataset.validationIntervalMessage
        },
        {
            minLength: field.dataset.validationMinLength,
            message: field.dataset.validationMinLengthMessage
        },
        {
            maxLength: field.dataset.validationMaxLength,
            message: field.dataset.validationMaxLengthMessage
        },
        {
            equal: field.dataset.validationEqual,
            message: field.dataset.validationEqualMessage
        }
        ];

        return fieldValidation;
    };

    /**
     * function for validation of single input, same for single input validation and whole form
     * @param  {Element} field  element to validate
     * @return {Boolean}        return true if there is error
     */
    const validateInput = (field) => {
        const formGroup = field.closest('.form-group');
        const error = formGroup.getElementsByClassName('error');
        error[0].classList.add('u-hidden');
        const fieldValidation = validaitonRules(formGroup);

        let message = validate(singleError, field.value, fieldValidation);
        if (message) {
            message = message.replace('null', '');
            error[0].classList.remove('u-hidden');
            error[0].innerHTML = message;
        }

        return message;
    };

    /**
     * validate single input after blur
     * @param  {event} event    blur event on input
     * @return {Boolean}        always true
     */
    const validateSingleInput = (event) => {
        const currentInput = event.currentTarget;
        validateInput(currentInput);
        return true;
    };

    /**
     * validate whole form and show message if form was send
     * @param  {event} event click event on send button // eslint-disable
     */
    const validateForm = (event) => {
        event.preventDefault();
        let errorFree = true;

        inputsGroup.forEach((field) => {
            const curentGroup = arrays.fromNodes(field.getElementsByTagName('input'));
            let isInvalid;
            curentGroup.forEach((input) => {
                isInvalid = validateInput(input);
            });
            if (isInvalid) {
                errorFree = false;
            }
        });

        submitButton[0].setAttribute('disabled', 'true');
        if (errorFree) {
            submitButton[0].removeAttribute('disabled');
            formResult[0].innerHTML = 'Form send!';
        }
    };

    events.on(submitButton[0], { click: event => validateForm(event) });
    inputsGroup.forEach((inputGroup) => {
        const curentGroup = arrays.fromNodes(inputGroup.getElementsByTagName('input'));

        if (onBlurError) {
            curentGroup.forEach((input) => {
                events.on(input, { blur: event => validateSingleInput(event) });
            });
        }
    });
};

export default validations;
