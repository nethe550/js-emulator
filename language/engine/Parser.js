/**
 * @author nethe550
 * @description The custom assembly parser.
 */

import { CPU } from '../../cpu/CPU.js';
import { OpCodes } from './lexer-definitions/OpCodeTypes.js';
import { ConsoleOutput } from '../output/ConsoleOutput.js';

/**
 * The Parser class.
 * @class
 */
class Parser {

    /**
     * Parses lexed tokens into a program.
     * @constructor
     * @param {CPU} cpu - The CPU to execute the parsed code on.
     * @param {ConsoleOutput} consoleOutput - The output buffer to output to.
     * @param {[[]]} lexerTokens - An array of arrays of lexed tokens.
     */
    constructor(cpu, consoleOutput, lexerTokens) {

        /**
         * The CPU to run the parsed code on.
         * @type {CPU}
         */
        this.cpu = cpu;

        /**
         * The output buffer that this parser will output to.
         * @type {ConsoleOutput}
         */
        this.consoleOutput = consoleOutput;

        /**
         * The array of arrays of lexed tokens.
         * @type {[Int8]}
         */
        this.tokens = lexerTokens;

        /**
         * An array of functions to be executed in order.
         * @type {[]}
         */
        this.program = [];

        this.parse();

    }

    /**
     * Parses the lexed tokens into a list of functions to be executed.
     */
    parse() {

        for (let command of this.tokens) {
            
            let opcode = command[0];
            let args = command.slice(1, command.length);
            
            if (!opcode || !args || args.length <= 0) continue;

            switch (opcode.type) {

                case OpCodes.LOAD:
                    this.program.push(() => {
                        return this.cpu.load(args[0].value, parseInt(args[1].value));
                    });
                    break;
    
                case OpCodes.MOVE:
                    this.program.push(() => {
                        return this.cpu.move(args[0].value, args[1].value);
                    });
                    break;
    
                case OpCodes.INCREMENT:
                    this.program.push(() => {
                        return this.cpu.increment(args[0].value);
                    });
                    break;
    
                case OpCodes.DECREMENT:
                    this.program.push(() => {
                        return this.cpu.decrement(args[0].value);
                    });
                    break;
    
                case OpCodes.ADD:
                    if (typeof args[1].value == 'string') {
                        this.program.push(() => {
                            return this.cpu.add(args[0].value, args[1].value);
                        });
                    }
                    else {
                        this.program.push(() => {
                            return this.cpu.add(args[0].value, parseInt(args[1].value));
                        });
                    }
                    break;
    
                case OpCodes.SUBTRACT:
                    if (typeof args[1].value == 'string') {
                        this.program.push(() => {
                            return this.cpu.subtract(args[0].value, args[1].value);
                        });
                    }
                    else {
                        this.program.push(() => {
                            return this.cpu.subtract(args[0].value, parseInt(args[1].value));
                        });
                    }
                    break;
    
                case OpCodes.GREATER_THAN:
                    if (typeof args[0].value == 'string') {
                        if (typeof args[1].value == 'string') {
                            this.program.push(() => {
                                return this.cpu.greaterThan(args[0].value, args[1].value);
                            });
                        }
                        else {
                            this.program.push(() => {
                                return this.cpu.greaterThan(args[0].value, parseInt(args[1].value));
                            });
                        }
                    }
                    else if (typeof args[1].value == 'string') {
                        this.program.push(() => {
                            return this.cpu.greaterThan(parseInt(args[0].value), args[1].value);
                        });
                    }
                    else {
                        this.program.push(() => {
                            return this.cpu.greaterThan(parseInt(args[0].value), parseInt(args[1].value));
                        });
                    }
                    break;
    
                case OpCodes.LESS_THAN:
                    if (typeof args[0].value == 'string') {
                        if (typeof args[1].value == 'string') {
                            this.program.push(() => {
                                return this.cpu.lessThan(args[0].value, args[1].value);
                            });
                        }
                        else {
                            this.program.push(() => {
                                return this.cpu.lessThan(args[0].value, parseInt(args[1].value));
                            });
                        }
                    }
                    else if (typeof args[1].value == 'string') {
                        this.program.push(() => {
                            return this.cpu.lessThan(parseInt(args[0].value), args[1].value);
                        });
                    }
                    else {
                        this.program.push(() => {
                            return this.cpu.lessThan(parseInt(args[0].value), parseInt(args[1].value));
                        });
                    }
                    break;
    
                case OpCodes.EQUALS:
                    if (typeof args[0].value == 'string') {
                        if (typeof args[1].value == 'string') {
                            this.program.push(() => {
                                return this.cpu.equals(args[0].value, args[1].value);
                            });
                        }
                        else {
                            this.program.push(() => {
                                return this.cpu.equals(args[0].value, parseInt(args[1].value));
                            });
                        }
                    }
                    else if (typeof args[1].value == 'string') {
                        this.program.push(() => {
                            return this.cpu.equals(parseInt(args[0].value), args[1].value);
                        });
                    }
                    else {
                        this.program.push(() => {
                            return this.cpu.equals(parseInt(args[0].value), parseInt(args[1].value));
                        });
                    }
                    break;

                case OpCodes.OUT:
                    this.program.push(() => {
                        return this.cpu.out(args[0].value, args[0].type);
                    });
                    break;

            }

        }

    }

    /**
     * Runs the parsed program.
     */
    run() {

        for (let execute of this.program) {

            const output = execute();

            if (!output) continue;

            if (output.type && output.message) {

                switch (output.type) {
    
                    case 'log':
                        this.consoleOutput.log(output.message);
                        break;
    
                    case 'info':
                        this.consoleOutput.info(output.message);
                        break;
    
                    case 'warn':
                        this.consoleOutput.warn(output.message);
                        break;
    
                    case 'error':
                        this.consoleOutput.error(output.message);
                        break;
    
                    default:
                        this.consoleOutput.log(output.message);
                        break;
    
                }

            }
            else this.consoleOutput.log(output);


        }

    }

}

export { Parser };