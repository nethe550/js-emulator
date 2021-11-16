/**
 * @author nethe550
 * @description An enumeration of argument types.
 */

/**
 * @typedef ArgumentType
 * @property {string} REGISTER '$'
 * @property {string} VALUE '!'
 * @property {string} STRING '"'
 * @property {string} FLAG '%'
 */

/**
 * The ArgumentTypes enumeration.
 * @constant
 * @enum {ArgumentType}
 */
const Arguments = {

    // Type of argument = syntactically correct prefix of argument type

    REGISTER : '$',
    VALUE    : '!',
    STRING   : '"',
    FLAG     : '%'

}

export { Arguments };