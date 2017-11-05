var alphabetString =
    "a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
    "m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
    "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";

function charToMorseCode(char) {
    var split1 = alphabetString.split(";");
    for(var i = 0; i < split1.length; i++) {
        if(split1[i][0] == char) {
            return (split1[i].substr(2, split1[i].length - 1));
        }
    }
    return "";
}

function convertToMorse(text) {
    var input = text.toLowerCase();
    var output = "";
    for(var i = 0; i < input.length; i++) {
        output += charToMorseCode(input[i]) + " ";
    }
    return output;
}

var text = "Dies ist ein Test";

console.log("Input: " + text);
console.log("Input in morse: " + convertToMorse(text))