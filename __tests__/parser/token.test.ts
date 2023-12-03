import {
	token,
	Token
} from '../../src/parser';

describe('parser', () => {
	describe('Tokens', () => {

		it('can parse a keyword using string', () => {
			const T = token('T', 'whatever');
			const code = 'whatever';
			const ast = T.parse({code});
			expect(ast).toMatchSnapshot();
		});

		it('can parse a keyword using regex', () => {
			const T = token('T', /whatever/);
			const code = 'whatever';
			const ast = T.parse({code});
			expect(ast).toMatchSnapshot();
		});

		it('returns `null` on a non-match using string', () => {
			const T = token('T', 'whatever');
			const code = 'not whatever';
			const ast = T.parse({code});
			expect(ast).toEqual(null);
		});

		it('returns `null` on a non-match using regex', () => {
			const T = token('T', /whatever/);
			const code = 'not whatever';
			const ast = T.parse({code});
			expect(ast).toEqual(null);
		});

	});
});
