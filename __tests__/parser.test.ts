import {
	/* TreePattern,
	AST, */
	Sequence,
	Union,
	Recipe,
	Token,
} from '../src/parser';

describe('parser', () => {

	describe('Tokens', () => {

		it('can parse a keyword using string', () => {
			const T = new Token('T', 'whatever');
			const code = 'whatever';
			const ast = T.parse({code});
			expect(ast).toMatchSnapshot();
		});

		it('can parse a keyword using regex', () => {
			const T = new Token('T', /whatever/);
			const code = 'whatever';
			const ast = T.parse({code});
			expect(ast).toMatchSnapshot();
		});

		it('returns `null` on a non-match using string', () => {
			const T = new Token('T', 'whatever');
			const code = 'not whatever';
			const ast = T.parse({code});
			expect(ast).toEqual(null);
		});

		it('returns `null` on a non-match using regex', () => {
			const T = new Token('T', /whatever/);
			const code = 'not whatever';
			const ast = T.parse({code});
			expect(ast).toEqual(null);
		});

	});

	describe('Union', () => {

		describe('of non-optional string tokens', () => {
			const A = new Token('TOKEN_A', 'a');
			const B = new Token('TOKEN_B', 'b');
			const U = new Union('A_OR_B', [A, B]);

			it('can parse the first token', () => {
				const code = 'a';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('can parse the second token', () => {
				const code = 'b';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('fails if neither token is found', () => {
				const code = 'c';
				expect(() => U.parse({code})).toThrowErrorMatchingSnapshot();
			})
		});

		describe('of optional string tokens', () => {
			const A = new Token('TOKEN_A', 'a');
			const B = new Token('TOKEN_B', 'b');
			const U = new Union('A_OR_B', [A, B], true);

			it('can parse the first token', () => {
				const code = 'a';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('can parse the second token', () => {
				const code = 'b';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('returns `null` if neither token is found', () => {
				const code = 'c';
				const ast = U.parse({code});
				expect(ast).toEqual(null);
			})
		});

		describe('of non-optional regex tokens', () => {
			const A = new Token('TOKEN_A', /a/);
			const B = new Token('TOKEN_B', /b/);
			const U = new Union('A_OR_B', [A, B]);

			it('can parse the first token', () => {
				const code = 'a';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('can parse the second token', () => {
				const code = 'b';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('fails if neither token is found', () => {
				const code = 'c';
				expect(() => U.parse({code})).toThrowErrorMatchingSnapshot();
			});
		});

		describe('of optional regex tokens', () => {
			const A = new Token('TOKEN_A', /a/);
			const B = new Token('TOKEN_B', /b/);
			const U = new Union('A_OR_B', [A, B], true);

			it('can parse the first token', () => {
				const code = 'a';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('can parse the second token', () => {
				const code = 'b';
				const ast = U.parse({code});
				expect(ast).toMatchSnapshot();
			});

			it('returns `null` if neither token is found', () => {
				const code = 'c';
				const ast = U.parse({code});
				expect(ast).toEqual(null);
			});
		});

	});

});
