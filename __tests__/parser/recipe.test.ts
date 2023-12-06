import { recipe, sequence, token, union } from "../../src/parser";

describe("recipe", () => {
	const LETTER_A = token("LETTER_A", /[aA]/);
	const LETTER_B_LOWER = token("LETTER_B_LOWER", "b");
    const LETTER_B_UPPER = token("LETTER_B_UPPER", "B");
    const LETTER_B = union("LETTER_B", [LETTER_B_LOWER, LETTER_B_UPPER]);
	const LETTER_C = token("LETTER_C", /[cC]/);
	const RECIPE_ABC = recipe("RECIPE_ABC", [LETTER_A, LETTER_B, LETTER_C]);

	it("can parse a simple, static recipe", () => {
		const code = "abc";
		const ast = RECIPE_ABC.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	for (const code of ["a", "b", "c", "bac", "cab", "cba", "ab", "bc"]) {
		it(`fails on non-matching string '${code}'`, () => {
			expect(() => RECIPE_ABC.parse({ code })).toThrowErrorMatchingSnapshot()
		});
	}
});
