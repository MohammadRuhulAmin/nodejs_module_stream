const promise = new Promise((resolve,reject)=>{
    if(1===1)resolve('solved')
    reject('something went wrong')
})

promise.then((result)=>{
    console.log('promise resolved: ',result)
})
/** rejection capture */
.catch((error)=>{
    console.error('promise rejected: ',error)
})
.finally(()=>{
    console.log('program ended')
    process.exit(0)
})