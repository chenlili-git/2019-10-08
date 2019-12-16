```
  const promise = new Promise((resolve, reject) => {
        console.log(1)    
        resolve()
        console.log(2)
    })
    promise.then(() => {
        console.log(3)
    })
    console.log(4)

```

```

 const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
    const promise2 = promise1.then(() => {
        throw new Error('error!!!')
    })
 
    console.log('promise1', promise1);//pending
    console.log('promise2', promise2);//pending
    
    setTimeout(() => {
        console.log('promise1', promise1);//resolved
        console.log('promise2', promise2);//reject
    }, 2000);


```

```





```