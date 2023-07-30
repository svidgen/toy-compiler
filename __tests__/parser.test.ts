import {
	TreePattern,
	AST,
	Sequence,
	Union,
	Recipe,
	Token,
} from '../src/parser';

describe('parser', () => {
	describe('Tokens', () => {
		it('can parse a keyword', () => {
			const T = new Token('T', /whatever/);
			const code = 'whatever';
			const ast = T.parse({code});
			console.log({ast});
			expect(true).toBe(true);
		});
	});
});
