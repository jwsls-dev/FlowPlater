/**
 * Registers a Handlebars helper that creates an animated bunny ASCII art.
 * The bunny alternates between two states: normal and flipped.
 *
 * Requirements:
 * - Handlebars must be loaded globally before calling this function
 * - Runs in browser environment (uses window and document)
 *
 * The helper creates:
 * - Global window.bunnyStates object storing ASCII art variants
 * - Global window.bunnyAnimation function managing animation
 * - Global window.bunnyAnimationIntervalId for animation control
 *
 * Usage in Handlebars template:
 * {{bunny}}
 *
 * @returns {void}
 */
export declare function bunnyHelper(): void;
