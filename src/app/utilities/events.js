/**
 * Events
 *
 * Shorthand for creating smart event listeners.
 *
 * Example: Single event.
 * events.on(document.body, 'click', (event) => {...});
 *
 * Example: Multiple events.
 * events.on(document.body, {
 *    click: (event) = {...},
 *    mouseover: (event) = {...},
 *    ...
 * });
 *
 * Example: Event with condition
 * events.on(this.triggers, {
 *    click: {
 *        condition: () => { // this function should return true/false
 *            return (document.body.clientWidth > 700);
 *        },
 *        callback: (event) => {
 *            event.preventDefault();
 *            !this.isOpen && this.open();
 *        }
 *    }
 * });
 * You can attach a condition to each event type separately.
 * Condition is checked on the event call, providing dynamic handling.
 *
 * NOTE: Please use full name "event" instead of "e" in event listener callback.
 * This makes it easier to find the event object during debugging.
 */
import arrays from './arrays';
import supports from './supports';

function transformCallback(initialCallback) {
    const isConditional = initialCallback.constructor === Object;
    const condition = isConditional ? initialCallback.condition : true;
    const callback = isConditional ? initialCallback.callback : initialCallback;

    return { condition, callback };
}

function bindEvents(selectors, events, callbackObj) {
    selectors = arrays.fromNodes(selectors);
    events instanceof Array || (events = [events]);

    /* Check for condition on each callback */
    let callback = callbackObj.callback;

    /* eslint-disable no-prototype-builtins */
    if (callbackObj.hasOwnProperty('condition') && callbackObj.condition.constructor === Function) {
        callback = (event) => { callbackObj.condition() && callbackObj.callback(event); };
    }
    /* eslint-enable */

    return events.map((event) => {
        if (supports.addEventListener) {
            return selectors.forEach(selector => selector.addEventListener(event, callback));
        }

        return selectors.forEach(selector => selector.attachEvent(`on${event}`, callback));
    });
}

export default {
    /* Add event listeners to the selector(s) */
    /* eslint-disable no-unreachable, no-unsafe-finally */
    on(...args/* selectors, events, callback // selectors, { event: callback } */) {
        try {
            const selectors = args[0];
            const events = args[1];

            /* Multiple events for single selector */
            if (events.constructor === Object) {
                Object.keys(events).forEach((eventName) => {
                    const initialCallback = events[eventName];
                    const callbackObj = transformCallback(initialCallback);

                    bindEvents(selectors, eventName, callbackObj);
                });

            } else {
                /* Single event for single selector */
                const initialCallback = args[2];
                const callbackObj = transformCallback(initialCallback);

                bindEvents(events, selectors, callbackObj);
            }
        } catch (error) {
            throw new Error(error);
            return false;
        } finally {
            return true;
        }
    },
    /* eslint-enable */

    /* Completely unmount event listener from the selector */
    unmount(selectors, event, func, useCapture = false) {
        selectors = arrays.fromNodes(selectors);

        /* eslint-disable no-unreachable, no-unsafe-finally */
        try {
            if (supports.addEventListener) {
                selectors.forEach(selector => selector.removeEventListener(event, func, useCapture));
            } else {
                selectors.forEach(selector => selector.detachEvent(event, func));
            }
        } catch (error) {
            throw new Error(error);
            return false;
        } finally {
            return true;
        }
        /* eslint-enable */
    }
};
