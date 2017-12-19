export default {
    /* Support of "addEventListener" (IE10 uses "attachEvent" instead) */
    addEventListener: () => !!document.body.addEventListener,

    /* Support of CSS rule 'object-fit' (Not in IE, Edge) */
    objectFit: () => !!('object-fit' in document.body.style),

    /* Detect touch devices */
    touchEvents: () => !!('ontouchstart' in document.documentElement)
};
