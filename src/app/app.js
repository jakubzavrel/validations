import 'babel-polyfill';
/**
 * https://github.com/Keyamoon/svgxuse
 * If you do not use SVG <use xlink:href="…"> elements, remove svgxuse module
 */
import 'svgxuse';
import init from './init';
// import factory from './factory';
import { render, renderFactory } from './render';
import configureStore from './store/configureStore';
import cookieLaw from './components/cookie-law';
import mainMenu from './components/main-menu';
import validations from './components/validations';
import datepicker from './components/datepicker';
import suffix from './components/suffix';
import Timer from './components/Timer';
import PlusOne from './components/plus-one/PlusOne';

const app = (config) => {
    init(cookieLaw, document.getElementById('cookie-law'));
    init(mainMenu, document.querySelector('.header'));
    init(validations, document.querySelector('.js-validations'));
    init(suffix, document.querySelector('.js-suffix'));

    const store = configureStore(config);
    render(Timer, document.getElementById('timer'), { from: 100 });
    renderFactory(PlusOne, document.querySelectorAll('.plus-one'), {}, store);
};

app(window.config);
