import arrays from '../utilities/arrays';
import events from '../utilities/events';
import validate from '../utilities/validate';

const validations = (container) => {
    const inputs = arrays.fromNodes(container.getElementsByClassName('js-validation'));
    const button = container.getElementsByClassName('js-validation-master');
    const formResult = container.getElementsByClassName('js-form-result');

    events.on(button[0], { click: event => validateForm(event) });

    function validateForm(event) {
        event.preventDefault();
        let errorFree = true;

        inputs.forEach((field) => {
            const error = field.closest('.form-group').getElementsByClassName('error');
            error[0].classList.add('u-hidden');
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
            }
            ];

            let message = validate(field.value, fieldValidation);
            if (message) {
                errorFree = false;
                message = message.replace('null', '');
                error[0].classList.remove('u-hidden');
                error[0].innerHTML = message;
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
    }
};

export default validations;
