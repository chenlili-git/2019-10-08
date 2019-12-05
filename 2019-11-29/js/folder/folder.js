const $cententBox = $('#centent_box');

const $creatBtn = $('#creat_btn');//新建按钮
const $deleBtn = $('#dele_btn');//删除按钮
const $renameBtn = $('#rename_btn');//重命名
const $cheackAll = $('#cheack_all');//全选按钮
const $noData = $('#nodata');//文件夹下没有东西的时候展示
let returnVal = false; //拖拽时的默认行为开关
let onOff = false;
let list = null;//每次render的时候都把最新的当前需要显示的数据更新

const $fBox = $('#folderBox');
const $kuang = $('.free_box');



let globalPid = null;//记录当前内容区的pid
function render(num = 0) {
    $cententBox.html('');
    globalPid = num;//记录当前内容区的pid

    let rdData = getChildrenFolders(data, num);
    list = rdData;
    console.log(list);
    if (list.length) {
        isAllChecked();
        $fBox.show();
        $cheackAll.show();
        $noData.hide();
    } else {
        $fBox.hide();
        $cheackAll.hide();
        $noData.show();
    }

    $.each(rdData, function (key, val) {
        const { checked, id, title } = val;
        let $folder = $(`<div class="folder_box ${checked ? 'active' : ''}" did="${id}">
        <img src="./img/folder-b.png" alt="">
        <input type="text"  value="${title}">
        <p>${title}</p>
        <i class="${checked ? 'checked' : ''}"></i>
    </div>`)

        $folder.find('input').hide();
        $("#centent_box").append($folder);
        $folder.find('p').show();

        let $img = $folder.find('img');
        let $i = $folder.find('i');

        //点击选中
        $i.click(function (ev) {
            data[id].checked = !data[id].checked;
            render(num);
            isAllChecked();
            // ev.cancelBubble = true;
            ev.preventDefault = true;
        });

        //双击进入文件夹
        $folder.dblclick(function (ev) {
            //清除选中的 
            rdData.forEach(item => item.checked = false);
            //清除全选
            clearCheckAllClass();
            let arr = getChildrenFolders(data, id);

            //渲染数据
            render(id);
            //联动面包屑
            breadcrumb(id);
            //联动左侧的tree
            treePosition(id);


            ev.preventDefault();
        })
    });
}
render(0);//渲染第一层 id=0


//新建文件夹

$creatBtn.click(function (ev) {
    returnVal = true;
    //没有文件的情况下 先清理下
    $fBox.show();
    $cheackAll.show();
    $noData.hide();
    //click事件里去检测这个变量是否发生改变，如果没改变，说明mouseup刚执行完，这里不执
    let $folder = $(`<li class="folder_box">
            <img src="./img/folder-b.png" alt="">
            <input type="text" value="新建文件夹">
            <p>新建文件夹</p>
        </li>`)
    $cententBox.append($folder);
    let $txt = $folder.find('input');
    $txt.select(); //选中聚焦
    $txt.blur(function () {
        let val = $txt.val();

        if (!val) { val = '新建文件夹' }

        let bool = isRename(data, val);
        if (bool && val != '新建文件夹') {
            $masked_box.show().find('p').eq(0).html('相同文件或目录已存在！');
        }
        let newVal = '';
        let num = 1;
        newVal = val;
        while (bool) {
            let s = val.replace(/\(\d\)$/, '') + '(' + (num++) + ')';
            bool = isRename(data, s);
            newVal = s;
        }
        let id = +new Date;
        data[id] = {
            "id": id,
            "pid": globalPid,
            "title": newVal,
            "type": "file",
            "checked": false
        }
        returnVal = false;
        //清除全选
        clearCheckAllClass();
        render(globalPid);
        //联动左侧的tree
        treePosition(globalPid);
    })

    ev.preventDefault();
    //ev.cancelBubble = true;
})

// 删除文件夹
$deleBtn.click(function (ev) {

    //先判断有没有选中的
    let keysArr = Object.keys(data);
    let checkedArr = keysArr.filter(item => data[item].checked === true);
    if (!checkedArr.length) {
        $masked_box.show().find('p').eq(0).html('请选择至少一个要删除的文件！！！');
    };
    $.each(checkedArr, function (i, item) {
        deleteData(data, item);//删除子级（孩子）
        delete data[item];//删除本身

    })
    render(globalPid);
    if (!getChildrenFolders(data, globalPid).length) {
        clearCheckAllClass();
    }
    //联动左侧的tree
    treePosition(globalPid);

    ev.preventDefault();
})

//重命名

$renameBtn.click(function (ev) {
    returnVal = true;// drag中mouseup时不阻止默认行为
    //先判断有没有选中的
    let keysArr = Object.keys(data);
    let checkedArr = keysArr.filter(item => data[item].checked === true);
    if (!checkedArr.length || checkedArr.length > 1) {
        $masked_box.show().find('p').eq(0).html('请选择一个文件！！！');
        return null;
    }
    let $list = $cententBox.find('.active');
    let $pVal = $list.find('p').text();
    let $input = $list.find('input');
    let $id = $list.attr('did');
    $list.find('p').hide();
    $input.show().select();

    $input.blur(function () {

        let val = $(this).val();
        if (!val) {
            $masked_box.show().find('p').eq(0).html('名称不能为空！');
            val = $pVal;
            $input.val($pVal);
            $input.select();
        } else if (val === $pVal) {
            $input.hide();
            $list.find('p').show();
        } else {
            let bool = keysArr.some(function (currentValue, index, arr) {
                return data[currentValue].title === val;
            });
            if (bool) {
                $masked_box.show().find('p').eq(0).html('相同文件或目录已存在！');
                val = $pVal;
                $input.val($pVal);
                $input.hide();
                $list.find('p').show();
            }
        }

        data[$id].title = val;
        data[$id].checked = false;
        render(globalPid);
        //当修改成功之后就要阻止模型行为。
        returnVal = false;
        ev.preventDefault();
    })
})

//全选
$cheackAll.click(function (ev) {
    //console.log(list.length,onOff)
    if (!list.length) return null;

    checkedAll($(this), list)
    ev.preventDefault();

})

//如果全选就勾上全选中，否则取消全选中。
function isAllChecked() {
    if (list.every(item => item.checked)) {
        addCheckAllClass();
    } else {
        clearCheckAllClass();
    }
}
function checkedAll($this, arr) {
    if (!onOff) {
        // console.log('1111'+onOff)
        arr.map(item => data[item.id].checked = true);
    } else {
        console.log('2' + onOff)
        arr.map(item => data[item.id].checked = false);
    }
    onOff = !onOff;
    render(globalPid);

}

// 清除全选的样式
function clearCheckAllClass() {
    $cheackAll.removeClass().find('i').removeClass('icon-yigouxuan').addClass('iconfont icon-weigouxuan');
    onOff = false;
}
// 添加全选的样式
function addCheckAllClass() {
    onOff = true;
    $cheackAll.addClass('checked_all').find('i').removeClass('icon-weigouxuan').addClass('iconfont icon-yigouxuan');
}