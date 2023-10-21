/*
 * 03_variableFonts
 *
 * This sketch demonstrates a mapping between the slant and width of a variable font
 * and the position of the pointer. The font-related properties all expect different
 * kinds of numbers, so we need to do some data processing.
 * 
 */

let state = Object.freeze({
    pointerEvent: { x: 0, y: 0 },
});


const settings = Object.freeze({
    textElement: document.querySelector(".text"),
});


/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
    state = Object.freeze({ ...state, ...newState });
}


/**
 * Return `num` normalized to 0..1 in range min..max.
 * @param {number} num
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function scale(num, min, max) {
    if (num < min) return 0;
    if (num > max) return 1;
    return (num - min) / (max - min);
}


/**
 * Return `num` transformed from the normalised 0..1 form back to the min..max form.
 * @param {number} num
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function toAbsolute(num, min, max) {
    if (num < 0) return min;
    if (num > 1) return max;
    return (num * (max - min)) + min;
}


/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
    const { pointerEvent } = state;
    const { textElement } = settings;

    // Map the font weight to the width
    const x = scale(pointerEvent.x, 0, window.innerWidth);
    const fontWeight = toAbsolute(x, 100, 1000); // the `fontWeight` property expects a number between 100 and 1000
    textElement.style.fontWeight = `${fontWeight}`;

    // And the font slant to the height
    const y = scale(pointerEvent.y, 0, window.innerHeight);
    const fontSlant = toAbsolute(y, 0, 10); // the `sontStyle` property expects the string "oblique Xdeg" where X is a number betwen 0 and 40
    textElement.style.fontStyle = `oblique ${fontSlant}deg`;

    window.requestAnimationFrame(loop);
}


/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {

    document.addEventListener("pointermove", function (event) {
        updateState({ pointerEvent: event });
    });

    loop();
}

setup(); // Always remember to call setup()!
