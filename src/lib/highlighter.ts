// src/lib/highlighter.ts
import { escapeSvelte } from 'mdsvex';

interface Token {
	text: string;
	type:
		| 'plain'
		| 'keyword'
		| 'string'
		| 'comment'
		| 'number'
		| 'tag'
		| 'attr'
		| 'function'
		| 'macro'
		| 'heading'
		| 'bold'
		| 'italic'
		| 'link'
		| 'directive'
		| 'decorator'
		| 'punctuation';
}

// Zero-WASM Pure JavaScript Multi-Language Tokenizer
export function tokenizeCode(code: string, language: string = 'typescript'): Token[][] {
	const lines = code.split('\n');
	const lang = language.toLowerCase();

	const isMarkdown = ['markdown', 'md', 'gfm'].includes(lang);
	const isLatex = ['latex', 'tex', 'math'].includes(lang);
	const isVue = lang === 'vue';
	const isJsx = ['tsx', 'jsx', 'react'].includes(lang);
	const isSvelte = lang === 'svelte';
	const isHtml = ['html', 'xml', 'svg'].includes(lang);
	const isPython = ['python', 'py'].includes(lang);
	const isSql = lang === 'sql';
	const isBash = ['bash', 'sh', 'zsh', 'shell'].includes(lang);

	return lines.map((line) => {
		if (!line) return [{ text: '', type: 'plain' }];

		if (isMarkdown) {
			const headingMatch = line.match(/^(#{1,6}\s+)(.*)$/);
			if (headingMatch) {
				return [
					{ text: headingMatch[1], type: 'punctuation' },
					{ text: headingMatch[2], type: 'heading' }
				];
			}
			const blockquoteMatch = line.match(/^(\s*>\s+)(.*)$/);
			if (blockquoteMatch) {
				return [
					{ text: blockquoteMatch[1], type: 'punctuation' },
					{ text: blockquoteMatch[2], type: 'italic' }
				];
			}
		}

		const tokens: Token[] = [];
		let remaining = line;

		while (remaining.length > 0) {
			if (
				(!isLatex && (remaining.startsWith('//') || remaining.startsWith('/*'))) ||
				((isMarkdown || isHtml || isSvelte || isVue) && remaining.startsWith('<!--')) ||
				((isPython || isBash || lang === 'env' || lang === 'yaml' || lang === 'yml') &&
					remaining.startsWith('#')) ||
				(isLatex && remaining.startsWith('%')) ||
				(isSql && remaining.startsWith('--'))
			) {
				tokens.push({ text: remaining, type: 'comment' });
				break;
			}

			if (isLatex) {
				const macroMatch = remaining.match(/^(\\[a-zA-Z]+|\\\[|\\\]|\\\\(|\\\\))/);
				if (macroMatch) {
					tokens.push({ text: macroMatch[0], type: 'macro' });
					remaining = remaining.slice(macroMatch[0].length);
					continue;
				}
				const mathDelimMatch = remaining.match(/^(\${1,2})/);
				if (mathDelimMatch) {
					tokens.push({ text: mathDelimMatch[0], type: 'keyword' });
					remaining = remaining.slice(mathDelimMatch[0].length);
					continue;
				}
			}

			if (isMarkdown) {
				const codeMatch = remaining.match(/^(`[^`]+`)/);
				if (codeMatch) {
					tokens.push({ text: codeMatch[0], type: 'string' });
					remaining = remaining.slice(codeMatch[0].length);
					continue;
				}
				const boldMatch = remaining.match(/^(\*\*[^*]+\*\*)/);
				if (boldMatch) {
					tokens.push({ text: boldMatch[0], type: 'bold' });
					remaining = remaining.slice(boldMatch[0].length);
					continue;
				}
				const linkMatch = remaining.match(/^(\[[^\]]+\])(\([^)]+\))/);
				if (linkMatch) {
					tokens.push({ text: linkMatch[1], type: 'link' });
					tokens.push({ text: linkMatch[2], type: 'string' });
					remaining = remaining.slice(linkMatch[0].length);
					continue;
				}
			}

			const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/);
			if (strMatch) {
				tokens.push({ text: strMatch[0], type: 'string' });
				remaining = remaining.slice(strMatch[0].length);
				continue;
			}

			if (isPython) {
				const decMatch = remaining.match(/^(@\w+)/);
				if (decMatch) {
					tokens.push({ text: decMatch[0], type: 'decorator' });
					remaining = remaining.slice(decMatch[0].length);
					continue;
				}
			}

			if (isVue || isSvelte || isHtml || isJsx) {
				const tagMatch = remaining.match(/^(<\/?[\w.:-]+|\/>|>)/);
				if (tagMatch) {
					tokens.push({ text: tagMatch[0], type: 'tag' });
					remaining = remaining.slice(tagMatch[0].length);
					continue;
				}

				if (isVue) {
					const vueDirMatch = remaining.match(/^((?:v-[\w-]+|:[\w-]+|@[\w-]+|#[\w-]+))(?=\s*=?)/);
					if (vueDirMatch) {
						tokens.push({ text: vueDirMatch[0], type: 'directive' });
						remaining = remaining.slice(vueDirMatch[0].length);
						continue;
					}
				}

				const attrMatch = remaining.match(/^([\w:.-]+)(?=\s*=\s*)/);
				if (attrMatch) {
					tokens.push({ text: attrMatch[0], type: 'attr' });
					remaining = remaining.slice(attrMatch[0].length);
					continue;
				}
			}

			const kwMatch = remaining.match(
				/^(import|export|from|default|const|let|var|function|return|async|await|class|interface|type|extends|implements|new|this|typeof|instanceof|if|else|switch|case|break|for|while|try|catch|finally|throw|as|in|of|true|false|null|undefined|fn|mut|struct|enum|impl|trait|pub|use|mod|crate|where|loop|unsafe|package|func|defer|go|chan|select|iota|def|self|yield|lambda|elif|except|with|None|True|False|pass|query|mutation|subscription|schema|scalar|fragment|directive|SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN|GROUP|ORDER|BY|LIMIT|pnpm|npm|npx|bun|yarn|git|docker)\b/i
			);
			if (kwMatch) {
				tokens.push({ text: kwMatch[0], type: 'keyword' });
				remaining = remaining.slice(kwMatch[0].length);
				continue;
			}

			const runeMatch = remaining.match(
				/^(\$(?:state|derived|effect|props|bindable|inspect|host)|use[A-Z]\w+)\b/
			);
			if (runeMatch) {
				tokens.push({ text: runeMatch[0], type: 'macro' });
				remaining = remaining.slice(runeMatch[0].length);
				continue;
			}

			const fnMatch = remaining.match(/^(\$?\w+)(?=\s*\()/);
			if (fnMatch) {
				tokens.push({ text: fnMatch[0], type: 'function' });
				remaining = remaining.slice(fnMatch[0].length);
				continue;
			}

			const numMatch = remaining.match(/^\b(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?)\b/);
			if (numMatch) {
				tokens.push({ text: numMatch[0], type: 'number' });
				remaining = remaining.slice(numMatch[0].length);
				continue;
			}

			const punctMatch = remaining.match(/^([{}()[\].,;:?!=<>+\-*%&|^~_^\\/]+)/);
			if (punctMatch) {
				tokens.push({ text: punctMatch[0], type: 'punctuation' });
				remaining = remaining.slice(punctMatch[0].length);
				continue;
			}

			const plainMatch = remaining.match(/^([\w$]+|\s+)/);
			if (plainMatch) {
				tokens.push({ text: plainMatch[0], type: 'plain' });
				remaining = remaining.slice(plainMatch[0].length);
				continue;
			}

			tokens.push({ text: remaining[0], type: 'plain' });
			remaining = remaining.slice(1);
		}

		return tokens;
	});
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

const TOKEN_COLOR_MAP: Record<string, string> = {
	keyword: 'color: #ff7b72; font-weight: 600;',
	macro: 'color: #d2a8ff; font-weight: 600;',
	string: 'color: #a5d6ff;',
	comment: 'color: #8b949e; font-style: italic;',
	tag: 'color: #7ee787; font-weight: 600;',
	attr: 'color: #79c0ff;',
	directive: 'color: #ffa657; font-weight: 500;',
	function: 'color: #d2a8ff;',
	number: 'color: #79c0ff;',
	punctuation: 'color: #c9d1d9;',
	decorator: 'color: #d2a8ff;',
	heading: 'color: #ffa657; font-weight: bold;',
	bold: 'color: #ffffff; font-weight: bold;',
	italic: 'color: #8b949e; font-style: italic;',
	link: 'color: #58a6ff; text-decoration: underline;'
};

export function renderHighlightedCode(code: string, lang?: string | null): string {
	const language = lang || 'typescript';
	const lines = tokenizeCode(code.trim(), language);

	const innerHtml = lines
		.map((line) => {
			const lineHtml = line
				.map((token) => {
					const escaped = escapeHtml(token.text);
					const style = TOKEN_COLOR_MAP[token.type];
					return style ? `<span style="${style}">${escaped}</span>` : escaped;
				})
				.join('');
			return `<span class="line">${lineHtml || ' '}</span>`;
		})
		.join('\n');

	const html = `<pre class="yaxa-code-block" data-language="${escapeHtml(language)}"><code class="language-${escapeHtml(language)}">${innerHtml}</code></pre>`;
	return `{@html \`${escapeSvelte(html)}\`}`;
}
