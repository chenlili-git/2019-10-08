let $moveto_box = $('#moveto_box');
let $moveto_tree = $('#moveto_oul');
let $moveto_btn = $('#moveto_btn');

let $moveto_close = $('#moveto_box .moveto_close');

$moveto_close.click(function () {
    //确定按钮
    if ($(this).hasClass('active')) {

        if (okcode === 'error') {
            alert('非法操作');
            return;
        }
        let pid = $moveto_tree.find('div.active').eq(0).parent('li').attr('did');
        
        let treeid=null;
        let arr = list.filter(item => {
            return item.checked === true;
        }).map(item => {
            treeid=item.pid;
            data[item.id].pid = pid * 1;
            data[item.id].checked=false;
        });

        //console.log(data)
        //console.log(globalPid+'========1========='+treeid)
        render(globalPid);
       //联动左侧的tree
        //treePositionMove(globalPid);
        treePosition(globalPid);
       
    }
    $moveto_tree.children("li").find('ul').remove();
    $(this).parents('section').css('display', 'none');


})


// 更新tree
// function treePositionMove(id) {
//     let $li = $('#' + id);
//     let sArr = getChildrenFolders(data, id);
//     $tree.find('.active').removeClass('active');
    
//     if (id === 0) {
//         //当pid是微云时
//         $li.append(creatTree(id, false));

//     } else {
//         console.log($li.find('ul'))
//         if ($li.find('ul').length) {
//             $li.find('ul').remove();
//             console.log('23423423423432432')
//         }
        
//         $li.append(creatTree(id, true));
//     }

//     $li.find('div').eq(0).addClass('active');
    
//     if (!getChildrenFolders(data, id).length) {
//         $li.find('span img').eq(0).attr("src", '');
//     } else {
//         $li.find('span img').eq(0).attr("src", '././img/folder-open.png');
//     }


// }



$moveto_btn.click(function () {
    if (list.some(item => item.checked)) {
        $moveto_box.show();
        $moveto_tree.children("li")[0].append(movetoTree(0, true))
    } else {
        $masked_box.show().find('p').eq(0).html('请选择至少一个要移动的文件！！！');
    }
})
let okcode = -1;
function movetoTree(num, onoff, $that) {
    if (!onoff) {
        $moveto_tree.children("li").find('ul').remove();
    }

    let list = getChildrenFolders(data, num);

    if (!list.length) return;
    let $ul = $('<ul></ul>');
    $ul.css({
        display: 'block'
    });

    list.forEach(item => {
        let parr = getParents(data, item.id);//获取当前的父级
        let arr = getChildrenFolders(data, item.id);//获取当前的子级

        let $li = $(`<li class="${arr.length ? 'full' : 'empty'}" did="${item.id}">
        <div class=''>
            <img style="margin-left:${parr.length * 5 + 5}px;" src="${arr.length ? '././img/folder-close.png' : ''}" alt="">
            <span>${item.title}</span>
        </div>
    </li>`);
        $li.off().click(function () {
            let id = item.id;
            let pid = item.pid;

            let reData = list.filter(item => item.checked);
            //点击li的时候，看看点击的文件和要移动的文件是不是有直系关系
            //如果有直系关系，那么就点不开
            if (reData.some(d => d.id === id)) {
                okcode = 'error';
                return;
            } else {
                okcode = item.id;
            }


            $moveto_tree.find('div').removeClass('active');
            if ($(this).find('ul').length) {
                $(this).find('ul').remove();
                $(this).find('div img').eq(0).attr("src", '././img/folder-close.png');

            } else {
                if (!$(this).hasClass('empty')) {
                    $(this).find('div img').eq(0).attr("src", '././img/folder-open.png');
                }
                $(this).append(movetoTree(id, true));
            }
            $li.find('div').eq(0).addClass('active');

            return false;
        })
        $ul.append($li);
    })

    return $ul[0];
}






