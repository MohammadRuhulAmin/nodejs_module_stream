/** async iterator return promises */
function* printMsg(){
    yield console.log("Good");
    yield console.log("better");
    yield console.log("best");
}

const genx = printMsg()
genx.next()
genx.next()
genx.next()

function printx(){
    for(let i = 0;i<10;i++){
        console.log(i,":=>x")
    }
}

function printy(){
    for(let i = 0;i<10;i++){
        console.log(i,"<=:y")
    }
}
function printz(){
    for(let i = 0;i<10;i++){
        console.log(i,"<=:=>z")
    }
}
function* printLoop(){
    yield printx();
    yield printy();
    yield printz();
}

const geny = printLoop()
geny.next();
geny.next();
geny.next();

/**
 * Dont use this 
 * printLoop().next(); // Creates a new generator and runs printx
printLoop().next(); // Creates another new generator and runs printx again
printLoop().next(); // Creates yet another generator and runs printx again
 */