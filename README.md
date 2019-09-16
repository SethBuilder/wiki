#Introduction
This program is a Node.js REPL program that when opened, allows user to read Wikipedia articles on the command line, one paragraph at a time.

#Installation
Run this command to set up the program:
`mkdir wiki-reader && cd wiki-reader && git clone https://github.com/SethBuilder/wiki.git && cd wiki && npm install && npm link`
This command opens the repl:
`wiki-reader <language>`

Example:
`wiki-reader English`

Supported languages: English, French, Spanish and Arabic (case sensitive)

After repl is opened, these commands are available:
`HELP`
`QUIT`
`READ <Article title>`

Example:
`READ Yosemite National Park`

#Limitations
1. Optional tasks of assignment are not done.
2. When there're no more paragraphs, the program shows `undefined` when scrolling down.
3. No tests
4. Locales are hardcoded and case-sensitive.