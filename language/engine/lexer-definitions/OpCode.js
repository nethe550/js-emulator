/**
 * @author nethe550
 * @description Defines a generic opcode.
 */

/**
 * @typedef OpCodeType
 * @property {string} LOAD "load"
 * @property {string} MOVE "mov"
 * @property {string} INCREMENT "inc"
 * @property {string} DECREMENT "dec"
 * @property {string} ADD "add"
 * @property {string} SUBTRACT "sub"
 * @property {string} GREATER_THAN "grt"
 * @property {string} LESS_THAN "lst"
 * @property {string} EQUALS "equ"
 */

/**
 * The OpCode class.
 * @constant
 * @class
 */
class OpCode {

    /**
     * Creates a new OpCode object.
     * @param {OpCodeType} type - The type of this opcode.
     */
    constructor(type) {

        /**
         * @type {OpCodeType}
         */
        this.type = type;

    }

}

export { OpCode };