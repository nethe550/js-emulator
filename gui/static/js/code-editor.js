const EDITOR = document.getElementById('code-editor');

const DEFAULT_CODE = [
    'lod $a, !3 ; set $a to 3',
    'mov $a, $b ; set $b to $a',
    'add $a, $b ; add $b to $a',
    'equ $a, $b ; EQ flag set true',
    'out $a     ; output $a',
    'out $b     ; output $b',
    'out "test" ; output "test"',
    'out !test  ; output "test"',
    'out !2     ; output 2'
].join('\n');

EDITOR.innerHTML = DEFAULT_CODE;

// Make Tab indent line
// https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
EDITOR.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = EDITOR.selectionStart;
        var end = EDITOR.selectionEnd;

        // set textarea value to: text before caret + TAB_SIZE spaces + text after caret
        EDITOR.value = EDITOR.value.substring(0, start) + "\t" + EDITOR.value.substring(end);
    
        // put caret at right position again
        EDITOR.selectionStart = EDITOR.selectionEnd = start + 1; // add 1 to account for new tab
    }
});