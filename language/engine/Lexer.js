/**
 * @author nethe550
 * @description The custom assembly lexer.
 */

import { OpCodes } from './lexer-definitions/OpCodeTypes.js';
import { OpCode } from './lexer-definitions/OpCode.js';
import { Arguments } from './lexer-definitions/ArgumentTypes.js';
import { Argument } from './lexer-definitions/Argument.js';
import { ConsoleOutput } from '../output/ConsoleOutput.js';

/**
 * The Lexer class.
 * @class
 */
class Lexer {

    /**
     * Lexes a raw string of custom assembly code.
     * @constructor
     * @param {ConsoleOutput} consoleOutput - The output buffer to output to. 
     * @param {string} rawCode - The raw string of assembly code to be lexed.
     */
    constructor(consoleOutput, rawCode) {

        /**
         * @type {ConsoleOutput}
         */
        this.consoleOutput = consoleOutput;

        /**
         * @type {string}
         */
        this.raw = rawCode;

        /**
         * @type {[]}
         */
        this.tokens = [];

        this.tokenize();

    }

    /**
     * Tokenizes the raw string of assembly code into parsable tokens.
     */
    tokenize() {

        if (this.raw.length <= 0) return this.consoleOutput.error(`No code to parse.`);

        const commands = this.raw.split('\n');

        for (let _command of commands) {

            // ignore whitespaces
            if (_command.length <= 0 || _command.match(/^ *$/)) continue;

            // ignore comments
            if (_command.charAt(0) == ';') continue;

            // remove backspace chars
            const command = _command.replace('\b', '');

            const commandTokens = [];

            // first 3 chars are the opcode
            const opcode = this.createOpcode(command.substring(0, 3));
    
            commandTokens.push(opcode);
    
            // parse arguments
            // split args by 0 or more leading spaces: \s*
            // split args by either a comma or space: (,|\s)
            // split args by 0 or more trailing spaces: \s*
            const args = command.substring(3, command.length).split(/\s*,\s*/);

            for (let i = 0; i < args.length; i++) {

                // remove comments from command
                if (args[i].indexOf(';') != -1) args[i] = args[i].trim().slice(0, args[i].indexOf(';') - 1).trim();

                const arg = this.createArgument(args[i].trim());

                if (arg) commandTokens.push(arg);
    
            }

            this.tokens.push(commandTokens);

        }

    }

    /**
     * Creates an OpCode class.
     * @param {string} opcode - The syntactically correct opcode string.
     * @returns {OpCode|void} The created opcode, or if invalid opcode, nothing.
     */
    createOpcode(opcode) {

        for (let [name, value] of Object.entries(OpCodes)) {

            if (opcode == value) return new OpCode(OpCodes[name]);

        }

        this.consoleOutput.error(`Unknown opcode '${opcode}'.`);

    }

    /**
     * Creates an Argument class.
     * @param {string} argument - The full argument, including its prefix.
     * @returns {Argument|void} - The created argument, or if invalid argument, nothing.
     */
    createArgument(argument) {

        if (argument.length <= 0) return;

        // check prefix of argument
        if (argument.charAt(0) == Arguments.REGISTER) return new Argument(argument.substring(1, argument.length), Arguments.REGISTER);
        else if (argument.charAt(0) == Arguments.VALUE) return new Argument(argument.substring(1, argument.length), Arguments.VALUE);
        else if (argument.charAt(0) == Arguments.STRING) return new Argument(argument.substring(1, argument.length - 1), Arguments.STRING);
        else if (argument.charAt(0) == Arguments.FLAG) return new Argument(argument.substring(1, argument.length), Arguments.FLAG);
        else {
            this.consoleOutput.error(`Invalid argument '${argument}'.`);
            return;
        }

    }

}

export { Lexer };