var alphabetString =
    "a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
    "m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
    "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

/**
 * @constructor
 * @param {string} value Morse Char
 * @param {string} string Morse Code
 */
function Char(value, string) {
    this.value = value;
    this.string = string;
}

/**
 * @constructor
 * @param {string} name Fontname
 * @param {Char} chars Morse Chars
 */
function Font(name, chars) {
    this.name = name;
    this.chars = chars;
}

/**
 * Renders the passed text.
 * @returns {string} rendered text
 */
Font.prototype.render = function (text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < chars.length; j++) {
            if (text[i] == chars[j].value) {
                output += chars[j].string;
            }
        }
    }
    return output;
}
/**
 * Renders the passed text using render(text) and ‘writes’ the
 * returned string to the passed to function.
 * @param {string} text Text to translate
 * @param {function(output: string)} to function to write to
 */
Font.prototype.write = function (text, to) {
    to(this.render(text));
}

/**
 * @type {Char|Array}
 */
var chars = new Array();

var splitAlphabet = alphabetString.split(";");
for (var i = 0; i < splitAlphabet.length; i++) {
    chars.push(new Char(splitAlphabet[i][0], splitAlphabet[i].substr(2, splitAlphabet[i].length - 1)));
}


var myFont = new Font("myFont", chars);
myFont.write("Please write this Text in morse", console.log);


/**
 * Renders characters as morse code
 * @param {string} name Fontname
 * @param {Char} chars Morse Chars
 */
function MorseFont(name, chars) {
    Font.call(this, name, chars);
}

MorseFont.prototype = Object.create(Font.prototype);
MorseFont.prototype.constructor = MorseFont;
MorseFont.prototype.render = function (text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < chars.length; j++) {
            if (text[i] == chars[j].value) {
                output += chars[j].string + "/";
            }
        }
    }
    return output;
}

var myMorseFont = new MorseFont("myMorseFont", chars);
myMorseFont.write("Please write this Text in morse", console.log);

console.log(myFont instanceof Font);
console.log(myMorseFont instanceof Font);