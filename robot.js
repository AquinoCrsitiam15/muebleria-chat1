let traits = require("./dict/traits");

module.exports = async (rWit, indexChat) => {
    let robotRes = "Disculpe no le entendi.";
    let resJson = {};
    let localTraits = await traits();
    for(var i=0; rWit["traits"].length>i; i++) {
        let nameTrait = rWit["traits"][i];
        if ( localTraits[nameTrait] ) {
            let single = localTraits[nameTrait];
            for(let u=0; rWit["wit"]["traits"][nameTrait].length>u; u++) {
                resJson = localTraits[nameTrait]
                    [rWit["wit"]["traits"][nameTrait][u]["value"]];
            }
        }
    }

    if (resJson && Object.keys(resJson).length !== 0 ) {
        if ( false ) {
            console.log('aqui es');
            robotRes = resJson["any"];
        } else {
            robotRes = resJson["any"];
            if ( typeof robotRes === "string" ) {
                console.log('String');
                robotRes = resJson["any"];
            } else if ( typeof robotRes === "function" ) {
                console.log('funcionaqui');
                robotRes = resJson["any"]();
                //robotRes = resJson["any"]();
            }
        }
    }

    return robotRes;
};