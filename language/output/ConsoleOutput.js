/**
 * @author nethe550
 * @description Controls console output.
 */

/**
 * The ConsoleOutput class.
 * @class
 */
class ConsoleOutput {

    /**
     * Creates a new ConsoleOutput instance.
     * @param {string} selector - The CSS selector for the console element.
     */
    constructor(selector) {

        /**
         * @type {HTMLElement}
         */
        this.element = document.querySelector(selector);

        if (!this.element) throw new Error(`Failed to find element '${selector}'. Make sure you included the CSS selector (e.g. #)`);

        /**
         * @type {[]}
         */
        this.buffer = [];

    }

    /**
     * Adds a log to the buffer.
     * @param {*} message - The message to log.
     */
    log(message) {

        this.buffer.push({
            message: message.toString(),
            type: 'log'
        });

    }

    /**
     * Adds an info to the buffer.
     * @param {*} message - The message to info.
     */
    info(message) {

        this.buffer.push({
            message: message.toString(),
            type: 'info'
        });

    }

    /**
     * Adds a warn to the buffer.
     * @param {*} message - The message to warn.
     */
    warn(message) {

        this.buffer.push({
            message: message.toString(),
            type: 'warn'
        });

    }

    /**
     * Adds an error to the buffer.
     * @param {*} message - The message to error.
     */
    error(message) {

        this.buffer.push({
            message: message.toString(),
            type: 'error'
        });

    }

    /**
     * Output all content of the buffer to the console.
     */
    dumpBuffer() {

        for (let msg of this.buffer) {

            if (msg.message) {
                
                this.createHTML(msg.message, msg.type);
                
            }

        }

        this.clearBuffer();

    }

    /**
     * Clears the buffer.
     */
    clearBuffer() {

        this.buffer = [];

    }

    /**
     * Clears the console element.
     */
    clearConsole() {
        this.element.innerHTML = '';
    }

    /**
     * Clears the buffer and the console element.
     */
    clear() {

        this.clearBuffer();

        this.clearConsole();

    }

    /**
     * Creates a new console display element and appends it to the console.
     * @param {string} message - The message.
     * @param {string} type - The type of message. (log, info, warn, error)
     */
    createHTML(message, type) {

        const root = document.createElement('div');

        root.classList.add('console-item');

        switch (type) {

            case 'log':
                root.classList.add('console-log');
                break;

            case 'info':
                root.classList.add('console-info');
                break;

            case 'warn':
                root.classList.add('console-warn');
                break;

            case 'error':
                root.classList.add('console-error');
                break;

        }

        const context = document.createElement('span');
        context.classList.add('output-context');
        context.innerText = '> ';

        const output = document.createElement('span');
        output.classList.add('console-output');
        output.innerText = message;

        root.appendChild(context);
        root.appendChild(output);
        this.element.appendChild(root);

    }

}

export { ConsoleOutput };