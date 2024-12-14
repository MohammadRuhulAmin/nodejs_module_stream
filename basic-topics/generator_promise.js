
/** Example-1 */
async function* asyncGenerator(){
    yield new Promise(resolve=> setTimeout(()=> resolve(1),1000));
    yield new Promise(resolve=> setTimeout(()=>resolve(2),2000));
    yield new Promise(resolve => setTimeout(()=>resolve(3),3000))
}
for await(const value of asyncGenerator()){
    console.log(value)
}

/** Example-2  */
function* myLoop(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

/** better to use async key */
(async()=>{
    for await (const value of myLoop()){
        console.log(value)
    }
})()



