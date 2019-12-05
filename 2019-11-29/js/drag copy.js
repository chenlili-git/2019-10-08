class Drag {
    constructor(id) {
        this.disX = this.disY = 0;
        this.box = document.getElementById(id);
        this.centent_box = document.getElementById('centent_box');
    }
    init() {
        this.centent_box.addEventListener('mousedown', this.d = this.down.bind(this));

    }
    down(ev) {
        //console.log('123123123123123')
        if ($(ev.target).closest('.folder_box').length) return;

        let { left, top } = this.box.getBoundingClientRect();
        this.disX = ev.pageX;
        this.disY = ev.pageY;
        this.box.style.display = 'block';

        //按下的时候让box等于鼠标按下的位置
        this.box.style.top = this.disY + 'px';
        this.box.style.left = this.disX + 'px';


        this.centent_box.addEventListener('mousemove', this.mv = this.move.bind(this));
        document.addEventListener('mouseup', this.u = this.up.bind(this));
        ev.preventDefault();
        ev.cancelBubble = true;
    }
    move(ev) {
        this.box.style.top = Math.min(ev.pageY, this.disY) + 'px';
        this.box.style.left = Math.min(ev.pageX, this.disX) + 'px';
        let b = document.querySelectorAll('.folder_box');

        b.forEach(ele => {
            let id = ele.getAttribute('did');
            if (bong(box, ele)) {
                ele.className = 'folder_box active';
                ele.children[ele.children.length - 1].className = 'checked';
                //选中的文件夹 同时要更新所对应的数据的checked
                data[id].checked = true;
            } else {
                ele.className = 'folder_box';
                ele.children[ele.children.length - 1].className = '';
                //选中的文件夹 同时要更新所对应的数据的checked
                console.log(data,id)
                data[id].checked = false;
            }
        })
        //移动的距离 - 按下的距离 = 移动了多少距离
        this.box.style.width = Math.abs(ev.pageX - this.disX) + 'px';
        this.box.style.height = Math.abs(ev.pageY - this.disY) + 'px';




    }
    up(ev) {
        isAllChecked();
        this.box.style.height = this.box.style.width = 0;
        this.box.style.display = 'none';
        this.centent_box.removeEventListener('mousemove', this.mv);
        document.removeEventListener('mouseup', this.u);
        if (this.disX === ev.pageX && this.disY === ev.pageY) {
            console.log(11111)
        } 

    }
}
let d = new Drag('box');
d.init();
