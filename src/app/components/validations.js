import arrays from '../utilities/arrays';
import events from '../utilities/events';
import validate from '../utilities/validate';

const validations = (container) => {
    const inputs = arrays.fromNodes(container.getElementsByClassName('js-validation'));
    const button = container.getElementsByClassName('js-validation-master');
    const formResult = container.getElementsByClassName('js-form-result');

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
        const error = field.closest('.form-group').getElementsByClassName('error');
        error[0].classList.add('u-hidden');
        const fieldValidation = validaitonRules(field);

        let message = validate(field.value, fieldValidation);
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

        inputs.forEach((field) => {
            const isInvalid = validateInput(field);

            if (isInvalid) {
                errorFree = false;
            }
        });

        // https://code.lengstorf.com/get-form-values-as-json/
        /**
         * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
         * @param  {Element} element  the element to check
         * @return {Boolean}          true if the value should be added, false if not
         */
        const isValidValue = element => {
            return (!['checkbox', 'radio'].includes(element.type) || element.checked);
        };

        /**
         * Retrieves input data from a form and returns it as a JSON object.
         * @param  {HTMLFormControlsCollection} elements  the form elements
         * @return {Object}                               form data as an object literal
         */
        const formToJSON = elements => [].reduce.call(elements, (data, element) => {
            if (isValidValue(element)) {
                data[element.name] = element.value;
            }
            return data;
        }, {});

        const formData = formToJSON(inputs);

        if (errorFree) {
            fetch('https://jsonplaceholder.typicode.com/posts',
                {
                    method: 'POST',
                    body: formData
                })
                .then((data) => {
                    if (data.status >= 200 && data.status < 208) {
                        formResult[0].innerHTML = 'Form send!';
                    }
                });
        }
    };

    events.on(button[0], { click: event => validateForm(event) });
    inputs.forEach((input) => {
        events.on(input, { blur: event => validateSingleInput(event) });
    });
};

export default validations;
