
function bong(obj, obj2) {
    let { left: l, top: t, bottom: b, right: r } = obj.getBoundingClientRect();
    let { left: l2, top: t2, bottom: b2, right: r2 } = obj2.getBoundingClientRect();
    if (r < l2 || b < t2 || l > r2 || t > b2) {
        //console.log('没碰到');
        return false;
    } else {
       // console.log('碰到');
        return true;
    }
}

function getChildrenFolders(data, id) {

    if (!data[id]) return null;//如果传的id不存在  返回null
    let keyArr = Object.keys(data);
    //filter 返回新数组 map 找出data数据
    return keyArr.filter(item => data[item].pid == id).map(item => data[item]);

}

// 匹配文件夹是否重命名
function isRename(data, val) {
    let keyArr = Object.keys(data);
    if (!keyArr.length) return null;
    return keyArr.map(item => data[item].title).includes(val);
}


//删除父级 并删除子级
function deleteData(data, id) {
    let keyArr = Object.keys(data);

    keyArr.forEach(function (item, index, arr) {
        if (data[item].pid == id) {
            delete data[item];
        }
    })
    //console.log(keyArr = Object.keys(data))
}
//专门用来找一个父级的
function getParent(id) {
    //data[id].pid 是个数字   data[data[id].pid]
    if (data[id].pid === '-1') return null; //到-1就说明到顶了
    return data[data[id].pid]; //父级的数据
}

function getParents(data, id) {
    let pdata = getParent(id); //父级
    let arr = [data[id]];

    while (pdata) {
        arr.unshift(pdata);
        pdata = getParent(pdata.id);
    }
    //console.log(arr)
    return arr;
}



