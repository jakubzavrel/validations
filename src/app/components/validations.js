import arrays from '../utilities/arrays';
import events from '../utilities/events';
import validate from '../utilities/validate';

const validations = (container) => {
    const inputs = arrays.fromNodes(container.getElementsByClassName('js-validation'));
    const button = container.getElementsByClassName('js-validation-master');

    events.on(button[0], { click: event => validateForm(event) });

    function validateForm(event) {
        event.preventDefault();

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
            // console.log(field.dataset.validationMin);
            let message = validate(field.value, fieldValidation);
            if (message) {
                message = message.replace('null', '');
                error[0].classList.remove('u-hidden');
                error[0].innerHTML = message;
            }
        });
    }
};

export default validations;
