import { recipe, sequence, token, union } from "../../src/parser";

describe("recipe", () => {
	const LETTER_A = token("LETTER_A", /[aA]/);
	const LETTER_B = token("LETTER_B", /[bB]/);
	const LETTER_C = token("LETTER_C", /[cC]/);
	const RECIPE_ABC = recipe("RECIPE_ABC", [LETTER_A, LETTER_B, LETTER_C]);

	it("can parse a simple, static recipe", () => {
		const code = "abc";
		const ast = RECIPE_ABC.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	/**
	 * TODO: I think these are wrong ... they shouldn't match. They should throw
	 * exceptions telling me what tokens are expected.
	 *
	 * Maybe we fix this more broadly by changing the way we handle optional tokens.
	 *
	 * Instead of trying to handle optionality at every language structure, we create
	 * an `optional()` wrapper that swallows errors when they're thrown. This doesn't
	 * seem super efficient though.
	 *
	 * Alternatively, perhaps recipes need to inspect the optionality of their
	 * children when nulls come back from child parses. TBD.
	 */
	for (const code of ["a", "b", "c", "bac", "cab", "cba", "ab", "bc"]) {
		it(`fails on non-matching string '${code}'`, () => {
			const ast = RECIPE_ABC.parse({ code });
			console.log({ code, ast });
		});
	}
});
