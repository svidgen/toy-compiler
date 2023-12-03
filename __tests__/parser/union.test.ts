import {
	token,
	union
} from '../../src/parser';

describe('parser', () => {
	describe('Union', () => {
		describe('of non-optional string tokens', () => {
			const A = token('TOKEN_A', 'a');
			const B = token('TOKEN_B', 'b');
			const U = union('A_OR_B', [A, B]);

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
			const A = token('TOKEN_A', 'a');
			const B = token('TOKEN_B', 'b');
			const U = union('A_OR_B', [A, B], true);

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
			const A = token('TOKEN_A', /a/);
			const B = token('TOKEN_B', /b/);
			const U = union('A_OR_B', [A, B]);

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
			const A = token('TOKEN_A', /a/);
			const B = token('TOKEN_B', /b/);
			const U = union('A_OR_B', [A, B], true);

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
