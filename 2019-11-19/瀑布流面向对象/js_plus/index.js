class Demo {
    constructor() {
        this.box = document.querySelector('.body');

        this.head = document.querySelector('.head');
        this.picw = 236; //图片的宽度
        this.ml = 10; //margin-left
        this.boxt = 66;
        this.clientW = document.documentElement.clientWidth;//可视区的宽度

        this.len = Math.floor(this.clientW / (this.picw + this.ml));

        //计算ul的宽度
        this.box.style.width = (this.len * (this.picw + this.ml)) - this.ml + 'px';
        // console.log(len)

        this.aryx = [];//求x
        this.aryy = [];//求y

        for (let i = 0; i < this.len; i++) {
            this.aryx[i] = i * (this.picw + this.ml);
            this.aryy[i] = 0;
        }
        this.render();

        //滚轮的时候判断触底
        this.iH = window.innerHeight; //可视区的高度

    }
    render() {
        console.log('1111');
        fetch('./data.json')
            .then(d => d.json())
            .then(ary => {
                ary.forEach((item, i) => {

                    let { index } = this.minIndex(this.aryy);//找出数组中top最小的
                    let li = document.createElement('li');
                    //设置li的left，top
                    li.style.cssText = `top:${this.aryy[index]}px;left:${this.aryx[index]}px`;

                    let div = document.createElement('div');
                    div.className = 'img_box';
                    let img = document.createElement('img');
                    img.src = item.pic;


                    let p1 = document.createElement('p');
                    let p2 = document.createElement('p');
                    p1.className = 'desc';
                    p1.innerText = item.desc;
                    p2.className = 'author';
                    p2.innerText = item.author;
                    div.append(img);
                    div.append(p1);
                    div.append(p2);
                    li.append(div);
                    this.box.append(li);
                    setTimeout(() => {
                        img.style.opacity = 1;
                    }, 200);

                    //每次添加完一个li之后，把当前li的高度 + 间距 赋值到当前数组对应项中，以便于下次比较
                    this.aryy[index] += (this.boxt + item.height * 1 + 20);
                    // [100,0,0,0]
                });
            });
    }

    minIndex(ary) {
        let min = Math.min(...ary);
        let index = ary.findIndex(item => item === min);
        return {
            index,
            min
        }
    }
    debounce(cb, time) {
        let timer;
       // console.log('====='+this)
        let obj =this;
        return function (...arg) {//...arg
            //当事件触发的时候就先关闭上次的timer
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                // console.log(obj)
                cb.call(obj, ...arg);
            }, time);
        }
    }

    throttling(cb, time) {
        let prevtime = 0,
            timer;
        let obj =this;
        return function (...arg) {
            let nowTime = +new Date;
            // console.log(nowTime - prevtime)
            if (nowTime - prevtime > time) {
                cb.call(obj, ...arg);
            } else {
                clearInterval(timer);
                timer = setTimeout(() => {
                    // console.log(+new Date - prevtime);
                    if (+new Date - prevtime > time) {
                        cb.call(obj, ...arg);
                    }
                }, time);
            }
            prevtime = nowTime;
        }
    }
    fn() {
        //判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
        // if(box.scrollHeight < iH)return;

        let { index } =  this.minIndex(this.aryy);  //最短的距离
        let scroll = window.pageYOffset; //滚动条的距离

        // console.log(iH + scroll);
        // console.log(aryy[index])

        if (this.iH + scroll >= this.aryy[index]) {
            console.log('触底了');
            this.render();
        }

    }
    //当浏览器缩放的时候重新计算一下，可视区能放多少张图片
    resize() {
        // console.log(1);
        this.clientW = document.documentElement.clientWidth;//可视区的宽度
        this.len = Math.floor(this.clientW / (this.picw + this.ml));
        this.box.style.width = (this.len * (this.picw + this.ml)) - this.ml + 'px';
        this.aryx = [];
        this.aryy = [];
        this.iH = window.innerHeight;
        for (let i = 0; i < this.len; i++) {
            aryx[i] = i * (this.picw + this.ml);
            aryy[i] = 0;
        }
        //获取所有的li，然后给重新安排位置
        this.lis = box.querySelectorAll('li');
        this.lis.forEach((ele, i) => {
            let { index } = minIndex(aryy);
            ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
            aryy[index] += (ele.scrollHeight + 10);
        });

    }

}

let p = new Demo();
window.onscroll =function(){
    //p.fn();
   // p.debounce(p.fn, 200)();
    p.throttling(p.fn, 200)()
} ;

window.onresize = p.resize;