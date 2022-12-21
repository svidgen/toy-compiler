import process from 'process';
import { readFileSync } from 'fs';
import MonkeyScript from './monkeyscript-lang';

const ast = MonkeyScript.parse({
	code: readFileSync(process.argv[2], 'utf-8').trim()
});

console.dir(ast, { depth: 2 });
