class Tools {
    //获取元素到可视区顶部的和左侧的距离
    positionFn(ele) {
        let top = 0;
        let left = 0;
        while (ele) {
            top += ele.clientTop + ele.offsetTop;
            left += ele.clientLeft + ele.offsetLeft;
            ele = ele.offsetParent;
        }
        return {
            l: left,
            t: top
        }
    }
}