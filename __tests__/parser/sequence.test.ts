import { sequence, token } from "../../src/parser";

describe("sequence", () => {
	// not normally how we'd model letters and words, but for the purpose
	// of testing the base case.
	const LETTER = token("LETTER", /[a-zA-Z]/);
	const WORD = sequence("WORD", LETTER);
	const SPACE = token("SPACE", " ");
	const SENTENCE = sequence("SENTENCE", WORD, SPACE);

	it("can parse a sequence without separators until EOS", () => {
		const code = "something";
		const ast = WORD.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	it("can parse a sequence without separators until end of sequence prior to EOS", () => {
		const code = "something with extra words";
		const ast = WORD.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	it("can parse a sequence with separators until EOS", () => {
		const code = "Sort of a sentence";
		const ast = SENTENCE.parse({ code });
		expect(ast).toMatchSnapshot();
	});

	it("can parse a sequence with separators until end of sequence prior to EOS", () => {
		const code = "Sort of a sentence. And then another one.";
		const ast = SENTENCE.parse({ code });
		expect(ast).toMatchSnapshot();
	});
});
