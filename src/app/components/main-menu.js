import arrays from '../utilities/arrays';
import events from '../utilities/events';

const mainMenu = (container) => {
    const menu = arrays.fromNodes(container.getElementsByClassName('js-menu'));
    const menuToggler = arrays.fromNodes(container.getElementsByClassName('js-menu-toggle'));

    events.on(menuToggler[0], { click: event => toggleMenu(event) });

    function toggleMenu(event) {
        event.preventDefault();
        menu[0].classList.toggle('active');
    }
};

export default mainMenu;
