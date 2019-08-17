const checkIsValidBrackets = (brackets) => {
    if(brackets === '') return false 
    return !brackets.split('').reduce((toPreviusChar, thisChar) => {
        if (thisChar === '(' || thisChar === '{' || thisChar === '[') {
            return ++toPreviusChar;
        } else if (thisChar === ')' || thisChar === '}' || thisChar === ']') {
            return --toPreviusChar;
        }

        return toPreviusChar
    }, 0);
}

const tests = () => {
    const tests = ['[]{}()', "()", "{}", "[({})]", "{{}}}", "({)})", "([[()]]", ""];
    const expecteds = [true, true, true, true, false, false, false, false];
    for (let index = 0; index < 8; index++) {
        const test = tests[index];
        const expected = expecteds[index]
        if (checkIsValidBrackets(test) !== expected) console.error(Error(`Case ${test} expected to return: ${expected} but return another value`))
        else console.log(`✓ test ${test ? test : '""'}`)
    }
}

tests();
