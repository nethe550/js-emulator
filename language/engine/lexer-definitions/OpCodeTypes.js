/**
 * @author nethe550
 * @description An enumeration of Opcodes.
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
 * @property {string} OUT "out"
 */

/**
 * The OpCodes enumeration.
 * @constant
 * @enum {OpCodeType}
 */
const OpCodes = {

    // Opcode = syntactically correct opcode

    // Actions
    LOAD         : 'lod',
    MOVE         : 'mov',
    INCREMENT    : 'inc',
    DECREMENT    : 'dec',    
    ADD          : 'add',
    SUBTRACT     : 'sub',

    // Comparisons
    GREATER_THAN : 'grt',
    LESS_THAN    : 'lst',
    EQUALS       : 'equ',

    // I/O
    OUT          : 'out'

}

export { OpCodes };