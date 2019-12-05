let $tree = $('#oUl');
function creatTree(num, onoff) {
    if (!onoff) {
        $tree.children("li").find('ul').remove();
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
        let $li = $(`<li class="${arr.length ? 'full' : 'empty'}" id="${item.id}" did="${item.id}">
        <span class="" style="margin-left:${parr.length * 5 + 5}px;"><img src="${arr.length ? '././img/folder-close.png' : ''}" alt=""></span>
        <div>${item.title}</div>
    </li>`);
        $li.off().click(function () {
            
            let id = item.id;
            let pid = item.pid;
            //如果有子级ul 说明已经打开了 所以要关闭 清除ul ; 没有就说明现在是关上的所以要打开
            //清除所有的div中class含有active的 
            $tree.find('div').removeClass('active');
            //判断面当前li下的ul的长度  有ul的就清理ul 重新加载子数据 没有ul的可能是没有打开过 或者是没有子级
            if ($(this).find('ul').length) {
                $(this).find('ul').remove();
                if (pid === 0) {
                    //当pid是微云时
                    $tree.children("li")[0].append(creatTree(pid, false));
                    $tree.children("li").eq(0).find('div').eq(0).addClass('active');
                } else {
                    //pid不是微云时
                    $(this).find('span img').eq(0).attr("src", '././img/folder-close.png');
                    $(this).parents("li").eq(0).find('div').eq(0).addClass('active');
                }
               
                render(pid);
                breadcrumb(pid);

            } else {

                // 没有打开过的 判断是不是下面没有文件夹  如果为empty就是没有文件夹是最底层 有的话就正常加载数据打开
                if ($(this).hasClass('empty')) {

                    if ($(this).hasClass('once')) {//说明点开过了
                        $(this).removeClass('once');
                        // $(this).parents("li").eq(0).append(creatTree(pid, true));
                        $(this).parents("li").eq(0).find('div').eq(0).addClass('active');
                        render(pid);
                        breadcrumb(pid);
                    } else {//说明没点开过了
                        $(this).addClass('once');
                        $(this).append(creatTree(id, true));
                        $(this).find('div').eq(0).addClass('active')
                        render(id);
                        breadcrumb(id);

                    }

                }
                else {
                    $(this).find('span img').eq(0).attr("src", '././img/folder-open.png');
                    $(this).append(creatTree(id, true));
                    $(this).find('div').eq(0).addClass('active')
                    render(id);
                    breadcrumb(id);
                }
            }
            return false;
        })
        $ul.append($li);
    })

    return $ul[0];
}

$tree.children("li")[0].append(creatTree(0, true))




//获取tree中当前的位置  更新tree
function treePosition(id) {
    let $li = $('#' + id);
    let sArr = getChildrenFolders(data, id);
    $tree.find('.active').removeClass('active');
    
    if (id === 0) {
        //当pid是微云时
        $li.append(creatTree(id, false));

    } else {
        if ($li.find('ul').length) {
            $li.find('ul').remove();

        }
        $li.append(creatTree(id, true));
    }

    $li.find('div').eq(0).addClass('active');
    
    if (!getChildrenFolders(data, id).length) {
        $li.find('span img').eq(0).attr("src", '');
    } else {
        $li.find('span img').eq(0).attr("src", '././img/folder-open.png');
    }


}
