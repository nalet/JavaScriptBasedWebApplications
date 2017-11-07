// - @@@: delimits characters
// - @@:  delimits value and lines
// - @:   delimits single lines
//
// => [char]@@[line1]@[line2]@[line3]@[line4]@@@[char]@@[line1]@[line2]@[line3]@[line4]@@@...
//
var alphabetString = ' @@  @  @  @  @@@A@@____ @|__| @|  | @     @@@B@@___  @|__] @|__] @     @@@C@@____ @|    @|___ @     @@@D@@___  @|  \\ @|__/ @     @@@E@@____ @|___ @|___ @     @@@F@@____ @|___ @|    @     @@@G@@____ @| __ @|__] @     @@@H@@_  _ @|__| @|  | @     @@@I@@_ @| @| @  @@@J@@ _ @ | @_| @   @@@K@@_  _ @|_/  @| \\_ @     @@@L@@_    @|    @|___ @     @@@M@@_  _ @|\\/| @|  | @     @@@N@@_  _ @|\\ | @| \\| @     @@@O@@____ @|  | @|__| @     @@@P@@___  @|__] @|    @     @@@Q@@____ @|  | @|_\\| @     @@@R@@____ @|__/ @|  \\ @     @@@S@@____ @[__  @___] @     @@@T@@___ @ |  @ |  @    @@@U@@_  _ @|  | @|__| @     @@@V@@_  _ @|  | @ \\/  @     @@@W@@_ _ _ @| | | @|_|_| @      @@@X@@_  _ @ \\/  @_/\\_ @     @@@Y@@_   _ @ \\_/  @  |   @      @@@Z@@___  @  /  @ /__ @     @@@';

var FontLoader = _require("font");

//for _require
var font = FontLoader.loadMultiLineFont("CyberFont", alphabetString);

exports.write = font.write;
exports.render = font.render;
Object.keys(font).forEach(function(key) { 
    exports[key] = font[key];
});