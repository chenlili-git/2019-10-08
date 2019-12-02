class Tree {
    constructor() {
        this.ul = document.getElementById('oUl');
        this.li=this.ul.getElementsByTagName('li');
    }
    getData(url, cd) {
        let that = this;
        fetch(url).then(d => d.json())
            .then(data => {
                cd.call(that, data)
            })
    }
    render() {
        this.getData('./data/data.json', function (data) {
            this.ul.innerHTML = this.creatTree(data);
            [...this.li].forEach((item, i) => {
                item.onmouseup = function (ev) {                
                    if (ev.target.tagName === 'DIV' || ev.target.tagName === 'SPAN') {
                        if (this.children[0].className === 'add') {
                            this.children[0].className = 'line';
                            this.children[2].style.display = 'block';
                        } else if (this.children[0].className === 'line') {
                            let ul = this.querySelectorAll('ul');

                            for (let index = 0; index < ul.length; index++) {
                                const element = ul[index];
                                if (element.style.display) {
                                    element.style.display = 'none';
                                }
                                element.parentNode.children[0].className = 'add';
                            }
                        }
                    }
                    ev.cancelBubble = true;
                    ev.preventDefault();
                }
            })
        })
    }
    creatTree(data) {
        let li = '';
        data.forEach((item, i) => {

            if ('child' in item) {
                if (i === 0) {
                    li += `<li>
                    <span class="add"></span>
                    <div class="active">${item.title}</div>
                    <ul>`
                    li += this.creatTree(item.child)

                    li += `</ul>
                </li>`
                } else {
                    li += `<li>
                    <span class="add"></span>
                    <div >${item.title}</div>
                    <ul>`
                    li += this.creatTree(item.child)

                    li += `</ul>
                </li>`
                }
            } else {
                li += `
                <li>
                    <span class=""></span>
                    <div>${item.title}</div>
                </li>
                `
            }

        });

        return li;
    }
}
var p = new Tree();
p.render();