import Pikaday from '../../../node_modules/pikaday/pikaday';
import arrays from '../utilities/arrays';
import events from '../utilities/events';

const datepicker = (container) => {
    const picker = new Pikaday({ field: document.getElementById('datepicker') });
};

export default datepicker;
