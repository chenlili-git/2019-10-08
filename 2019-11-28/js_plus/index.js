class Tools {
    getMinBox(ary) {
        if (!Array.isArray(ary)) {
            ary = [...ary].map((item) => {
                return item.scrollHeight;
            })
        }
        let min = Math.min(...ary);
        let i = ary.findIndex(item => item == min);

        console.log(ary, min, i)
        return {
            min,
            i
        };
    }
    //节流
    throttling(cd, time) {
        let prevtime = 0;
        return function (...arg) {
            let nowTime = +new Date;
            if (nowTime - prevtime > time) {
                cd.call(this, ...arg);
            }
            prevtime = nowTime;
        }
    }
    //防抖debounce
    debounce(cd, time) {
        let timer;
        return function (...arg) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                cd.call(this, ...arg)
            }, time)
        }
    }
}




class Waterfall extends Tools {
    constructor() {
        super();

        this.box = document.getElementById('water_box')
        this.lis = this.box.querySelectorAll('li');
        this.load = document.getElementById('loading');
        this.ht = window.innerHeight;
        this.boxT = this.box.offsetTop;
        this.loading = document.getElementById('loading');
        this.onoff = true;
    }
    getData(url, cd) {
        fetch(url).then(d => d.json()).then((d) => {
            cd.call(this, d)
        })
    }
    init(url) {
        this.onLd();
        this.changLoad();
        setTimeout(() => {
            this.getData(url, this.render);
        }, 1000)

    }
    changLoad() {
        this.loading.style.display = this.onoff ? 'block' : 'none';
    }
    onLd() {
        this.onoff = true;
    }
    onLdOff() {
        this.onoff = false;
    }
    render(d) {
        this.onLdOff();
        this.changLoad();
        d.forEach((item, index) => {
            let { min, i } = this.getMinBox(this.lis);
            let div = document.createElement('div');
            div.className = 'img_box';
            div.innerHTML = `
                    <img src="${item.pic}" alt="" style="height:${item.height}px;">
                    <p class="desc">${item.desc}</p>
                    <p class="author">${item.author}</p>
            `
            this.lis[i].append(div);
            setTimeout(function () {
                div.children[0].style.opacity = 1;
            }, index * 100)
        });
    }
    scroll() {
        let fn = () => {
            let { i } = this.getMinBox(this.lis);
            if ((window.pageYOffset + this.ht > this.lis[i].scrollHeight + this.boxT)) {
                this.init('./data.json');
            }
        }
        console.log(this)
        let that = this;
        window.onscroll = this.throttling(fn, 50)
        window.onresize=function(){
            this.ht=window.innerHeight;
        }
        //this.debounce(fn, 200)
        // function () {
        //     let { i } = that.getMinBox(that.lis);
        //     if ((window.pageYOffset + that.ht > that.lis[i].scrollHeight + that.boxT)) {
        //         that.init('./data.json');
        //     }
        // };
    }

}
let p = new Waterfall();
p.init('./data.json');
p.scroll();