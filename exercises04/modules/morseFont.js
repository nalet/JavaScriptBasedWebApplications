var alphabetString =
"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
"y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

var FontLoader = _require("font");

var font = FontLoader.loadSingleLineFont("MorseFont", alphabetString);

exports.write = font.write;
exports.render = font.render;
Object.keys(font).forEach(function(key) { 
    exports[key] = font[key];
});