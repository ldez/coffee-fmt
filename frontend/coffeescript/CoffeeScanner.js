/**
 * CoffeeScanner.js
 * 
 * The CoffeeScript scanner.
 */

var Scanner = require('../Scanner').Scanner
, Token = require('../Token').Token
, EofToken = require('../EofToken').EofToken
, EolToken = require('../EolToken').EolToken
, WhitespaceToken = require('../WhitespaceToken').WhitespaceToken
, EOF = require('../Constants').get("EOF")
, EOL = require('../Constants').get("EOL")
, _ = require('lodash')
, extractToken
;

extractToken = function () {
	var token
	, currentChar
	;

	currentChar = this.currentChar();
	if (currentChar === EOF) {
		token = new EofToken(this.source);
	} else if (currentChar === EOL) {
		token = new EolToken(this.source);
	} else if (/[^\S\n]/.test(currentChar)) {
		token = new WhitespaceToken(this.source);
	} else {
		token = new Token(this.source);
	}

	return token;
};

/**
 * Constructor.
 * @param source the source to be used with this scanner.
 */
exports.CoffeeScanner = function (source) {
	return _.extend(Scanner(source), {
		extractToken: extractToken
	});
};
