import { sequence, token, union } from "../../src/parser";

describe("sequence", () => {
	// not normally how we'd model letters and words, but for the purpose
	// of testing the base case.
	const LETTER = token("LETTER", /[a-zA-Z]/);
	const WORD = sequence("WORD", LETTER);
	const SPACE = token("SPACE", " ");
	const SENTENCE = sequence("SENTENCE", WORD, SPACE);

	it("can describe a sequence without separators", () => {
		const code = "something";
		const ast = WORD.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	it("can describe sequences with separators", () => {
		const code = "I ran around at the zoo";
		const ast = SENTENCE.parse({ code });
		console.log({ ast });

		// AST is wrong ...
		expect(true).toBe(false);
		// expect(ast).toMatchSnapshot();
	});
});
