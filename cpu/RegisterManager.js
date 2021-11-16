/**
 * @author nethe550
 * @description Provides a way to easily edit registers.
 */

/**
 * The RegisterManager class.
 * @class
 */
class RegisterManager {

    /**
     * Creates a new register manager.
     * @constructor
     */
    constructor() {

        this.registers = {

            // 8 bit signed registers (1 byte)
            a: 0x00,
            b: 0x00,
            c: 0x00,
            d: 0x00,
            e: 0x00,
            f: 0x00,
            g: 0x00,
            h: 0x00,

            // 8 bit unsigned registers (1 byte)
            i: 0x00,
            j: 0x00,
            k: 0x00,
            l: 0x00,

            // 32 bit float register (4 bytes)
            m: 0x00000000,

            // 64 bit long register (8 bytes)
            n: 0x0000000000000000

        };

    }

    /**
     * Reads data from the specified register.
     * @param {string} register - The register's key.
     * @returns {number} The data in the register.
     */
    read(register) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');

        if (register in this.registers) return this.registers[register];
        else throw new ReferenceError(`Register '${register}' does not exist.'`);

    }

    /**
     * Writes data to the specified register.
     * @param {string} register - The register's key.
     * @param {number} data - The data to write.
     */
    write(register, data) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof data !== 'number') throw new TypeError('\'data\' must be a number.');       

        if (register in this.registers) this.registers[register] = data;
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Increments the specified register.
     * @param {string} register - The register to increment.
     */
    increment(register) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');

        if (register in this.registers) this.registers[register] = this.registers[register] + 1;
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Decrements the specified register.
     * @param {string} register - The register to decrement.
     */
    decrement(register) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');

        if (register in this.registers) this.registers[register] = this.registers[register] - 1;

    }

    /**
     * Subtracts register B's value from register A.
     * @param {string} registerA - The register to subtract from.
     * @param {string} registerB - The register to subtract with.
     */
    subtractRegister(registerA, registerB) {

        if (typeof registerA !== 'string') throw new TypeError('\'registerA\' must be a string.');
        if (typeof registerB !== 'string') throw new TypeError('\'registerB\' must be a string.');

        if (registerA in this.registers) {

            if (registerB in this.registers) {

                this.registers[registerA] -= this.registers[registerB];

            }
            else throw new ReferenceError(`Register '${registerB}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${registerA}' does not exist.`);

    }

    /**
     * Subtracts the given value from the specified register.
     * @param {string} register - The register to subtract from.
     * @param {number} value - The value to subtract with.
     */
    subtractValue(register, value) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof value !== 'number') throw new TypeError('\'value\' must be a number.');

        if (register in this.registers) {

            this.registers[register] -= value;

        }
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Adds register B's value to register A.
     * @param {string} registerA - The register to add to.
     * @param {string} registerB - The register to add with.
     */
    addRegister(registerA, registerB) {

        if (typeof registerA !== 'string') throw new TypeError('\'registerA\' must be a string.');
        if (typeof registerB !== 'string') throw new TypeError('\'registerB\' must be a string.');

        if (registerA in this.registers) {

            if (registerB in this.registers) {

                this.registers[registerA] += this.registers[registerB];

            }
            else throw new ReferenceError(`Register '${registerB}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${registerA}' does not exist.`);

    }

    /**
     * Adds the given value to the specified register.
     * @param {string} register - The register to add to.
     * @param {number} value - The value to add with.
     */
    addValue(register, value) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof value !== 'number') throw new TypeError('\'value\' must be a number.');

        if (register in this.registers) {

            this.registers[register] += value;

        }
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Copies the value of fromRegister to toRegister.
     * @param {string} fromRegister - The register to copy from.
     * @param {string} toRegister - The register to copy to.
     */
    move(fromRegister, toRegister) {

        if (typeof fromRegister !== 'string') throw new TypeError('\'fromRegister\' must be a string.');
        if (typeof toRegister !== 'string') throw new TypeError('\'toRegister\' must be a string.');

        if (fromRegister in this.registers) {

            if (toRegister in this.registers) {

                this.registers[toRegister] = this.registers[fromRegister];

            }
            else throw new ReferenceError(`Register '${toRegister}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${fromRegister}' does not exist.`);

    }

    /**
     * Compares if register A's value is greater than register B's value.
     * @param {string} registerA - The first register.
     * @param {string} registerB - The second register.
     * @returns {boolean} If register A's value is greater than register B's value.
     */
    registerGreaterThanRegister(registerA, registerB) {

        if (typeof registerA !== 'string') throw new TypeError('\'registerA\' must be a string.');
        if (typeof registerB !== 'string') throw new TypeError('\'registerB\' must be a string.');

        if (registerA in this.registers) {

            if (registerB in this.registers) {

                return this.registers[registerA] > this.registers[registerB];

            }
            else throw new ReferenceError(`Register '${registerB}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${registerA}' does not exist.`);

    }

    /**
     * Compares if the specified register's value is greater than the given value.
     * @param {string} register - The register to compare.
     * @param {number} value - The value to compare.
     * @returns {boolean} If the register's value is greater than the given value.
     */
    registerGreaterThanValue(register, value) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof value !== 'number') throw new TypeError('\'value\' must be a number.');

        if (register in this.registers) {

            return this.registers[register] > value;

        }
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Compares if value A is greater than value B.
     * @param {number} valueA - The first value to compare.
     * @param {number} valueB - The second value to compare.
     * @returns {boolean} If value A is greater than value B.
     */
    valueGreaterThanValue(valueA, valueB) {

        if (typeof valueA !== 'number') throw new TypeError('\'valueA\' must be a number.');
        if (typeof valueB !== 'number') throw new TypeError('\'valueB\' must be a number.');

        return valueA > valueB;

    }

    /**
     * Compares if register A's value is less than register B's value.
     * @param {string} registerA - The first register.
     * @param {string} registerB - The second register.
     * @returns {boolean} If register A's value is less than register B's value.
     */
    registerLessThanRegister(registerA, registerB) {

        if (typeof registerA !== 'string') throw new TypeError('\'registerA\' must be a string.');
        if (typeof registerB !== 'string') throw new TypeError('\'registerB\' must be a string.');

        if (registerA in this.registers) {

            if (registerB in this.registers) {

                return this.registers[registerA] < this.registers[registerB];

            }
            else throw new ReferenceError(`Register '${registerB}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${registerA}' does not exist.`);

    }

    /**
     * Compares if the specified register's value is less than the given value.
     * @param {string} register - The register to compare.
     * @param {number} value - The value to compare.
     * @returns {boolean} If the register's value is less than the given value.
     */
    registerLessThanValue(register, value) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof value !== 'number') throw new TypeError('\'value\' must be a number.');

        if (register in this.registers) {

            return this.registers[register] < value;

        }
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Compares if value A is less than value B.
     * @param {number} valueA - The first value to compare.
     * @param {number} valueB - The second value to compare.
     * @returns {boolean} If value A is less than value B.
     */
    valueLessThanValue(valueA, valueB) {

        if (typeof valueA !== 'number') throw new TypeError('\'valueA\' must be a number.');
        if (typeof valueB !== 'number') throw new TypeError('\'valueB\' must be a number.');

        return valueA < valueB;

    }

    /**
     * Compares if register A's value if equal to register B's value.
     * @param {string} registerA - The first register.
     * @param {string} registerB - The second register.
     * @returns {boolean} If register A's value is equal to register B's value.
     */
    registerEqualsRegister(registerA, registerB) {

        if (typeof registerA !== 'string') throw new TypeError('\'registerA\' must be a string.');
        if (typeof registerB !== 'string') throw new TypeError('\'registerB\' must be a string.');

        if (registerA in this.registers) {

            if (registerB in this.registers) {

                return this.registers[registerA] == this.registers[registerB];

            }
            else throw new ReferenceError(`Register '${registerB}' does not exist.`);

        }
        else throw new ReferenceError(`Register '${registerA}' does not exist.`);

    }

    /**
     * Compares if the specified register's value is equal to the given value.
     * @param {string} register - The register to compare.
     * @param {number} value - The value to compare.
     * @returns {boolean} If the register's value is equal to the given value.
     */
    registerEqualsValue(register, value) {

        if (typeof register !== 'string') throw new TypeError('\'register\' must be a string.');
        if (typeof value !== 'number') throw new TypeError('\'value\' must be a number.');

        if (register in this.registers) {

            return this.registers[register] == value;

        }
        else throw new ReferenceError(`Register '${register}' does not exist.`);

    }

    /**
     * Compares if value A is equal to value B.
     * @param {number} valueA - The first value to compare.
     * @param {number} valueB - The second value to compare.
     * @returns {boolean} If value A is equal to value B.
     */
    valueEqualsValue(valueA, valueB) {

        if (typeof valueA !== 'number') throw new TypeError('\'valueA\' must be a number.');
        if (typeof valueB !== 'number') throw new TypeError('\'valueB\' must be a number.');

        return valueA == valueB;

    }

}

export { RegisterManager };