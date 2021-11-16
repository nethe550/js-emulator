/**
 * @author nethe550
 * @description The CPU implementation.
 */

import { Arguments } from '../language/engine/lexer-definitions/ArgumentTypes.js';
import { RegisterManager } from './RegisterManager.js';

/**
 * The CPU class.
 * @class
 */
class CPU {

    /**
     * Creates a new CPU instance.
     * @constructor
     * @param {boolean} debug - Whether or not to output debug information.
     */
    constructor(debug=false) {

        this.registerManager = new RegisterManager();

        this.flags = {
            GT: false,
            LT: false,
            EQ: false
        }

        this.debug = debug;

    }

    /** 
     * Loads data into the specified register.
     * @param {string} register - The register to load into.
     * @param {number} data - The data to write into the register.
     */
    load(register, data) {

        this.registerManager.write(register, data);

        if (this.debug) return {
            message: `Wrote '${data}' to register '${register}'.`,
            type: 'info'
        };

    }

    /**
     * Increments the data within the specified register.
     * @param {string} register - The register to increment.
     */
    increment(register) {

        this.registerManager.increment(register);

        if (this.debug) return {
            message: `Incremented register '${register}'.`,
            type: 'info'
        };

    }

    /**
     * Decrements the data within the specified register.
     * @param {string} register - The register to decrement.
     */
    decrement(register) {

        this.registerManager.decrement(register);

        if (this.debug) return {
            message: `Decremented register '${register}'.`,
            type: 'info'
        };

    }

    /**
     * Subtracts the given register or value from the specified register.
     * @param {string} registerA - The register to subtract from.
     * @param {string|number} T - The register or number to subtract with.
     */
    subtract(registerA, T) {

        if (typeof T == 'string') this.registerManager.subtractRegister(registerA, T);
        else this.registerManager.subtractValue(registerA, T);

        if (this.debug) return {
            message: `Subtracted '${T}' from register '${registerA}'.`,
            type: 'info'
        };

    }

    /**
     * Adds the given register of value to the specified register.
     * @param {string} registerA - The register to add to.
     * @param {string|number} T - The register or number to add with.
     */
    add(registerA, T) {

        if (typeof T == 'string') this.registerManager.addRegister(registerA, T);
        else this.registerManager.addValue(registerA, T);

        if (this.debug) return {
            message: `Added '${T}' to register '${registerA}'.`,
            type: 'info'
        };

    }

    /**
     * Copies the value from a register to another register.
     * @param {string} fromRegister - The register to copy from.
     * @param {string} toRegister - The register to copy to.
     */
    move(fromRegister, toRegister) {

        this.registerManager.move(fromRegister, toRegister);

        if (this.debug) return {
            message: `Moved '${fromRegister}' to register '${toRegister}'.`,
            type: 'info'
        };

    }

    /**
     * Compares if T is greater than V, and stores it in the GT flag.
     * @param {string|number} T - The first register or value to compare.
     * @param {string|number} V - The second register or value to compare.
     */
    greaterThan(T, V) {

        if (typeof T == 'string') {

            if (typeof V == 'string') this.flags.GT = this.registerManager.registerGreaterThanRegister(T, V);
            else this.flags.GT = this.registerManager.registerGreaterThanValue(T, V);

        }
        else if (typeof V == 'string') this.flags.GT = this.registerManager.registerGreaterThanValue(V, T);
        else this.flags.GT = this.registerManager.valueGreaterThanValue(T, V);

        if (this.debug) return {
            message: `'${T}' is ${this.flags.GT ? 'greater' : 'less' } than '${V}'.`,
            type: 'info'
        };

    }

    /**
     * Compares if T is less than V, and stores it in the LT flag.
     * @param {string|number} T - The first register or value to compare.
     * @param {string|number} V - The second register or value to compare.
     */
    lessThan(T, V) {

        if (typeof T == 'string') {

            if (typeof V == 'string') this.flags.LT = this.registerManager.registerLessThanRegister(T, V);
            else this.flags.LT = this.registerManager.registerLessThanValue(T, V);

        }
        else if (typeof V == 'string') this.flags.LT = this.registerManager.registerLessThanValue(V, T);
        else this.flags.LT = this.registerManager.valueLessThanValue(T, V);

        if (this.debug) return {
            message: `'${T}' is ${this.flags.LT ? 'less' : 'greater' } than '${V}'.`,
            type: 'info'
        };

    }

    /**
     * Compares if T is equal to V, and stores it in the EQ flag.
     * @param {string|number} T - The first register or value to compare.
     * @param {string|number} V - The second register or value to compare.
     */
    equals(T, V) {

        if (typeof T == 'string') {

            if (typeof V == 'string') this.flags.EQ = this.registerManager.registerEqualsRegister(T, V);
            else this.flags.EQ = this.registerManager.registerEqualsValue(T, V);

        }
        else if (typeof V == 'string') this.flags.EQ = this.registerManager.registerEqualsValue(V, T);
        else this.flags.EQ = this.registerManager.valueEqualsValue(T, V);

        if (this.debug) return {
            message: `'${T}' is ${this.flags.EQ ? '' : 'not' } equal to '${V}'.`,
            type: 'info'
        };

    }

    /**
     * Output a value to the console.
     * @param {string} T - The value to output.
     * @param {string} type - The type of value to output.
     * @returns {string} The respective output value. 
     */
    out(T, type=null) {

        if (type) {

            if (type == Arguments.REGISTER) {

                if (this.registerManager.registers.hasOwnProperty(T)) return this.registerManager.read(T);
                else return {
                    message: `Unknown register '${T}'.`,
                    type: 'error'
                }

            }
            
            if (type == Arguments.FLAG) {

                if (this.flags.hasOwnProperty(T)) return this.flags[T].toString();
                else return {
                    message: `Unknown flag '${T}'.`,
                    type: 'error'
                }

            }

            if (type == Arguments.STRING || type == Arguments.VALUE) return T;
            else return {
                message: `Invalid string '${T}'.`,
                type: 'error'
            }

        }

    }

}

export { CPU };