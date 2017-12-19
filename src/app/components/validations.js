import validator from 'validator';
import events from '../utilities/events';

const validations = (container) => {
    const inputs = container.getElementsByClassName('js-forms');
    const button = container.getElementsByClassName('js-validation-master');

    events.on(button, { click: event => validateForm(event) });

    function validateForm(event) {
        event.preventDefault();
        // console.log('sdg');
    }
};

export default validations;
