# JS Emulator
A computer emulator implemented in JavaScript.

Can be programmed with a modified version of assembly code; includes an integrated code editor.

## Language
The programming language is very similar to assembly, with some modifications.

### Data Types:
These are the prefixes of the data types:
- `$`: register
- `!`: generic value (number, string)
- `"`: string
- `%`: flag

### Opcodes:
Opcodes and their usages:
- `lod $register, !value`: load a value into the specified register
- `mov $registerA, $registerB`: copy register A's value to register B
- `equ ($|!)valueA, ($|!)valueB`: set EQ flag if value A == value B
- `out ($|!|%|"")value`: output value to console
- `add $registerA ($|!)value`: add value or register value to register A
- `sub $registerA ($|!)value`: subtract value or register value to register A
- `inc $register`: increments the specified register
- `dec $register`: decrements the specified register
- `grt ($|!)valueA, ($|!)valueB`: set GT flag if value A > value B
- `lst ($|!)valueA, ($|!)valueB`: set LT flag if value A < value B

### Registers:
- `a` through `h`: Signed 8 bit integer
- `i` through `l`: Unsigned 8 bit integer
- `m`: Signed 32 bit float
- `n`: Signed 64 bit long int

### Example:
```
lod $a, !3 ; set $a to 3
mov $a, $b ; set $b to $a
add $a, $b ; add $b to $a
equ $a, $b ; EQ flag set true
out $a     ; output $a
out $b     ; output $b
out "test" ; output "test"
out !test  ; output "test"
out !2     ; output 2
out %EQ    ; output EQ flag
```
The program above will do the following:
- Set A register to equal `3`
- Copy A register's value to B register
- Adds B register's value to A register
- Sets the `EQ` flag whether or not A register equals B register (will set EQ flag to `true`)
- Outputs A register's value
- Outputs B register's value
- Outputs the string "`test`"
- Outputs the string "`test`"
- Outputs the value `2`
- Outputs the value of the `EQ` flag (`true`)

## License
This is licensed under the MIT License.
```
Copyright © 2021 nethe550

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```