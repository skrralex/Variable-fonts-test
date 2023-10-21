/*
 * 03_variableFonts
 *
 * This sketch demonstrates a mapping between the slant and width of a variable font
 * and the position of the pointer. The font-related properties all expect different
 * kinds of numbers, so we need to do some data processing.
 * 
 */

let state = Object.freeze({
    pointerEvent: { y: 0 },
    clickEvent: { x: 0 },
});


const settings = Object.freeze({
    textElement: document.querySelector("#text"),
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
    const { clickEvent } = state;
    const { textElement } = settings;

    settings.textElement.setAttribute('contenteditable', 'true');

    settings.textElement.setAttribute('spellcheck', 'false');


    // Map the font weight to the width
    const x = scale(clickEvent.x, 0, window.innerWidth);
    const fontSize = toAbsolute(x, 40, 160); // the `fontSize` property expects a number between 100 and 1000
    textElement.style.fontSize = `${fontSize}px`;

    // And the font slant to the height
    const y = scale(pointerEvent.y, 0, window.innerHeight);
    const fontMorph = toAbsolute(y, 0, 60); // the `sontStyle` property expects the string "oblique Xdeg" where X is a number betwen 0 and 40
    textElement.style.fontVariationSettings = `"MORF" ${fontMorph}`;


    window.requestAnimationFrame(loop);
}


/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {

    // settings.textElement.style.display = 'flex';          //Turn textElement into a flex container
    // settings.textElement.style.justifyContent = 'center'; //Center the text horizontally
    // settings.textElement.style.alignItems = 'center';     //Center the text vertically
    // settings.textElement.style.height = '65vh';          //Set the height of the container to 100% of the viewport height

    document.addEventListener("pointermove", function (event) {
        updateState({ pointerEvent: event });
    });

     document.addEventListener("pointerdown", function (event) {
         updateState({ clickEvent: event });
     });

    
    
    


    loop();
}

setup(); // Always remember to call setup()!
