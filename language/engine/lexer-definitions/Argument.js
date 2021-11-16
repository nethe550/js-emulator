/**
 * @author nethe550
 * @description Defines a generic opcode argument.
 */

/**
 * @typedef ArgumentType
 * @property {string} REGISTER "$"
 * @property {string} VALUE "!"
 */

/**
 * The Argument class.
 * @class
 */
class Argument {

    /**
     * Creates a new Argument object.
     * @param {string|number} value - The argument value; either register identifier or a literal value.
     * @param {ArgumentType} type - The type of argument; either register or literal value.
     */
    constructor(value, type) {

        /**
         * @type {string|number}
         */
        this.value = value;

        /**
         * @type {ArgumentType}
         */
        this.type = type;

    }

}

export { Argument };