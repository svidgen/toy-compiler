import { token, union, sequence, recipe } from '../../src/parser';

describe('basic math use-case example', () => {

    // Do not mistake this for a correct or good way to actually model math.
    // It's just an example.

    const OPTIONAL_WHITESPACE = token('WHITESPACE', /\s+/, true);
    const NUMBER = token('NUMBER', /\d+(\.\d+)?/);
    const ADDITION = token('ADDITION', '+');
    const SUBTRACTION = token('SUBTRACTION', '-');
    const MULTIPLICATION = token('MULTIPLICATION', '*');
    const DIVISION = token('DIVISION', '/');
    const OPERATOR = union('OPERATION', [ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION]);
    const LEFT_PAREN = token('LEFT_PAREN', '(');
    const RIGHT_PAREN = token('RIGHT_PAREN', ')');
    const SUB_EXPRESSION = recipe('SUB_EXPRESSION', [
        LEFT_PAREN,
        OPTIONAL_WHITESPACE,
        'EXPRESSION',
        OPTIONAL_WHITESPACE,
        RIGHT_PAREN
    ])
    const TERM_MEMBER = union('TERM', [NUMBER, SUB_EXPRESSION])
    const TERM = recipe('TERM', [OPTIONAL_WHITESPACE, TERM_MEMBER, OPTIONAL_WHITESPACE])
    const EXPRESSION = sequence('EXPRESSION', TERM, OPERATOR);

    const expressions = [
        '1 + 2',
        '2 * 3',
        '2 * 1 + 3',
        '123 - (12 + 123) * 456',
        '(123 + 456) * (678 - 987)',
        '1+2',
        '2*3',
        '2*1+3',
        '123-(12+123)*456',
        '(123+456)*(678-987)',
    ] as const;

    for (const code of expressions) {
        it(`can parse ${code}`, () => {
            const ast = EXPRESSION.parse({code});
            expect(ast).toMatchSnapshot();
        })
    }
})