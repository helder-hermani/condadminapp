export function myCrypt(charChain){
    var code="";
    for (var i=0;i<=charChain.length-1;i++){
        code = code + doCrypt(charChain[i]) + "/*?";
    }

    return code.substring(0,code.length-3);
}

export function myDecrypt(charChain){
    const blockChains = charChain.split("/*?");

    var decode = "";
    for (var i=0;i<=blockChains.length-1;i++){
        decode = decode + doMyDecrypt(blockChains[i]);
    }

    return decode;
}


function doCrypt(char){
    var ascii =  char.charCodeAt();
    // const randomIndex = Math.floor(Math.random() * (4-3))+3;
    const randomIndex=2;

    ascii = ascii+randomIndex;

    const alpha = String.fromCharCode(ascii);
    const beta = maskRandomIndex(randomIndex);

    return `${alpha}.${beta}`;
   
}

function doMyDecrypt(charChain){
    
    if (charChain.trim()=="" || charChain=="" || charChain.length==0 || typeof(charChain) !== "string"){
        debugger;
        return "";
    }else{
        const blockChains = charChain.split(".");
        const randomIndex = parseInt(demaskRandomIndex(blockChains[1]));

        const ascii = parseInt(blockChains[0].charCodeAt()-randomIndex);

        return String.fromCharCode(ascii);
    }
}

function maskRandomIndex(randomIndex){
    switch (randomIndex){
        case 0:
            return "$#";
        case 1:
            return "&@";
        case 2:
            return "!&";
        case 3:
            return "$@";
        case 4:
            return "&#";
        // case 5:
        //     return "%#";
        // case 6:
        //     return "$%";
        // case 7:
        //     return "@!";
        // case 8:
        //     return "$@";
        // case 9:
        //     return "&%";
        default:
            return "";
    }

}
function demaskRandomIndex(randomIndex){
    switch (randomIndex){
        case "$#":
            return 0;
        case "&@":
            return 1;
        case "!&":
            return 2;
        case "$@":
            return 3;
        case "&#":
            return 4;
        // case "%#":
        //     return 5;
        // case "$%":
        //     return 6;
        // case "@!":
        //     return 7;
        // case "$@":
        //     return 8;
        // case "&%":
        //     return 9;
        default:
            return "";
    }
}