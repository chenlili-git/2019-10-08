### 上传 

```javascript
FormData 
    能够把files[n]变成二进制的数据
    它的实例上有一个办法，append(key,value)

    有个几个段就写几个append
    fd.append('image',file.files[0])
    'image=dadsfsfssf'
    fd.append('user',this.value);
    'user=lilei'

    'image=dssfafsfsd&user=lilei'

    const xhr=new XMLHttpRequest;
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                console.log(xhr.responseText)
            }
        }
    }
    xhr.open('post','/upload');
    let fd=new FormData();
        xhr.upload.onprogress=function(ev){
            let scale=ev.loaded/ev.total;
            box.style.width=scale*100+'%';

        }
        fd.append('image',file.files[0]);
        xhr.send(fd);

```

