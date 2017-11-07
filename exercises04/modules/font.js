/**
 * 
 * @param {string} value 
 */
function Char(value) {
    this.value = value;
}
/**
 * @returns {string}
 */
Char.prototype.getValue = function () {
    return this.value;
}
/**
 * 
 * @param {string} value 
 * @param {string} string 
 */
function SingleLineChar(value, string) {
    Char.call(this, value);
    this.string = string;
}

SingleLineChar.prototype = Object.create(Char.prototype);
SingleLineChar.prototype.constructor = Char;
/**
 * @returns {string}
 */
SingleLineChar.prototype.getString = function () {
    return this.string;
}

function MultiLineChar(value, lines) {
    Char.call(this, value);
    this.lines = lines;
}

MultiLineChar.prototype = Object.create(Char.prototype);
MultiLineChar.prototype.constructor = Char;
/**
 * @param {number} index
 */
MultiLineChar.prototype.getLine = function (index) {
    return this.lines[index];
}

/**
 * 
 * @param {string} name 
 * @param {Array<Char>} chars 
 * @param {number} lineHeight 
 */
function Font(name, chars, lineHeight = 1) {
    this.name = name;
    this.chars = chars;
    this.lineHeight = lineHeight;
}

/**
 * Is Abstract
 * @returns {string} rendered text
 */
Font.prototype.render = function (text) {
    return "";
}

/**
 * Renders the passed text using render(text) and ‘writes’ the
 * returned string to the passed to function.
 * @param {string} text Text to translate
 * @param {function(output: string)} to function to write to
 */
Font.prototype.write = function (text, to) {
    var renderedOutput = this.render(text);

    if (renderedOutput instanceof Array) {
        for (var i = 0; i < renderedOutput.length; i++) {
            to(renderedOutput[i]);
        }
    }

    if (typeof renderedOutput == "string") {
        to(renderedOutput);
    }
}

/**
 * @param {string} name 
 * @param {Array<Char>} chars 
 * @param {number} lineHeight 
 */
function SingleLineFont(name, chars, lineHeight = 1) {
    Font.call(this, name, chars, lineHeight);
}

SingleLineFont.prototype = Object.create(Font.prototype);
SingleLineFont.prototype.constructor = Font;
/**
 * @param {string} text
 */
SingleLineFont.prototype.render = function (text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < this.chars.length; j++) {
            if (text[i] == this.chars[j].getValue()) {
                output += this.chars[j].getString() + " ";
            }
        }
    }

    return output;
}
/**
 * 
 * @param {string} name 
 * @param {Array<Char>} chars 
 * @param {number} lineHeight 
 */
function MultiLineFont(name, chars, lineHeight = 1) {
    Font.call(this, name, chars, lineHeight);
}

MultiLineFont.prototype = Object.create(Font.prototype);
MultiLineFont.prototype.constructor = Font;
/**
 * @param {string} text
 */
MultiLineFont.prototype.render = function (text) {
    var output = new Array();
    var outputChars = new Array();
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < this.chars.length; j++) {
            if (text[i] == this.chars[j].getValue()) {
                outputChars.push(this.chars[j]);
            }
        }
    }

    for(var i = 0; i < this.lineHeight; i++) {
        var line = "";
        for (var j = 0; j < outputChars.length; j++) {
            line += outputChars[j].getLine(i);
        }
        output.push(line);
    }

    return output;
}

function FontLoader() {

}
/**
 * @param {string} name
 * @param {string} alphabet
 */
FontLoader.loadSingleLineFont = function (name, alphabet) {
    var chars = new Array();
    var split = alphabet.split(";");

    for (var i = 0; i < split.length; i++) {
        var splitChar = split[i].split("=");
        chars.push(new SingleLineChar(splitChar[0], splitChar[1]));
    }


    return new SingleLineFont(name, chars);
}
/**
 * @param {string} name
 * @param {string} alphabet
 */
FontLoader.loadMultiLineFont = function (name, alphabet) {
    var charsArray = new Array();

    var charsString = alphabet.split('@@@');
    for(var i = 0; i < charsString.length; i++){
        if(charsString[i] == "") continue;
        var charValueAndString = charsString[i].split('@@');
        var charLines = charValueAndString[1].split('@');
        charsArray.push([charValueAndString[0], charLines]);
    }

    return FontLoader.loadMultiLineFontAsArray(name, charsArray);
}
/**
 * @param {string} name
 * @param {Array} alphabetAsArray
 */
FontLoader.loadMultiLineFontAsArray = function (name, alphabetAsArray) {
    var chars = new Array();
    var maxHeight = 1;
    for (var i = 0; i < alphabetAsArray.length; i++) {
        chars.push(new MultiLineChar(alphabetAsArray[i][0], alphabetAsArray[i][1]));
        if(alphabetAsArray[i][1].length > maxHeight) {
            maxHeight = alphabetAsArray[i][1].length
        }
    }

    return new MultiLineFont(name, chars, maxHeight);
}

Object.keys(FontLoader).forEach(function(key) { 
    exports[key] = FontLoader[key];
});