

function _require(name) {
    if (name in require.cache) {
        return require.cache[name];
    }
    var code = new Function("exports, module", readFile(name));
    var exports = {};
    var module = { exports: exports };
    code(exports, module);

    require.cache[name] = module.exports;
    return module.exports;
}

require.cache = Object.create(null);

// Example of a readFile for the browser
// -> Note that the file must be loaded synchronously
// Haha, quick and dirty
function readFile(name) {
    try {
        var req = new XMLHttpRequest();
        req.open("GET", "exercises04/modules/" + name + ".js", false);
        req.send(null);
        return req.responseText;
    } catch (err) {}

    try {
        var fs = require("fs");
        var content = fs.readFileSync("exercises04/modules/" + name + ".js");
        return content;
    } catch (err) {}

    return null;
}

global._require = _require;

/////////////////////////////////////////////////////////////////
// MAIN CODE                                                   //
/////////////////////////////////////////////////////////////////

var cyberFont = _require("cyberFont");
var dollarFont = _require("dollarFont");
var isoFont = _require("isoFont");
var morseFont = _require("morseFont");
var slimFont = _require("slimFont");

var outputText = "This is JS";
console.log("Output of string `" + outputText + "` in different fonts.");

cyberFont.write(outputText.toLocaleUpperCase(), console.log);
dollarFont.write(outputText, console.log);
isoFont.write(outputText.toLocaleUpperCase(), console.log);
morseFont.write(outputText.toLocaleLowerCase(), console.log);
slimFont.write(outputText, console.log);